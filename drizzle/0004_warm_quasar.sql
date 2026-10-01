CREATE TYPE "public"."article_category" AS ENUM('medical', 'lab', 'industrial', 'guide');--> statement-breakpoint
CREATE TABLE "articles" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"excerpt" text NOT NULL,
	"content" text NOT NULL,
	"category" "article_category" NOT NULL,
	"author" text NOT NULL,
	"date" text NOT NULL,
	"read_time" integer DEFAULT 5 NOT NULL,
	"image" text,
	"featured" boolean DEFAULT false NOT NULL,
	"is_published" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "articles_slug_unique" UNIQUE("slug")
);
