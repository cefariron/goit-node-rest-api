import jwt from "jsonwebtoken"
import HttpError from "../helpers/HttpError.js";


export const signToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET_WORD, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
}

export const checkToken = (token) => {
    if(!token) throw HttpError(401, "Not authorized");

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET_WORD);
        return id;
    } catch (error) {
        throw HttpError(401, "Not authorized");
    }
}