import { Fragment, useReducer, useRef } from "react";
import { useTRPCClient } from "../../util/trpc";
import { v4 } from "uuid";
import Markdown from "react-markdown";

interface ChatReducerActions {
  addUserMessage: {
    message: string;
    id: string;
  };
  addAssistantMessage: {
    message: string;
    id: string;
  };
}

const chatReducer = (
  state: {
    messageIdOrder: string[];
    messages: {
      [key: string]:
        | { role: "user"; message: string }
        | { role: "assistant"; message: string[] };
    };
  },
  action: {
    [key in keyof ChatReducerActions]: {
      action: key;
      payload: ChatReducerActions[key];
    };
  }[keyof ChatReducerActions]
): typeof state => {
  switch (action.action) {
    case "addUserMessage": {
      return {
        ...state,
        messageIdOrder: [...state.messageIdOrder, action.payload.id],
        messages: {
          ...state.messages,
          [action.payload.id]: {
            message: action.payload.message,
            role: "user",
          },
        },
      };
    }
    case "addAssistantMessage": {
      const isMessageInId = state.messageIdOrder.includes(action.payload.id);
      return {
        messageIdOrder: [
          ...state.messageIdOrder,
          ...(!isMessageInId ? [action.payload.id] : []),
        ],
        messages: {
          ...state.messages,
          [action.payload.id]: {
            role: "assistant",
            message: [
              ...(state.messages[action.payload.id]?.message || []),
              action.payload.message,
            ],
          },
        },
      };
    }

    default:
      action satisfies never;
  }
  return state;
};
export default function LlmChat() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const trpcClient = useTRPCClient();
  const textContentRef = useRef<HTMLDivElement>(null);
  const [chats, dispatch] = useReducer(chatReducer, {
    messages: {},
    messageIdOrder: [],
  });
  const responseIdRef = useRef<string | null>(null);

  const sendMessage = (message: string) => {
    const id = v4();
    const subscription = trpcClient.chat.subscribe(
      { message, prevMessageId: responseIdRef.current || "" },
      {
        onData(value) {
          switch (value.data.type) {
            case "message":
              {
                dispatch({
                  action: "addAssistantMessage",
                  payload: { id, message: value.data.text },
                });
              }
              break;
            case "end":
              {
                responseIdRef.current = value.data.responseId;
                console.log(
                  "Response finished with ID:",
                  value.data.responseId
                );
              }
              break;
            default: {
              console.log("Unknown data type received:", value.data);
            }
          }
        },
        onStarted() {},
        onComplete() {
          subscription.unsubscribe();
        },
        // onError(err) {},
        onStopped() {
          console.log("stopped");
        },
        onConnectionStateChange(state) {
          console.log("Connection state changed:", state);
        },
      }
    );
  };

  const scrollToBottom = () => {
    if (textContentRef.current) {
      textContentRef.current.scrollTop = textContentRef.current.scrollHeight;
    }
  };
  scrollToBottom();
  return (
    <div className="flex flex-col  h-full py-4">
      <div className="flex-1 overflow-scroll mx-2">
        <div
          className=" flex h-full items-end flex-col gap-4  overflow-scroll text-white text-sm px-2"
          ref={textContentRef}
        >
          {chats.messageIdOrder.map((id) => {
            const details = chats.messages?.[id];
            return (
              <Fragment key={id}>
                {details.role === "user" ? (
                  <p className="p-3 py-2 rounded-md bg-gray-700 self-end">
                    {details.message}
                  </p>
                ) : (
                  <div className="self-start">
                    <Markdown>{details.message?.join("")}</Markdown>
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
      <div className="p-3">
        <p
          ref={textRef}
          contentEditable
          className="min-h-[50px] rounded-2xl bg-amber-100 break-after-all break-words max-w-full p-2 max-h-[200px] overflow-y-scroll"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (textRef.current?.textContent) {
                dispatch({
                  action: "addUserMessage",
                  payload: { id: v4(), message: textRef.current.textContent },
                });

                sendMessage(textRef.current.textContent);
                textRef.current.textContent = "";
              }
            }
          }}
        ></p>
      </div>
    </div>
  );
}
