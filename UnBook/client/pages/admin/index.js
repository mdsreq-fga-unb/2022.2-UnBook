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

// route
const router = useRouter();

useEffect(() => {
    if (state && state.token) {
        newsFeed();
    }
}, [state && state.token]);

const newsFeed = async () => {
    try {
        const { data } = await axios.get(`/posts`);
        setPosts(data);
        console.log(data);
    } catch (err) {
        console.log(err);
    }
};

const handleDelete = async (post) => {
    try {
        const answer = window.confirm("Are you sure?");
        if (!answer) return;
            const { data } = await axios.delete(`/admin/delete-post/${post._id}`);
            toast.error("Post deleted");
        newsFeed();
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
        </div>
    </AdminRoute>
  );
};

export default Admin;