"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const root_query_1 = __importDefault(require("./root-query"));
exports.default = new graphql_1.GraphQLSchema({
    // mutation,
    query: root_query_1.default,
});
