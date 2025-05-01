import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs as userTypeDefs, resolvers as userResolvers } from './src/user.js';
import { typeDefs as articleTypeDefs, resolvers as articleResolvers } from './src/article.js';
import { typeDefs as commentTypeDefs, resolvers as commentResolvers } from './src/comment.js';
import { typeDefs as categoryTypeDefs, resolvers as categoryResolvers } from './src/category.js';

const typeDefs = [userTypeDefs, articleTypeDefs, commentTypeDefs, categoryTypeDefs];
const resolvers = [userResolvers, articleResolvers, commentResolvers, categoryResolvers];

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 }
});

console.log(`🚀 Server ready at ${url}`);
