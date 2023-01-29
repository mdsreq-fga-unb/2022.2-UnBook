import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secret, setSecret] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/register', {
      name,
      email,
      password,
      secret,
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
  };

  return (
    <div className="container-fluid">
      <div className="row py-5 bg-secondary text-light">
        <div className="col text-center">
          <h1>Página de Cadastro</h1>
        </div>
      </div>

      <div className="row py-5">
        <div className="d-flex justify-content-center">
          <form data-testid="form" onSubmit={handleSubmit}>
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
              <button className="btn btn-primary col-12" data-testid="register-button">Cadastrar</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;