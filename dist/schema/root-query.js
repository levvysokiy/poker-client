"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const user_1 = __importDefault(require("./queries/user"));
const query = new graphql_1.GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        user: user_1.default
    }),
});
exports.default = query;
