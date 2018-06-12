import { userQueries, userMutation, userTypes } from './user.graphql';
import { makeExecutableSchema } from 'graphql-tools';


export interface IQuery {
    query(): string;
}
export interface IMutation {
    mutation(): string;
}
export interface IGraphql extends IQuery, IMutation {
    schema(): string;
}

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
        makeExecutableSchema({
            typeDefs: [
                this.schema(),
                this.query(),
                this.mutation(),
                userTypes
            ]
        });
    }

};