import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Modal } from "antd";
import Link from "next/link";
import { SyncOutlined } from "@ant-design/icons";
 
const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secret, setSecret] = useState('');
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.table({ name, email, password, secret });
      setLoading(true);
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/register`, {
        name,
        email,
        password,
        secret,
      });
      setName('');
      setEmail('');
      setPassword('');
      setSecret('');
      setOk(data, ok);
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data)
    }
  };

  return (
    <div className="container-fluid">
      <div className="row py-5 text-light bg-default-image">
        <div className="col text-center">
          <h1>Página de Cadastro</h1>
        </div>
      </div>

      <div className="row py-5">
        <div className="d-flex justify-content-center">
          <form onSubmit={handleSubmit}>
            <div className="form-group py-2">
              <label className="text-muted"><small>Nome</small></label>
              <input
                data-testid="name-input"
                value={name}
                onChange={e => setName(e.target.value)}
                type="text" className="form-control"
                placeholder="Digite seu nome" />
            </div>

            <div className="form-group py-2">
              <label className="text-muted"><small>E-mail</small></label>
              <input
                data-testid="email-input"
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
                className="form-control"
                placeholder="Digite seu e-mail" />
            </div>

            <div className="form-group py-2">
              <label className="text-muted"><small>Senha</small></label>
              <input
                data-testid="password-input"
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password" className="form-control"
                placeholder="Digite sua senha" />
            </div>

            <div className="form-group py-2">
              <label className="text-muted"><small>Escolha uma pergunta</small></label>
              <select className="form-control" data-testid="select-input">
                <option>Qual é sua cor favorita?</option>
                <option>Qual é o nome do seu melhor amigo?</option>
                <option>Qual é sua comida favorita?</option>
              </select>
              <small className="form-text text-muted">
                Você pode usar esta resposta para recuperar sua senha, se esquecer.
              </small>
            </div>

            <div className="form-group py-2">
              <label className="text-muted"><small>Resposta</small></label>
              <input
                data-testid="secret-input"
                value={secret}
                onChange={e => setSecret(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Digite sua resposta aqui" />
            </div>

            <div>
              <button data-testid="register-button" disabled={!name || !email || !password || !secret} className="btn btn-primary col-12">
                {loading ? <SyncOutlined spin className="py-1" /> : "Cadastrar"}
              </button>
            </div>

          </form>
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
            <p>Usuário cadastrado!</p>
            <Link href="/login" className="btn btn-primary btn-sm">Login</Link>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Register;