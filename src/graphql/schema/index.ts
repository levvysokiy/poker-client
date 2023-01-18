const { mergeTypeDefs } = require('@graphql-tools/merge');
import user from './user';

const typeDefs = mergeTypeDefs([user]);

export default typeDefs;
