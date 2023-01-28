import bcrypt from "bcrypt";

// verificando se a senha colocada e aceitavel
 const hashPassword = (pasword) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            if(err){
                reject(err);
            }
            bcrypt.hash(pasword, salt, (err, hash) => {
                if(err){
                    reject(err);
                }
                resolve(hash);
            });
        });
    });
};

const comparePassword = (pasword, hashed) => {
    return bcrypt.compare(pasword, hashed);
};
export {hashPassword, comparePassword};