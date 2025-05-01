import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const typeDefs = `#graphql
  type User {
    id: Int!
    name: String!
    email: String!
    comments: [Comment!]
  }

  type Query {
    users: [User!]
    user(id: Int!): User
  }

  type Mutation {
    createUser(name: String!, email: String!): User
    updateUser(id: Int!, name: String, email: String): User
    deleteUser(id: Int!): User
  }
`;

export const resolvers = {
  Query: {
    users: () => prisma.user.findMany(),
    user: (_, { id }) => prisma.user.findUnique({ where: { id } })
  },

  Mutation: {
    createUser: (_, { name, email }) =>
      prisma.user.create({
        data: {
          name,
          email
        }
      }),

    updateUser: (_, { id, name, email }) =>
      prisma.user.update({
        where: { id },
        data: { name, email }
      }),

    deleteUser: async (_, { id }) => prisma.user.delete({ where: { id } })
  },

  User: {
    comments: (parent) => prisma.comment.findMany({ where: { userId: parent.id } })
  }
};
