import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
    try {

        let token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        if (token && isCustomAuth) {
            let user = jwt.verify(token, process.env.SECRET_KEY);
            req.userId = user?.id;
        } else {
            user = jwt.decode(token);
            req.userId = user?.sub;

        }
        next();

    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Unauthorized User" })
    }
}
