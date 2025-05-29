ALTER TABLE `todos_table` RENAME TO `todos_table_s`;--> statement-breakpoint
ALTER TABLE `todos_table_s` RENAME COLUMN "sample" TO "name";--> statement-breakpoint
DROP INDEX `todos_table_sample_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `todos_table_s_name_unique` ON `todos_table_s` (`name`);