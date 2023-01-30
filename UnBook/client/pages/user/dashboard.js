import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import CreatePostForm from "../../components/forms/CreatePostForm";
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from "react-toastify";

const Home = () => {
    const [state, setState] = useContext(UserContext);

    //state
    const [content, setContent] = useState("");
    const[image, setImage] = useState({});
    const [uploading, setUploading] = useState(false);

    //posts
    const [posts, setPosts] = useState([]);

    //route
    const router = useRouter();

    useEffect(() =>{
      if(state && state.token) fetchUserPosts();
    }, [state && state.token]);

    const fetchUserPosts = async () => {
      try{
        const {data} = await axios.get("/user-posts");
        //console.log("user posts => ", data);
        setPosts(data);
      }catch(err){
        console.log(err);
      }
    };

    const postSubmit = async (e) => {
      e.preventDefault();
      // console.log("post =>", content);
      setUploading(true);
      try {
        const { data } = await axios.post("/create-post", { content, image });
        console.log("create post response =>", data);
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success("Publicação criada com sucesso!");
          setContent("");
          setImage({});
        }
      } catch (err) {
        console.log(err);
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
                    handleImage={handleImage}
                    uploading={uploading}
                    image={image}
                  />
                </div>

                <pre>{JSON.stringify(posts, null, 4)}</pre>

                <div className="col-md-4">Sidebar</div>
            </div>
        </div>
      </UserRoute>
    );
};

export default Home;