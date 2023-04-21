const { GraphQLBoolean, GraphQLString, GraphQLInt, GraphQLObjectType } = require("graphql");



const statustype = new GraphQLObjectType({
    name:"statusType",
    description:"status types",
    fields:{
        status:{type:GraphQLBoolean},
        message:{type:GraphQLString},
        status:{type:GraphQLInt},
    }
})


module,exports = {
    statustype
}



