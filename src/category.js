import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const typeDefs = `#graphql
  type Category {
    id: Int!
    name: String!
    articles: [Article!]
  }

  type Query {
    categories: [Category!]
    category(id: Int!): Category
  }

  type Mutation {
    createCategory(name: String!): Category
    updateCategory(id: Int!, name: String): Category
    deleteCategory(id: Int!): Category
  }
`;

export const resolvers = {
  Query: {
    categories: () => prisma.category.findMany(),
    category: (_, { id }) => prisma.category.findUnique({ where: { id } })
  },

  Mutation: {
    createCategory: (_, { name }) =>
      prisma.category.create({
        data: {
          name
        }
      }),

    updateCategory: (_, { id, name }) =>
      prisma.category.update({
        where: { id },
        data: { name }
      }),

    deleteCategory: (_, { id }) => prisma.category.delete({ where: { id } })
  },

  Category: {
    articles: (parent) => prisma.article.findMany({ where: { categoryId: parent.id } })
  }
};
