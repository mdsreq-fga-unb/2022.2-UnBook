import { useContext, useState } from "react";
import { UserContext } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import CreatePostForm from "../../components/forms/CreatePostForm";
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from "react-toastify";

const Home = () => {
    const [state, setState] = useContext(UserContext);
    const [content, setContent] = useState("");
    const router = useRouter();

    const postSubmit = async (e) => {
      e.preventDefault();
      // console.log("post =>", content);
      try {
        const { data } = await axios.post("/create-post", { content });
        console.log("create poste response =>", data);
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success("Publicação criada com sucesso!");
          setContent("");
          router.push("/user/dashboard");
        }
      } catch (err) {
        console.log(err);
      }
    };

    return(
      <UserRoute>
        <div className = "container-fluid">
          <div className="row py-5 text-light bg-default-image">
            <div className="col text-center">
              <h1>Feed</h1>
            </div>
          </div>
            <div className="row py-3">
                <div className="col-md-8">
                  <CreatePostForm 
                    content={content} 
                    setContent={setContent}
                    postSubmit={postSubmit}
                  />
                </div>
                <div className="col-md-4">Sidebar</div>
            </div>
        </div>
      </UserRoute>
    );
};

export default Home;