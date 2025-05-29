export default function LlmChat() {
  return (
    <div className="flex flex-col  h-full p-3">
      <div className="flex-1"></div>
      <div>
        <p
          contentEditable
          className="min-h-[50px] rounded-2xl bg-amber-100 break-after-all break-words max-w-full p-2 max-h-[200px] overflow-y-scroll"
        ></p>
      </div>
    </div>
  );
}
