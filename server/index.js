const { ApolloServer } = require("apollo-server")
const { typeDefs} = require("./schemas/type-defs")
const { resolvers } = require("./schemas/resolvers")
const server = new ApolloServer({typeDefs, resolvers, context : ({req}) => {
    return {req}
}})


server.listen().then(({url}) => {
    console.log(`Your API is running at ${url} :)`)
})