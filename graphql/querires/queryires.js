const { GraphQLList, GraphQLString, GraphQLID, graphql }  = require("graphql");
const { userType, postType, commentType } = require("../typeDef/typeDef");
const { User , Post ,Comment} = require("../../models/allModel");


const users = {
    type: new GraphQLList(userType),
    description:"Retrieves list of user",
    resolve: async(parent,args)=>{
        const data = await User.find();
        return data
    }

}

const user = {
    type:userType,
    description:"Retrieves one of user",
    args:{id: { type : GraphQLID } },
    resolve:async(parent,args)=>{
        const data = await User.findById({_id:args.id})
        return data
    }
}

const posts = {
    type: new GraphQLList(postType),
    description:"Retrieves lists of posts",
    resolve:async(parent,args)=>{
        const postsData = await Post.find();
        // console.log(postsData)
        return postsData
    }

}



const post = {
    type: postType,
    description:"Retrieves one of post",
    args:{
        id:{type:GraphQLID}
    },
    resolve:async(parent,args)=>{
        const postData = await Post.findById(args.id)
        return postData
    }

}


const comment ={
    type:commentType,
    description:"Retrieves one of post",
    args:{
        id:{type:GraphQLID}
    },
    resolve:async(_,args)=>{
        return Comment.findById(args.id)
    }
}


const comments ={
    type: new GraphQLList(commentType),
    description:"Retrieves one of post",
    args:{
        id:{type:GraphQLID}
    },
    resolve:async(_,args)=>{
        return Comment.find()
    }
}


module.exports = { users , user , posts , post ,comment ,comments}