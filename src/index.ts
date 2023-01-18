import * as dotenv from 'dotenv';
dotenv.config();
import { ApolloServer } from 'apollo-server';
import resolvers from './graphql/relolvers';
import typeDefs from './graphql/schema';
import db from './db';
import processContext from './graphql/context';
import user from './graphql/schema/user';
import { IContext } from './graphql/context.types';

const server = new ApolloServer({
  typeDefs: user,
  resolvers,
  context: processContext,
  formatResponse: (response, requestContext) => {
    console.log(requestContext.operationName);
    const context: IContext = requestContext.context as IContext;

    if (
      response.errors &&
      context.authError &&
      requestContext.response?.http?.status
    ) {
      requestContext.response.http.status = 401;
    }

    return response;
  },
});

const PORT = process.env.PORT || 3000;

db.sequelize
  .sync()
  .then(() => server.listen({ port: PORT }))
  .then(() => console.log(`🚀 Server ready at $${PORT}!`));
