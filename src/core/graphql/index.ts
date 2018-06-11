import { makeExecutableSchema } from 'graphql-tools';

export const Query: string = `
    type Query {

    }
`;
export const Mutation: string = `
    type Mutation {

    }
`;

export const SchemaDefinition: string = `
    type Schema {
        query: Query
        mutation: Mutation
    }
`;

export default makeExecutableSchema({
    typeDefs: [
        SchemaDefinition,
        Query,
        Mutation
    ]
});