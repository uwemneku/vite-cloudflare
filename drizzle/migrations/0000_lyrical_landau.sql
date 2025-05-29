CREATE TABLE `todos_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`sample` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `todos_table_sample_unique` ON `todos_table` (`sample`);