const express = require("express");
const app =  express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const dbConnection = require("./config/db");
const { graphqlHTTP } = require("express-graphql")

dbConnection() /// dc connection 

const { authenticate } = require("./middlewares/authentication");

app.use(authenticate);

const {createJwtToken} = require("./uti/auth")

      
   
app.get("/",(req,res) => {
  // console.log(req.verifiedUser)
  res.json("welcom:go to /graphql") 
})    
   
 

app.get("/test",(req,res)=> {
    res.json(createJwtToken({username:"kunal",email:"kunaljangra12@gmail.com",displayName:'kunal jangra'}));
})

// graphql integiration 

const schema = require("./graphql/schema")  

app.use(
    '/graphql',
    graphqlHTTP({
      schema,  
      graphiql: true,
    }),
  );



app.listen(PORT,()=> console.log(`server is running on ${PORT}`))