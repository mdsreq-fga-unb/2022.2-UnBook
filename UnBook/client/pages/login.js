import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Modal } from "antd";
import Link from "next/link";
import AuthForm from '../components/forms/AuthForm';
import { useRouter } from "next/router";
 
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.table({ name, email, password, secret });
        setLoading(true);
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/login`,
       {
        email,
        password,
      });

      router.push("/");
    } catch (err) {
        toast.error(err.response.data);
        setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row py-5 text-light bg-default-image">
        <div className="col text-center">
          <h1>Página de Login</h1>
        </div>
      </div>
      <div className="row py-5">
        <div className="d-flex justify-content-center">
          <AuthForm 
            handleSubmit = {handleSubmit}
            setEmail = {setEmail}
            password = {password}
            setPassword = {setPassword}
            loading = {loading}
            page = "login"
          />
        </div>
      </div>

        <div className='row'>
          <div className='col'>
            <p className='text-center'>Ainda não possui uma conta? {" "}<Link href="/register">Cadastrar</Link></p>
          </div>
        </div>
    </div>
  );
};

export default Login;