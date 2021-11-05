import Admin from "../models/admin.model.js";
import { registerValidation, loginValidation } from "../includes/validation.js";
import jwt from "jsonwebtoken";
import { ResponseStatus } from "../includes/status.js";
import response from "../includes/response.js";

export const register = async(req, res) => {
    const data = req.body;
    const { error } = registerValidation(data);
    const newAdmin = new Admin();

    if (error)
        return res.send(
            new response({
                status: ResponseStatus.ERROR,
                message: error.details[0].message,
            })
        );
    try {
        const existingAdmin = await Admin.findOne({ username: data.username });
        if (existingAdmin)
            return res.send(
                new response({
                    status: ResponseStatus.ERROR,
                    message: "Admin already exists",
                })
            );

        newAdmin.username = data.username;
        newAdmin.name = data.name;
        newAdmin.school = data.school;
        newAdmin.score = data.score;
        newAdmin.password = await newAdmin.encryptPassword(data.password);
    } catch (err) {
        console.log(err);
        return res.send(
            new response({
                status: ResponseStatus.ERROR,
                message: "Problems while processing",
            })
        );
    }

    try {
        const savedAdmin = newAdmin.save()
        const token = jwt.sign({ _id: savedAdmin._id },
            process.env.TOKEN_SECRET
        );

        res.send(
            new response({
                message: "Admin added successfully",
                data: { token: token },
            })
        );

    } catch (err) {
        res.send(new response({ status: ResponseStatus.ERROR, message: err.errors }))
    }
};

export const login = async(req, res) => {
    const data = req.body;
    const { error } = loginValidation(data);

    if (error)
        return res.send(
            new response({
                status: ResponseStatus.ERROR,
                message: error.details[0].message,
            })
        );

    const admin = await Admin.findOne({ username: data.username });
    if (!admin)
        return res.send(
            new response({
                status: ResponseStatus.ERROR,
                message: "Username or Password are wrong",
            })
        );

    const validPass = await admin.comparePassword(data.password);
    if (!validPass)
        return res.send(
            new response({
                status: ResponseStatus.ERROR,
                message: "Username or Password are wrong",
            })
        );

    const token = jwt.sign({ _id: admin._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send(
        new response({
            message: "User logged in",
            data: { token: token },
        })
    );
};

export function auth(req, res, next) {
    const token = req.header("auth-token");
    if (!token)
        return res.status(401).send(
            new response({
                status: ResponseStatus.ERROR,
                message: "Access Denied",
            })
        );

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.username = verified;
        next();
    } catch (err) {
        return res.status(400).send(
            new response({
                status: ResponseStatus.ERROR,
                message: "Invalid Token",
            })
        );
    }
}