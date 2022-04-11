import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../Models/user.js'
import googleUser from '../Models/googleUser.js'

export const signin = async (req, res) => {

    const { email, password } = req.body;

    try {
        const existinguser = await User.findOne({ email })

        if (!existinguser) return res.status(404).json({ message: 'User does not Exist' })

        const ispasswordCorrect = await bcrypt.compare(password, existinguser.password,)

        if (!ispasswordCorrect) return res.status(404).json({ message: "Invalid Credentials" })

        const token = jwt.sign({ email: existinguser.email, id: existinguser._id }, 'test', { expiresIn: "1h" })

        res.status(200).json({ result: existinguser, token })

    } catch (error) {
        console.log(error);
        res.status(500).json("Something is WWWWrong !!")
    }

}

export const signup = async (req, res) => {
    
    const { email, password, firstName, lastName } = req.body;
  
    try {
        const existinguser = await User.findOne({ email })

        if (existinguser) return res.status(404).json({ message: 'User Already Exist' })

        const hashedpassword = await bcrypt.hash(password, 12)

        const result = await User.create({ email: email, password: hashedpassword, name: `${firstName} ${lastName}` });

        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" })

        res.status(201).json({ result, token })


    } catch (error) {
        res.status(500).json("Something is Wronggg !!")
        console.log(error);
    }
}


export const signupgoogle = async (req, res) => {
 
    const {email , firstName , lastName }  = req.body;

    try {
        const existinguser = await googleUser.findOne({ email })

        if (existinguser) return res.status(404).json({ message: 'User Already Exist' })
        
        const result = await googleUser.create({ email: email, name: `${firstName} ${lastName}` });

        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" })

        res.status(201).json({ result, token })

    } catch (error) {
        res.status(500).json("Something went wrong in google signup");
        console.log(error);
    }


}

export const signingoogle = async(req, res) =>{
    const {email }  =  req.body;

    try {
        const existinguser = await googleUser.findOne({ email })

        if (!existinguser) return res.status(404).json({ message: 'User does not Exist' })

        const token = jwt.sign({ email: existinguser.email, id: existinguser._id }, 'test', { expiresIn: "1h" })

        res.status(200).json({ result: existinguser, token })

    } catch (error) {
        res.status(500).json("Something went wrong in google signup");
        console.log(error);
    }

} 







