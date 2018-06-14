//import { Query } from './user.graphql';
import User from "../../user/model/user.model";
import { query, mutation } from 'graphql-query-mutation/annotations';

export const userTypes = `
    type User {
        id: ID!
        name: String!
        email: String!
        createAt: String!
        updateAt: String!
    }

    input UserCreateInput {
        name: String!
        email: String!
    }

    input UserUpdateInput {
        name: String!
        email: String!
    }
`;

export const userQueries = `
    users( first: Int, offset: Int ): [ User! ]!
    user( id: ID! ): User
`;

export const userMutation = `
    createUser( input: UserCreateInput! ): User
    updateUser( id: ID!, input: UserUpdateInput! ): User
`;

export class UserResolve {

    @query
    users ( parent, params, context, info ) {
        return User.findAll({
            limit: params.first || 10,
            offset: params.offset || 0
        });
    };

    @query
    user ( parent, params, context, info ) {
        const id:number = parseInt( params.id );
        return User.findById(id);
    }

    @mutation
    createUser( parent, params, context, info ) {
        const id:number = parseInt( params.id );
        return User.findById(id);
    }

    @mutation
    updateUser( parent, params, context, info ) {
        const id:number = parseInt( params.id );
        return User.findById(id);
    }
}