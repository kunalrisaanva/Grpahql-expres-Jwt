const { GraphQLObjectType, GraphQLInt , GraphQLString , GraphQLID, GraphQLList} = require("graphql");

const {User,Post,Comment} = require("../../models/allModel");


const userType = new GraphQLObjectType({
    name:"user",
    description:"user type",
    fields:{
        id:{type:GraphQLID},
        username:{type:GraphQLString},
        email:{type:GraphQLString},
        displayName:{type:GraphQLString},
    } 
})



const commentType = new GraphQLObjectType({
    name: "Comment",
    description: "Comment type",
    fields: () => ({
      id: { type: GraphQLID },
      comment: { type: GraphQLString },
      user: {
        type: userType,
        resolve(parent, args) {
          return User.findById(parent.userId)
        },
      },
      post: {
        type: postType,
        resolve(parent, args) {
          return Post.findById(parent.postId)
        },
      },
    }),
  })



const postType = new GraphQLObjectType({
    name:"post",
    description:"post type",
    fields:{
        id:{type:GraphQLID},
        title:{type:GraphQLString},
        body:{type:GraphQLString},
        displayName:{type:GraphQLString},
        author:{
            type:userType,
            resolve:(parent,args)=> {
      
               return  User.findById(parent.authorId)
            }
            
        },
        comments:{
            type: new GraphQLList(commentType),
            resolve:(parent,args) => {
             
                return Comment.findById({ postId:parent.Id });
            }
        }
    }
})




module.exports = {
    userType,
    postType,
    commentType
}