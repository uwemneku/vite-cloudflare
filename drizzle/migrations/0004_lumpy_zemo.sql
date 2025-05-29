PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_todos_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`createdAt` integer DEFAULT '"2025-05-29T08:29:34.626Z"' NOT NULL,
	`updatedAt` integer DEFAULT '"2025-05-29T08:29:34.626Z"' NOT NULL,
	`isDone` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_todos_table`("id", "title", "createdAt", "updatedAt", "isDone") SELECT "id", "title", "createdAt", "updatedAt", "isDone" FROM `todos_table`;--> statement-breakpoint
DROP TABLE `todos_table`;--> statement-breakpoint
ALTER TABLE `__new_todos_table` RENAME TO `todos_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;