require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const jwt =require('jsonwebtoken');
const server = express();
const connectDB=require('./utils/db');
const cors = require('cors');
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
//const {z}=require('zod')

server.use(bodyParser.json());


const corsOptions={

    origin:"http://localhost:3000",
    methods:"POST,GET,PUT,PATCH,DELETE",
    Credentials:true,
}
server.use(cors(corsOptions));


server.use(express.json());



const { Schema } = mongoose;


// const signupschema = z.object({
//     username: z
//     .string({required_error:"name is required"}).trim().min(3,{msg:"name must be atleast 3 letters "})
//     .max(50,{message:"Name must not be more than 50 letters"}),
//     email: z
//     .string({required_error:"email is required"}).trim().min(3,{msg:"email must be atleast 3 letters "})
//     .max(50,{message:"email must not be more than 50 letters"})
//     .email({msg:"Invalid emial address"}),
//     number: z
//     .string({required_error:" phone number is required"}).trim().min(10,{msg:"number must be atleast 10 numbers "})
//     .max(15,{message:"number must not be more than 15 numbers"}),
//     password: z
//     .string({required_error:"password is required"}).trim().min(8,{msg:"password must be atleast 8 letters "})
//     .max(15,{message:"password must not be more than 15 letters"})
    
// })

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
       required: true
    },
    password: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        
    },
  
});

userSchema.methods.generateToken=async function(){
try {
    return jwt.sign({
        userId:this._id.toString(),
        email:this.email
    },
    process.env.JWT_SECRET_KEY,{
    expiresIn:"30d",
    }
    )
} catch (error) {
    console.error(error);
}
};

const User = mongoose.model("User", userSchema);

const register = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;

        const userExist = await User.findOne({ email });

        if (userExist) {
            console.log("user already exist");
            return res.status(400).json("user already exists");
        }
         

        const saltRound =10;
        const hash_password = await bcrypt.hash(password,saltRound);
        const userCreated = await User.create({ username, email, phone, password:hash_password });
        res.status(200).json({
            msg: "Registration successful",userCreated,
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
           
                 
        });
       
    
        console.log("user created successfully.");
       
         
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal Server Error");
    }
};


server.route('/register').post(register)



let loggedInUsername = "";

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(400).json({ message: "Invalid Credentials " });
        }
        const passwordMatch = await bcrypt.compare(password, userExist.password);
        if (passwordMatch) {
            loggedInUsername = userExist.email;
            res.status(200).json({
                msg: "Login successful",
        
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            });
        } else {
            res.status(401).json({ message: "Invalid email or password " });
        }
    } catch (error) {
        console.log("Internal server error");
    }
  
};

server.route('/login').post(login);

const Todoschema=new Schema({
    email:{
        type:String
    },
    todo:{
        type:String,
       
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },


})
const Todo = mongoose.model("Todo", Todoschema);



const todos=async (req,res)=>{
    try {
        const email=loggedInUsername;
        const {todo,date,time}=req.body;
        const created=await Todo.create({todo,date,time,email});
        if(created){
            res.status(200).json({msg:"Todo created : ",created});
        }else{
            res.status(400).json({msg:"User Invalid !"});
        }

    } catch (error) {
        res.status(404).json({msg:"Internal server error"});
    }

   
}

server.route('/todo').post(todos);

const FindTodo=async (req,res)=>{
    try {
        const email=loggedInUsername;
    if(login){
        const Find = await Todo.find({email});
        if(Find){
            res.status(200).json({msg:"Todos found : ",Find});
        }else{
            res.status(400).json({msg:"failed to fetch Todos or Todos not exist"});
        }
    }
    } catch (error) {
        res.status(400).json({msg:"Internal server error"});
    }

}
server.route('/foundTodos').post(FindTodo);


server.delete('/deltodos/:id', async (req, res) => {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.json({ success: true });
  });

  

  


connectDB().then(()=>{
server.listen(9090,(req,res)=>{
    console.log("server started ");
})
})

module.exports={register,login,todos,FindTodo};

