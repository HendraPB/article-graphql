import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default {
  Query: {
    users: () => prisma.user.findMany(),
    user: (_, { id }) => prisma.user.findUnique({ where: { id } }),

    articles: () => prisma.article.findMany(),
    article: (_, { id }) => prisma.article.findUnique({ where: { id } }),

    comments: () => prisma.comment.findMany(),
    comment: (_, { id }) => prisma.comment.findUnique({ where: { id } }),

    categories: () => prisma.category.findMany(),
    category: (_, { id }) => prisma.category.findUnique({ where: { id } })
  },

  Mutation: {
    createUser: (_, { name, email }) =>
      prisma.user.create({
        data: {
          name,
          email
        }
      }),

    createArticle: (_, { title, content, categoryId }) =>
      prisma.article.create({
        data: {
          title,
          content,
          categoryId: categoryId
        }
      }),

    createComment: (_, { content, userId, articleId }) =>
      prisma.comment.create({
        data: {
          content,
          userId,
          articleId
        }
      }),

    createCategory: (_, { name }) =>
      prisma.category.create({
        data: {
          name
        }
      })
  },

  User: {
    comments: (parent) => prisma.comment.findMany({ where: { userId: parent.id } })
  },

  Article: {
    category: (parent) => prisma.category.findUnique({ where: { id: parent.categoryId } }),
    comments: (parent) => prisma.comment.findMany({ where: { articleId: parent.id } })
  },

  Comment: {
    user: (parent) => prisma.user.findUnique({ where: { id: parent.userId } }),
    article: (parent) => prisma.article.findUnique({ where: { id: parent.articleId } })
  },

  Category: {
    articles: (parent) => prisma.article.findMany({ where: { categoryId: parent.id } })
  }
};
