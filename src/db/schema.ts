import { mysqlTable, int, text, varchar, timestamp, boolean } from "drizzle-orm/mysql-core";

export const adminUsers = mysqlTable("admin_users", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: varchar("name", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const posts = mysqlTable("posts", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  coverImage: text("cover_image"),
  published: boolean("published").default(false).notNull(),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const projects = mysqlTable("projects", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description").notNull(),
  image: text("image"),
  url: text("url"),
  repoUrl: text("repo_url"),
  tags: text("tags"),
  featured: boolean("featured").default(false).notNull(),
  sortOrder: int("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const aboutContent = mysqlTable("about_content", {
  id: int("id").autoincrement().primaryKey(),
  headline: varchar("headline", { length: 255 }).notNull(),
  bio: text("bio").notNull(),
  avatarUrl: text("avatar_url"),
  skills: text("skills"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const contactInfo = mysqlTable("contact_info", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 255 }),
  socialLinks: text("social_links"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
