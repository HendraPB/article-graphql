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
      })
  },

  Article: {
    category: (parent) => prisma.category.findUnique({ where: { id: parent.categoryId } }),
    comments: (parent) => prisma.comment.findMany({ where: { articleId: parent.id } })
  }
};
