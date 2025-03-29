import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  integer,
  timestamp,
  boolean,
  pgEnum,
  uuid,
  foreignKey,
  primaryKey,
} from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";

// Role Type
export const roleEnum = pgEnum("user_role", ["admin", "user", "pro"]);

/* Auth Schema
 *
 *
 */
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  role: roleEnum("role").notNull().default("user"),
  banned: boolean("banned"),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  impersonatedBy: text("impersonated_by"),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const passkey = pgTable("passkey", {
  id: text("id").primaryKey(),
  name: text("name"),
  publicKey: text("public_key").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  credentialID: text("credential_i_d").notNull(),
  counter: integer("counter").notNull(),
  deviceType: text("device_type").notNull(),
  backedUp: boolean("backed_up").notNull(),
  transports: text("transports"),
  createdAt: timestamp("created_at"),
});

export const userRelations = relations(user, ({ many }) => ({
  posts: many(posts),
  subscriptions: many(subscriptions, {
    relationName: "subscriptions_viewer_id_fkey",
  }),
  subscribers: many(subscriptions, {
    relationName: "subscriptions_creator_id_fkey",
  }),
  comments: many(comments),
  commentsReactions: many(commentsReactions),
}));

export const subscriptions = pgTable(
  "subscriptions",
  {
    viewerId: text("viewer_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    creatorId: text("creator_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [
    primaryKey({
      name: "subscriptions_pk",
      columns: [t.viewerId, t.creatorId],
    }),
  ]
);

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  viewer: one(user, {
    fields: [subscriptions.viewerId],
    references: [user.id],
    relationName: "subscriptions_viewer_id_fkey",
  }),
  creator: one(user, {
    fields: [subscriptions.creatorId],
    references: [user.id],
    relationName: "subscriptions_creator_id_fkey",
  }),
}));

/* Product Schema
 *  Brand Table
 *  -- DELL IBM HP...
 *  Category Table
 *  -- Servers storages Networks...
 *  Product Table
 * -- R740 DL388...
 */

// ⌚️ Reusable timestamps - Define once, use everywhere!
export const timestamps = {
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
};

// Device type enums
export const server_type = pgEnum("server_type", ["tower", "rack", "blade"]);
export const storage_type = pgEnum("storage_type", [
  "san",
  "nas",
  "das",
  "tape",
]);
export const network_type = pgEnum("network_type", [
  "switch",
  "router",
  "firewall",
  "load_balancer",
]);

// Document type and status enums
export const document_type = pgEnum("document_type", [
  "manual",
  "datasheet",
  "whitepaper",
  "guide",
  "certificate",
]);
export const document_status = pgEnum("document_status", [
  "draft",
  "published",
  "archived",
]);

// Download type enum
export const download_type = pgEnum("download_type", [
  "firmware",
  "driver",
  "utility",
  "management_software",
  "bios",
]);

export const brands = pgTable("brands", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  fullName: text("full_name"),
  description: text("description"),
  logoImageKey: text("logo_image_key"),
  ...timestamps,
});

export const brandsRelations = relations(brands, ({ many }) => ({
  products: many(products),
}));

export const brandsInsertSchema = createInsertSchema(brands, {
  name: z.string().min(1).max(255),
});
export const brandsSelectSchema = createSelectSchema(brands);
export const brandsUpdateSchema = createUpdateSchema(brands);

export const productsCategories = pgTable("products_categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  description: text("description"),
  ...timestamps,
});

export const productsCategoriesRelations = relations(
  productsCategories,
  ({ many }) => ({
    products: many(products),
  })
);

export const ProductVisibility = pgEnum("visibility", ["public", "private"]);

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  model: text("model"),
  description: text("description"),
  visibility: ProductVisibility("visibility").default("private").notNull(),
  serverType: server_type("server_type"),
  storageType: storage_type("storage_type"),
  networkType: network_type("network_type"),
  releaseYear: integer("release_year"),
  specifications: text("specifications"),
  imageUrl: text("image_url"),
  features: text("features").array(),
  brandId: uuid("brand_id")
    .notNull()
    .references(() => brands.id),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => productsCategories.id),
  ...timestamps,
});

export const productsRelations = relations(products, ({ one, many }) => ({
  brand: one(brands, {
    fields: [products.brandId],
    references: [brands.id],
  }),
  categories: one(productsCategories, {
    fields: [products.categoryId],
    references: [productsCategories.id],
  }),
  downloads: many(downloads),
  documents: many(documents),
  posts: many(posts),
}));

/* Document Schema
 *  Document Table
 *  -- Document Type (manual, datasheet, whitepaper)
 *  -- Document Status (draft, published, archived)
 *  -- Document File
 */

export const documents = pgTable("documents", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  type: document_type("type").notNull(),
  status: document_status("status").notNull().default("published"),
  fileSize: text("file_size"),
  fileKey: text("file_key"),
  url: text("url"),
  productId: uuid("product_id").references(() => products.id),
  language: text("language").default("en"),
  publicationDate: timestamp("publication_date"),
  version: text("version"),
  ...timestamps,
});

export const documentsRelations = relations(documents, ({ one }) => ({
  product: one(products, {
    fields: [documents.productId],
    references: [products.id],
  }),
}));

/* Post Schema
 *  Blog posts for troubleshooting issues with servers, storage, and network devices
 *  -- Related to products
 *  -- Contains solutions and workarounds
 */

export const posts = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  summary: text("summary"),
  productId: uuid("product_id").references(() => products.id),
  authorId: text("author_id").references(() => user.id),
  status: document_status("status").notNull().default("published"),
  tags: text("tags").array(),
  views: integer("views").default(0),
  ...timestamps,
});

export const postsRelations = relations(posts, ({ one, many }) => ({
  product: one(products, {
    fields: [posts.productId],
    references: [products.id],
  }),
  author: one(user, {
    fields: [posts.authorId],
    references: [user.id],
  }),
  comments: many(comments),
}));

export const comments = pgTable(
  "comments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    parentId: uuid("parent_id"),
    content: text("content").notNull(),
    postId: uuid("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    ...timestamps,
  },
  (t) => [
    foreignKey({
      columns: [t.parentId],
      foreignColumns: [t.id],
      name: "comments_parent_id_fkey",
    }).onDelete("cascade"),
  ]
);

export const commentsRelations = relations(comments, ({ one, many }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
  user: one(user, {
    fields: [comments.userId],
    references: [user.id],
  }),
  parentId: one(comments, {
    fields: [comments.parentId],
    references: [comments.id],
    relationName: "comments_parent_id_fkey",
  }),
  reactions: many(commentsReactions),
  replies: many(comments, {
    relationName: "comments_replies_fkey",
  }),
}));

export const commentsInsertSchema = createInsertSchema(comments);
export const commentsSelectSchema = createSelectSchema(comments);
export const commentsUpdateSchema = createUpdateSchema(comments);

export const reactionTypes = pgEnum("reaction_type", ["like", "dislike"]);

export const commentsReactions = pgTable(
  "comments_reactions",
  {
    userId: text("user_id")
      .references(() => user.id, { onDelete: "cascade" })
      .notNull(),
    commentId: uuid("comment_id")
      .references(() => comments.id, { onDelete: "cascade" })
      .notNull(),
    type: reactionTypes("type").notNull(),
    ...timestamps,
  },
  (t) => [
    primaryKey({
      name: "comments_reactions_pk",
      columns: [t.userId, t.commentId],
    }),
  ]
);

export const commentsReactionsRelations = relations(
  commentsReactions,
  ({ one }) => ({
    user: one(user, {
      fields: [commentsReactions.userId],
      references: [user.id],
    }),
    comment: one(comments, {
      fields: [commentsReactions.commentId],
      references: [comments.id],
    }),
  })
);

/* Download Schema
 *  Download Table for firmware, drivers, and utilities
 */

export const downloads = pgTable("downloads", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  description: text("description"),
  type: download_type("type").default("driver"),
  version: text("version"),
  releaseDate: timestamp("release_date"),
  operatingSystem: text("operating_system"),
  architecture: text("architecture"),
  fileSize: text("file_size"),
  fileType: text("file_type"),
  fileKey: text("file_key"),
  url: text("url"),
  downloadCount: integer("download_count").default(0),
  checksumMd5: text("checksum_md5"),
  checksumSha256: text("checksum_sha256"),
  installationNotes: text("installation_notes"),
  productId: uuid("product_id").references(() => products.id),
  ...timestamps,
});

export const downloadsRelations = relations(downloads, ({ one }) => ({
  product: one(products, {
    fields: [downloads.productId],
    references: [products.id],
  }),
}));
