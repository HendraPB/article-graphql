export default `#graphql
  type User {
    id: Int!
    name: String!
    email: String!
    comments: [Comment!]
  }

  type Article {
    id: Int!
    title: String!
    content: String!
    category: Category!
    comments: [Comment!]
  }

  type Comment {
    id: Int!
    content: String!
    createdAt: String!
    user: User!
    article: Article!
  }

  type Category {
    id: Int!
    name: String!
    articles: [Article!]
  }

  type Query {
    users: [User!]
    user(id: Int!): User

    articles: [Article!]
    article(id: Int!): Article

    comments: [Comment!]
    comment(id: Int!): Comment

    categories: [Category!]
    category(id: Int!): Category
  }

  type Mutation {
    createUser(name: String!, email: String!): User
    createArticle(title: String!, content: String!, categoryId: Int!): Article
    createComment(content: String!, userId: Int!, articleId: Int!): Comment
    createCategory(name: String!): Category
  }
`;
