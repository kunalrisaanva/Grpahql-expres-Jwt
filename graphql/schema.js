const { GraphQLObjectType , GraphQLSchema } = require("graphql")




// import querires

const {users , user , posts , post , comment , comments} = require("./querires/queryires");



// define query type 

const RootQuery = new GraphQLObjectType({
    name:"queryType",
    description:"Queries",
    fields:{
        users,
        user,
        posts,
        post,
        comment,
        comments
    }
})

// import mutations

const { register ,login , addPost , addComment ,updatePost , deletePost , updateComment , deleteComment} = require("./mutation/mutation");
 

// define mutation 

const Mutation = new GraphQLObjectType({
    name:"mutation",
    description:"create data update data delete data",
    fields:{
        register,
        login,
        addPost,
        addComment,
        updatePost,
        deletePost,
        updateComment,
        deleteComment
    }
})
 

 




module.exports = new GraphQLSchema( { query:RootQuery , mutation:Mutation} )
