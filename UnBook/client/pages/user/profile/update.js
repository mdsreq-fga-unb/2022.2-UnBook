import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Modal } from "antd";
import Link from "next/link";
import AuthForm from '../../../components/forms/AuthForm';
import { UserContext } from '../../../context';
import { useRouter } from 'next/router';
 
const ProfileUpdate = () => {
  const [userName, setUsername] = useState("")
  const [about, setAbout] = useState("")
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const [state] = useContext(UserContext);

  useEffect(() => {
    if(state && state.user) {
      // console.log("user from state =>", state.user)
      setUsername(state.user.userName);
      setAbout(state.user.about);
      setName(state.user.name);
      setEmail(state.user.email);
    }
  }, [state && state.user])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.table({ name, email, password, secret });
      setLoading(true);
      const { data } = await axios.put(
        `/profile-update`, 
        {
          userName,
          about,
          name,
          email,
          password,
          secret,
        }
      );
      console.log("update response =>", data);

        if(data.error){
          toast.error(data.error);
          setLoading(false);
        } else {
          setOk(true);
          setLoading(false);
        }     
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row py-5 text-light bg-default-image">
        <div className="col text-center">
          <h1>Perfil</h1>
        </div>
      </div>
      <div className="row py-5">
        <div className="col-md-4 offset-md-4">
          <AuthForm 
            profileUpdate = {true}
            userName = {userName}
            setUsername = {setUsername}
            about = {about}
            setAbout = {setAbout}
            handleSubmit = {handleSubmit}
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
            <p>Informações atualizadas!</p>
          </Modal>
        </div>
      </div>

        <div className='row'>
          <div className='col'>
            <p className='text-center'>Já possui uma conta? {" "}<Link href="/login">Login</Link></p>
          </div>
        </div>
    </div>
  );
};

export default ProfileUpdate;