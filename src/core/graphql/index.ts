import { userQueries, userMutation, userTypes } from './user.graphql';
import { makeExecutableSchema, IResolvers, IResolverObject } from 'graphql-tools';
import { Query, Mutation } from 'graphql-query-mutation';

export class Graphql {
    
    private schema(): string {
        return `
            type Schema {
                query: Query
                mutation: Mutation
            }
        `;
    };

    private mutation(): string {
        return `
            type Mutation {
                ${userMutation}
            }
        `;
    }
    
    private query(): string {
        return `
            type Query {
                ${userQueries}
            }
        `;
    }

    private resolvers(): IResolvers<any, any> {
        return {
            "Query": (<IResolverObject>Query.getQueries()),
            "Mutation": (<IResolverObject>Mutation.getMutations()),
        }
    }

    execute() {
        const resolvers:IResolvers<any, any> = this.resolvers();
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