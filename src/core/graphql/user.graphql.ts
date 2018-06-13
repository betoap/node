import User from "../../user/model/user.model";

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

export const userResolve = {
    Query: {
        users: ( parent, params, context, info ) => {
            const db = context.database;
            return User.findAll({
                limit: params.first || 10,
                offset: params.offset || 0
            });
        },
        user: ( parent, params, context, info ) => {
            const id:number = parseInt( params.id );
            return User.findById(id);
        }
    }
}