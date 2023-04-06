import userModel from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {

    const { firstName, lastName, confirmPassword, email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password Doesn't match" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await userModel.create({
            email: email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`
        })

        const token = jwt.sign({ email: result.email, id: result._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
        res.status(201).json({ result, token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const signIn = async (req, res) => {

    const { email, password } = req.body;

    try {
        const existingUser1 = await userModel.findOne({ email: email });
        if (!existingUser1) {
            return res.status(404).json({ message: "User Not Found" });
        }

        const matchPassword = await bcrypt.compare(password, existingUser1.password);
        if (!matchPassword) {
            res.status(400).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign({ email: existingUser1.email, id: existingUser1._id }, process.env.SECRET_KEY);
        res.status(201).json({ result: existingUser1, token: token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
