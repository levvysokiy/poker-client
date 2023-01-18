"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const user = {
    type: graphql_1.GraphQLString,
    resolve: () => {
        return 'Hello world!';
    },
};
exports.default = user;
