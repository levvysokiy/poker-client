"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const mutation = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({}),
});
exports.default = mutation;
