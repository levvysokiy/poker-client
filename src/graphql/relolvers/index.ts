import { mergeResolvers } from '@graphql-tools/merge';
import userResolver from './user';

const resolvers = mergeResolvers([userResolver]);

export default resolvers;
