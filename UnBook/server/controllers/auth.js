import User from "../models/user";
import {hashPassword, comparePassword} from "../helpers/auth";

export const register = async (req, res) => {
    // console.log("REGISTER ENDPOINT =>", req.body);
    const {name, email, password, secret} = req.body;

    // validacoes
    if(!name) return res.status(400).send("Campo 'nome' não preenchido!");
    if(!password || password.lenght < 8) return res.status(400).send("A senha deve possuir ao menos 6 caracters.");
    if(!secret) return res.status(400).send("É necessário responder a pergunta.");
    const exist = await User.findOne({email});
    if(exist) return res.status(400).send("Email já cadastrado.");

    // criptografar senha
    const hashedPassword = await hashPassword(password);

    //criando o usuario
    const user = new User({name, email, password:hashedPassword, secret});
    try{
        await user.save();
        console.log("USUARIO SALVO =>", user);
        return res.json({ 
            ok: true, 
        });
    }catch (err){
        console.log("FALHA NO REGISTRO =>", err);
        return res.status(400).send("Erro. Tente novamente.");
    }
};