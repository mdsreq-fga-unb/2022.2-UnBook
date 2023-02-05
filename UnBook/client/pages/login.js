import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import Link from "next/link";
import AuthForm from "../components/forms/AuthForm";
import { useRouter } from "next/router";
import { UserContext } from "../context";



const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secret, setSecret] = useState('');
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addClass, setAddClass] = useState(false);

  const [state, setState] = useContext(UserContext) || [];
  const router = useRouter();

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      // console.log(name, email, password, secret);
      setLoading(true);
      const { data } = await axios.post(
        `/login`,  
        {
          email,
          password,
        }
      );

      if(data.error){
        toast.error(data.error);
        setLoading(false);
      }else{
        // atualiza o estado do usuário
        setState({
          user: data.user,
          token: data.token,
        });

        // salva o usuário e o token no localStorage
        window.localStorage.setItem("auth", JSON.stringify(data));
        router.push("/");
      }

    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  const handleSubmitSignup = async (e) => {
    
    e.preventDefault();
    try {
      // console.table({ name, email, password, secret });
      setLoading(true);
      const { data } = await axios.post(
        "/register", 
        {
          name,
          email,
          password,
          secret,
        }
      );

        if(data.error){
          toast.error(data.error);
          setLoading(false);
        } else {
          setName("");
          setEmail("");
          setPassword("");
          setSecret("");
          setOk(data.ok);
          setLoading(false);
        }

      
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  const handleClick = () => {
    setAddClass(!addClass);
  };


  //impedir que o usuario mude de pagina pela barra do navegador
  if(state && state.token) router.push("/");

  return (
    <div className={`container-login ${addClass ? "sign-up-mode" : ""}`}>
      <div className='forms-container'>
        <div className="signin-signup">
          <div className='form-login sign-in-form'>
            <h2 className="title">Faça seu login</h2>
            <AuthForm
                handleSubmit={handleSubmitLogin}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                loading={loading}
                page="login"
            />
            <p className="text-center">
              <Link className="text-danger" href="/forgot-password">
                Esqueci minha senha.
              </Link>
            </p>
          </div>
          
          <div className='form-signup sign-in-form'>
            <h2 className="title">Faça seu cadastro</h2>
            <AuthForm 
              handleSubmit = {handleSubmitSignup}
              name = {name}
              setName = {setName}
              email = {email}
              setEmail = {setEmail}
              password = {password}
              setPassword = {setPassword}
              secret = {secret}
              setSecret = {setSecret}
              loading = {loading}
            />
            <div className="row">
              <div className="col">
                <Modal
                  title="Parabéns!"
                  visible={ok}
                  onCancel={() => setOk(false)}
                  footer={null}
                >
                <p>Usuário cadastrado!</p>
                <Link href="/login" className="btn btn-primary btn-sm">Login</Link>
                </Modal>
              </div>
            </div>

            <div className='row'>
              <div className='col'>
                <p className='text-center'>Já possui uma conta? {" "}<Link href="/login">Login</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <h3>É novo por aqui?</h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis!</p>
            <button class="btn-login  transparent" id="sign-up-btn" onClick={handleClick}>Cadastrar</button>
          </div>
          <img className='image' src="images/login-social.svg" alt="" />
        </div>

        <div class="panel right-panel">
          <div class="content">
            <h3>Já possui uma conta?</h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis!
            </p>
            <button class="btn-login  transparent" id="sign-in-btn"  onClick={handleClick} >Entrar</button>
          </div>
          <img className='image' src="images/signup-social.svg" alt="" />
        </div>
      </div>

    </div>
  );
};

export default Login;