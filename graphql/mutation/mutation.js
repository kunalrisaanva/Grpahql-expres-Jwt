const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  graphqlSync,
} = require("graphql");
const { postType, commentType, userType } = require("../typeDef/typeDef");
const { User, Post, Comment } = require("../../models/allModel");

const { createJwtToken } = require("../../uti/auth");

const { statustype } = require("../typeDef/statusType");

const register = {
  type: GraphQLString,
  description: "Register new user",
  args: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    displayName: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const { username, email, password, displayName } = args;
    const userdata = new User({
      username,
      email,
      password,
      displayName,
    });

    await userdata.save();
    const token = createJwtToken(userdata);
    return token;
  },
};

const login = {
  type: GraphQLString,
  description: "login user",
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: async (parent, args) => {
    const userdata = await User.findOne({ email: args.email }).select(
      "+password"
    );
    console.log(userdata);
    if (!userdata || args.password !== userdata.password) {
      throw new Error("invalid credentials ");
    }

    const token = createJwtToken(userdata);
    return token;
  },
};

const addPost = {
  type: postType,
  description: "Create new blog post",
  args: {
    title: { type: GraphQLString },
    body: { type: GraphQLString },
  },
  async resolve(parent, args, { verifiedUser }) {
    console.log("Verified User: ", verifiedUser);
    if (!verifiedUser) {
      throw new Error("Unauthorized");
    }

    const post = new Post({
      authorId: verifiedUser._id,
      title: args.title,
      body: args.body,
    });

    return await post.save();
  },
};

const updatePost = {
  type: postType,
  description: "update blog post",
  args: {
    id: { type: GraphQLID },
    title: { type: GraphQLID },
    body: { type: GraphQLID },
  },
  resolve: async (parent, args, { verifiedUser }) => {
    if (!verifiedUser) {
      throw new Error("unauathanticated");
    }

    const postUpdated = await Post.findOneAndUpdate(
      {
        _id: args.id,
        authorId: verifiedUser._id,
      },
      { title: args.title, body: args.body },
      { new: true, runValidators: true }
    );

    if(!postUpdated){
      throw new Error("no post with given id found for the author")
    }
      return postUpdated
  }, 

};


const deletePost = {
  type: GraphQLString,
  description: "Delete post",
  args: {
    postId: { type: GraphQLString },
  },
  async resolve(parent, args, { verifiedUser }) {
    console.log(verifiedUser)
    if (!verifiedUser) {
      throw new Error("Unauthenticated")
    }
    const postDeleted = await Post.findOneAndDelete({
      _id: args.postId,
      authorId: verifiedUser._id,
    })
    if (!postDeleted) {
      throw new Error("No post with the given ID found for the author")
    }

    return "Post deleted"
  },
}



const addComment = {
  type: commentType,
  args: {
    comment: { type: GraphQLString },
    postId: { type: GraphQLString },
  },
  resolve: async (parent, args, { verifiedUser }) => {
    // console.log(args,"this is our args")
    const comment = new Comment({
      userId: verifiedUser._id,
      postId: args.postId,
      comment: args.comment,
    });
    console.log("hello");
    const commentData = await comment.save();
    return commentData;
  },
};


const updateComment = {
  type: commentType,
  description: "update blog comment",
  args: {
    id: { type: GraphQLString },
    comment: { type: GraphQLString },
  },
  resolve: async (parent, args, { verifiedUser }) => {
    if (!verifiedUser) {
      throw new Error("unauathanticated");
    }

    const commentUpdated = await Comment.findOneAndUpdate(
      {
        _id: args.id,
        userId: verifiedUser._id,
      },
      { comment: args.comment },
      { new: true, runValidators: true }
    );

    if(!commentUpdated){
      throw new Error("no post with given id found for the author")
    }
      return commentUpdated
  }, 

};


const deleteComment = {
  type: GraphQLString,
  description: "Delete comment",
  args: {
    commentId: { type: GraphQLString },
  },
  async resolve(parent, args, { verifiedUser }) {
    console.log(verifiedUser)
    if (!verifiedUser) {
      throw new Error("Unauthenticated")
    }
    const commentDeleted = await Comment.findOneAndDelete({
      _id: args.commentId,
      userId: verifiedUser._id,
    })
    if (!commentDeleted) {
      throw new Error("No post with the given ID found for the author")
    }

    return "Comment  deleted"
  },
}



module.exports = { register, login, addPost, addComment ,updatePost , deletePost , updateComment , deleteComment};
