import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const typeDefs = `#graphql
  type Comment {
    id: Int!
    content: String!
    createdAt: String!
    user: User!
    article: Article!
  }

  type Query {
    comments: [Comment!]
    comment(id: Int!): Comment
  }

  type Mutation {
    createComment(content: String!, userId: Int!, articleId: Int!): Comment
    updateComment(id: Int!, content: String, userId: Int, articleId: Int): Comment
    deleteComment(id: Int!): Comment
  }
`;

export const resolvers = {
  Query: {
    comments: () => prisma.comment.findMany(),
    comment: (_, { id }) => prisma.comment.findUnique({ where: { id } })
  },

  Mutation: {
    createComment: (_, { content, userId, articleId }) =>
      prisma.comment.create({
        data: {
          content,
          userId,
          articleId
        }
      }),

    updateComment: (_, { id, content, userId, articleId }) =>
      prisma.comment.update({
        where: { id },
        data: { content, userId, articleId }
      }),

    deleteComment: (_, { id }) => prisma.comment.delete({ where: { id } })
  },

  Comment: {
    user: (parent) => prisma.user.findUnique({ where: { id: parent.userId } }),
    article: (parent) => prisma.article.findUnique({ where: { id: parent.articleId } })
  }
};
