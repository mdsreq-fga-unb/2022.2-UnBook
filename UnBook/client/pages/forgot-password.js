import { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Modal } from "antd";
import Link from "next/link";
import ForgotPasswordForm from '../components/forms/ForgotPaswordForm';
import { UserContext } from '../context';
import { useRouter } from 'next/router';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [secret, setSecret] = useState('');
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const [state] = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(name, email, password, secret);
      setLoading(true);
      const { data } = await axios.post(`/forgot-password`, {
        email,
        newPassword,
        secret,
      });
   
      // console.log("forgot password res => ", data);
   
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      }
   
      if (data.success) {
        setEmail("");
        setNewPassword("");
        setSecret("");
        setOk(true);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  //impedir que o usuario mude de pagina pela barra do navegador
  if(state && state.token) router.push("/");

  return (
    <div className="container-fluid">
      <div className="row py-5 text-light bg-default-image">
        <div className="col text-center">
          <h1>Esqueci minha senha</h1>
        </div>
      </div>
      <div className="row py-5">
        <div className="col-md-4 offset-md-4">
          <ForgotPasswordForm 
            handleSubmit = {handleSubmit}
            email = {email}
            setEmail = {setEmail}
            newPassword = {newPassword}
            setNewPassword = {setNewPassword}
            secret = {secret}
            setSecret = {setSecret}
            loading = {loading}
          />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <Modal
            title="Parabéns!"
            visible={ok}
            onCancel={() => setOk(false)}
            footer={null}
          >
            <p>Agora você pode entrar na plataforma com sua nova senha</p>
            <Link href="/login" className="btn btn-primary btn-sm">Login</Link>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;