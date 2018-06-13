//import { userQueries, userMutation, userTypes } from './user.graphql';
//import { makeExecutableSchema } from 'graphql-tools';
import * as query from 'graphql-query-mutation';
console.log( query );

/*
export interface IQuery {
    query(): string;
}
export interface IMutation {
    mutation(): string;
}
export interface IGraphql extends IQuery, IMutation {
    schema(): string;
}


//export const resolvers = userResolves;
export const resolvers:Object = Query.getQueries();

console.log(resolvers, "Betoap" );

export class Graphql implements IGraphql {
    
    public schema(): string {
        return `
            type Schema {
                query: Query
                mutation: Mutation
            }
        `;
    };

    public mutation(): string {
        return `
            type Mutation {
                ${userMutation}
            }
        `;
    }
    
    public query(): string {
        return `
            type Query {
                ${userQueries}
            }
        `;
    }

    execute() {
        return makeExecutableSchema({
            typeDefs: [
                this.schema(),
                this.query(),
                this.mutation(),
                userTypes
            ], 
            resolvers
        });
    }

};
*/