import express from "express"
import cors from "cors"
import jwt from 'jsonwebtoken'
import { sample_users } from './data';

const app = express()
app.use(express.json())
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}))

app.get('/api/users',(req,res) =>
{
    res.send(sample_users)
})

app.post("/api/users/login", (req, res) => {
    const {email, password} = req.body;
    const user = sample_users.find(user => user.email === email 
      && user.password === password);
  
     if(user) {
      res.send(generateTokenResponse(user));
     }
     else{
       const BAD_REQUEST = 400;
       res.status(BAD_REQUEST).send("Username or password is invalid!");
     }
  
  })
  
  const generateTokenResponse = (user : any) => {
    const token = jwt.sign({
      email:user.email, isAdmin: user.isAdmin
    },"SomeRandomText",{
      expiresIn:"30d"
    });
  
    user.token = token;
    return user;
  }
const port = 5000
app.listen(port, () => 
{
    console.log("Website served on http://localhost:" + port)
})