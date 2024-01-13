const express = require('express')
const bodyParser = require('body-parser')

// initialize mongoose 
const mongoose = require('mongoose')
const crypto = require('crypto')
const nodemailer = require('nodemailer')


const app = express()
const port = 8000;
const cors = require('cors')
app.use(cors())


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
const jwt = require('jsonwebtoken')


mongoose.connect('mongodb+srv://shaadpyaralisufi:passwordpassword@cluster0.9upnph1.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser : true, 
    useUnifiedTopology: true , 
}).then(
    ()=> console.log('Connected to mongoDB')).catch(
        (err) =>{console.log('Error connecting to mongoDB',err)})


app.listen(port,()=>{console.log('Server is running on port 8000')})


// import schemas 
const User = require('./models/user')
const Order = require('./models/order')


// generating secret key for login 
const generateSecretKey = () =>{
    const secretKey = crypto.randomBytes(32).toString("hex")
    return secretKey

}
const secretKey = generateSecretKey()



app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // create a new user
        const newUser = new User({ name, email, password });

        // save the user to the database
        await newUser.save();

        res.status(200).json({ message: "User registered successfully" });

    } catch (error) {
        console.log('Error registering user', error);
        res.status(500).json({ message: "Registration failed" });
    }
});



// end point to login in the user 

app.post('/login',async(req,res)=>{
    try{
        const {email,password} = req.body 
        // check if the user exists 

        const user = await User.findOne({email})
        if (!user){
            return res.status(401).json({message:"Invalid email or password"})
        }
        // check if the password is correct

        if (user.password !== password){
            return res.status(401).json({message:"Invalid password"})
        }
        // generate a token 
        const token = jwt.sign({userId:user._id},secretKey)
        res.status(200).json({token})
    }catch(error){
        res.status(500).json({message:"Login failed"})
    }
})



//endpoint to store a new address to the backend
app.post("/addresses", async (req, res) => {
    try {
      const { userId, address } = req.body;
  
      //find the user by the Userid
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      //add the new address to the user's addresses array
      user.addresses.push(address);
  
      //save the updated user in te backend
      await user.save();
  
      res.status(200).json({ message: "Address created Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error addding address" })
      
    }
  });


//endpoint to get all the addresses of a particular user
app.get("/addresses/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const addresses = user.addresses;
      res.status(200).json({ addresses });
    } catch (error) {
      res.status(500).json({ message: "Error retrieveing the addresses" });
    }
  });