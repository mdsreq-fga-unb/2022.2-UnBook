import { SyncOutlined } from "@ant-design/icons";
import { UilUserCircle, UilLock, UilEnvelope, UilKeySkeletonAlt, UilQuestionCircle, UilCommentExclamation } from '@iconscout/react-unicons'
import PulseLoader from "react-spinners/PulseLoader";

const AuthForm = ({
    handleSubmit, 
    name, 
    setName, 
    email, 
    setEmail, 
    password, 
    setPassword, 
    secret, 
    setSecret, 
    loading, 
    page, 
    userName, 
    setUsername, 
    about, 
    setAbout,
    profileUpdate,
}) => (
    <form onSubmit={handleSubmit}>
            {profileUpdate && (
              <div className="input-field">
                 <UilUserCircle className="input-icon" size="2rem" />
                <input
                  data-testid="name-input"
                  value={userName}
                  onChange={e => setUsername(e.target.value)}
                  type="text"
                  placeholder="Digite seu User name" />
              </div>
            )}

            {profileUpdate && (
              <div className="input-field">
              <UilCommentExclamation className="input-icon" size="2rem" />
              <input
                data-testid="name-input"
                value={about}
                onChange={e => setAbout(e.target.value)}
                type="text"
                placeholder="Escreva sobre você..." />
              </div>
            )}

            {page !== "login" && (
              <div className="input-field">
                <UilUserCircle className="input-icon" size="2rem" />
                <input
                  data-testid="name-input"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  type="text"
                  placeholder="Digite seu nome" />
              </div>)}

              

            <div className="input-field">
              <UilEnvelope className="input-icon" size="2rem" />
              <input
                data-testid="email-input"
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
              
                placeholder="Digite seu e-mail"
                disabled={profileUpdate} />
            </div>

            <div className="input-field">
              <UilLock className="input-icon" size="2rem" />
              <input
                data-testid="password-input"
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                placeholder="Digite sua senha" />
            </div>

            {page !== "login" && (
              <>
              <div className="input-field">
                <UilQuestionCircle className="input-icon" size="2rem" />
                <select data-testid="select-input" className="select-field">
                  <option className="select-option">Qual é sua cor favorita?</option>
                  <option className="select-option">Qual é o nome do seu melhor amigo?</option>
                  <option className="select-option">Qual é sua comida favorita?</option>
                </select>
{/* 
                <small className="form-text text-muted">
                  Você pode usar esta resposta para recuperar sua senha, se esquecer.
                </small> */}
              </div>

              <div className="input-field">
              <UilKeySkeletonAlt className="input-icon" size="2rem" />
                <input
                  data-testid="secret-input"
                  value={secret}
                  onChange={e => setSecret(e.target.value)}
                  type="text"
                
                  placeholder="Digite sua resposta aqui" />
              </div>
              </>
            )}


            <div className="form-group p-2">
              <button 
                value="Entrar"
                data-testid="register-button"
                disabled={
                  profileUpdate ? loading :
                  page === "login" 
                    ? !email || !password || loading
                    : !name || !email || !secret || !password || loading
                  } 
                  className="btn-login">
                {loading ? <PulseLoader color="#FFFFFF"/> : "Enviar"}
              </button>
            </div>
    </form>

);

export default AuthForm;