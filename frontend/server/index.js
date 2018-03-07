const Koa = require('koa');
const mount = require('koa-mount');
const graphqlHTTP = require('koa-graphql');
const serve = require('koa-static');
const resolver = require('./graphql/resolver.js')
const schema = require('./graphql/schema.js');


const app = new Koa();

app.use(mount('/graphql', graphqlHTTP({
    rootValue: resolver,
    schema,
    graphiql: true
})));

app.use(serve('../client/dist'))

app.listen(4000);
console.log('Server Running on Port 4000')
