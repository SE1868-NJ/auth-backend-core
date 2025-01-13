import jwt from "jsonwebtoken";
const ACCESS_TOKEN_SECRET = "JWT";

//next:call when token is valid -> go to next middleware -> next request handler
const verifyToken = (req, res, next) => {
    //lay header ra
    const authHeader = req.header("Authorization");

    //lay cai token ra (tach tu Bearer)
    //kiem tra xem co token ko, neu co thi tach ra
    const token = authHeader?.split(" ")[1];

    //neu ko co token, nguoi dung ko co quyen truy cap
    if (!token) {
        return res.sendStatus(401); //unauthorized
    }

    //verify token
    try {
        const userDecoded = jwt.verify(token, ACCESS_TOKEN_SECRET);

        req.id = userDecoded.id; //luu userid vao reqid
        next(); //da verify thanh cong -> next middleware
    } catch (error) {
        console.log(error);
        return res.sendStatus(403); //forbidden
    }
};

export default verifyToken;
