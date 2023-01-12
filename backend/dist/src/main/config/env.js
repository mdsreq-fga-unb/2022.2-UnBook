"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    mongoUrl: process.env.MONGO_URL ||
        "mongodb+srv://unbook:XS30zlzxhc7kOMwQ@unbook.ypguopm.mongodb.net/test",
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "tj67O==5H",
};
