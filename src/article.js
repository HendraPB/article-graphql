import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const typeDefs = `#graphql
  type Article {
    id: Int!
    title: String!
    content: String!
    category: Category!
    comments: [Comment!]
  }

  type Query {
    articles: [Article!]
    article(id: Int!): Article
  }

  type Mutation {
    createArticle(title: String!, content: String!, categoryId: Int!): Article
    updateArticle(id: Int!, title: String, content: String, categoryId: Int): Article
    deleteArticle(id: Int!): Article
  }
`;

export const resolvers = {
  Query: {
    articles: () => prisma.article.findMany(),
    article: (_, { id }) => prisma.article.findUnique({ where: { id } })
  },

  Mutation: {
    createArticle: (_, { title, content, categoryId }) =>
      prisma.article.create({
        data: {
          title,
          content,
          categoryId: categoryId
        }
      }),

    updateArticle: (_, { id, title, content, categoryId }) =>
      prisma.article.update({
        where: { id },
        data: { title, content, categoryId }
      }),

    deleteArticle: (_, { id }) => prisma.article.delete({ where: { id } })
  },

  Article: {
    category: (parent) => prisma.category.findUnique({ where: { id: parent.categoryId } }),
    comments: (parent) => prisma.comment.findMany({ where: { articleId: parent.id } })
  }
};
