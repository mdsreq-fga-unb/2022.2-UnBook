import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context";
import AdminRoute from "../../components/routes/AdminRoute";
import { useRouter, userRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import renderHTML from "react-render-html";

const Admin = () => {
const [state, setState] = useContext(UserContext);
// posts
const [posts, setPosts] = useState([]);

// users
const [users, setUsers] = useState([]);

// route
const router = useRouter();

useEffect(() => {
    if (state && state.token) {
        newsFeed();
        loadUsers();
    }
}, [state && state.token]);

const newsFeed = async () => {
    try {
        const { data } = await axios.get(`/posts`);
        setPosts(data);
        // console.log(data);
    } catch (err) {
        console.log(err);
    }
};
const loadUsers = async () => {
    try {
        const { data } = await axios.get(`/users`);
        setUsers(data);
        // console.log(data);
    } catch (err) {
        console.log(err);
    }
};

const handleDeletePost = async (post) => {
    try {
        const answer = window.confirm("Você tem certeza que deseja excluir essa publicação?");
        if (!answer) return;
            const { data } = await axios.delete(`/admin/delete-post/${post._id}`);
            toast.error("Publicação deletada");
             newsFeed();
    } catch (err) {
        console.log(err);
    }
};

const handleDeleteUser = async (user) => {
    try {
        const answer = window.confirm("Você tem certeza que deseja excluir esse usuário?");
        if (!answer) return;
            const { data } = await axios.delete(`/admin/delete-user/${user._id}`);
            toast.error("Usuário deletado");
            loadUsers();
    } catch (err) {
        console.log(err);
    }
};

return (
    <AdminRoute>
        <div className="container-fluid">
            <div className="row py-5 text-light bg-default-image">
                <div className="col text-center">
                    <h1>ADMIN</h1>
                </div>
            </div>
            <div className='row py-4'>
              <div className='col-md-8 offset-md-2'>
                {posts && posts.map(post => (
                <div className='card'>
                    <div className='d-flex justify-content-between' key={post._id}>
                      <div>
                        {renderHTML(post.content)} - {post.postedBy && <b>{post.postedBy.name}</b>}
                      </div>
                      <div>
                        <button onClick={() => handleDeletePost(post)} className='text-danger'>Deletar</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className='row py-4'>
              <div className='col-md-8 offset-md-2'>
                {users && users.map(user => (
                <div className='card'>
                    <div className='d-flex justify-content-between' key={user._id}>
                      <div>
                        {user.name} - {user.userName}
                      </div>
                      <div>
                        <button onClick={() => handleDeleteUser(user)} className='text-danger'>Deletar</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </div>
    </AdminRoute>
  );
};

export default Admin;