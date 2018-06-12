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

