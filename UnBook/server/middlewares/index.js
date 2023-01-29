const { expressjwt: jwt } = require("express-jwt");

export const requireSignin = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
});
 