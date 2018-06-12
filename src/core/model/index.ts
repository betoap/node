import { makeExecutableSchema } from 'graphql-tools';

const users: any[] = [
    {
        id: 1,
        name: 'teste',
        email: 'teste@email.com',
    },
    {
        id: 2,
        name: 'teste2',
        email: 'teste2@email.com',
    }
]

const typeDefs = `
    type User {
        id: ID!
        name: String!
        email: String!
    }

    type Query {
        allUsers: [User!]
    }
`;

const resolvers = {
    Query: {
        allUsers: () => users
    }
}

export default makeExecutableSchema( {typeDefs, resolvers} );