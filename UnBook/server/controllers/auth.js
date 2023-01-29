import User from "../models/user";
import {hashPassword, comparePassword} from "../helpers/auth";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    // console.log("REGISTER ENDPOINT =>", req.body);
    const {name, email, password, secret} = req.body;

    // validacoes
    if(!name) return res.status(400).send("Campo 'nome' não preenchido!");
    if(!password || password.lenght < 8) return res.status(400).send("A senha deve possuir ao menos 6 caracteres.");
    if(!secret) return res.status(400).send("É necessário responder a pergunta.");
    const exist = await User.findOne({email});
    if(exist) return res.status(400).send("Email já cadastrado.");

    // criptografar senha
    const hashedPassword = await hashPassword(password);

    //criando o usuario
    const user = new User({name, email, password:hashedPassword, secret});
    try{
        await user.save();
        // console.log("USUARIO SALVO =>", user);
        return res.json({ 
            ok: true, 
        });
    }catch (err){
        console.log("FALHA NO REGISTRO =>", err);
        return res.status(400).send("Erro. Tente novamente.");
    }
};

export const login = async (req, res) => {
    // verificando se esta recebendo os dados
    //console.log(req.body);
    try{
        // verificando se o email existe na db
        const{ email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send("Usuário não encontrado.");
        // verificando a senha
        const match = await comparePassword(password, user.password);
        if(!match) return res.status(400).send("Senha incorreta.");
        // criando um token sinalizador
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "2m"});
        user.password = undefined;
        user.secret = undefined;
        res.json({
            token,
            user,
        })
    } catch(err){
        console.log(err);
        return res.status(400).send("Erro.Tente novamente.");
    }
};

export const currentUser = async(req, res) => {
    try {
      const user = await User.findById(req.auth._id).select("-password");
      // res.json(user)
      res.json({ ok: true });
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
}