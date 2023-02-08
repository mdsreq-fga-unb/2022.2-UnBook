import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Modal, Avatar } from "antd";
import Link from "next/link";
import AuthForm from '../../../components/forms/AuthForm';
import { UserContext } from '../../../context';
import { useRouter } from 'next/router';
import { LoadingOutlined, CameraOutlined } from '@ant-design/icons';
 
const ProfileUpdate = () => {
  const [userName, setUsername] = useState("")
  const [about, setAbout] = useState("")
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  //profile image
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);

  const router = useRouter();
  const [state, setState] = useContext(UserContext);

  useEffect(() => {
    if(state && state.user) {
      // console.log("user from state =>", state.user)
      setUsername(state.user.userName);
      setAbout(state.user.about);
      setName(state.user.name);
      setEmail(state.user.email);
      setImage(state.user.image);
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
          image,
        }
      );
      // console.log("update response =>", data);

        if(data.error){
          toast.error(data.error);
          setLoading(false);
        } else {
          // update local storage, update user, keep token
          let auth = JSON.parse(localStorage.getItem("auth"));
          auth.user = data;
          localStorage.setItem("auth", JSON.stringify(auth));
          // update context
          setState({ ...state, user: data });
          setOk(true);
          setLoading(false);
        }     
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  const handleImage = async (e) => {
    const file =e.target.files[0];
    let formData = new FormData()
    formData.append("image", file);
    //console.log([...formData]);
    setUploading(true);
    try{
      const {data} = await axios.post("/upload-image", formData);
      //console.log("upload image =>", data);
      setImage({
        url: data.url,
        public_id: data.public_id,
      })
      setUploading(false);
    }catch(err){
      console.log(err);
      setUploading(false);
    }
  };

  const handleDeleteUser = async (user) => {
    try {
        const answer = window.confirm("Você tem certeza que deseja excluir sua conta?");
        if (!answer) return;
            const { data } = await axios.delete(`/delete-user/${user._id}`);
            window.localStorage.removeItem("auth");
            setState(null);
            router.push("/login");
            toast.error("Sua conta foi excluída");
    } catch (err) {
        console.log(err);
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
          {/* upload image */}
          <label className="d-flex justify-content-center h5">
            {image && image.url ? (
                <Avatar size={40} src={image.url} className="mt-1" />
              ) : uploading ? (
                <LoadingOutlined className="mt-2 h5"/>
              ) : (
                <CameraOutlined className="mt-2 h5"/>
              )}
              <input 
                onChange={handleImage} 
                type="file" 
                accept="images/*" 
                hidden
              />
          </label>
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
            <p onClick={() => handleDeleteUser(state.user)} className='text-center'>Deseja excluir sua conta?</p>
          </div>
        </div>
    </div>
  );
};

export default ProfileUpdate;