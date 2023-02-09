import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import PostForm from "../../components/forms/PostForm";
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from "react-toastify";
import PostList from "../../components/cards/PostList";
import People from "../../components/cards/People";
import Link from "next/link";
import { Modal, Pagination } from "antd";
import CommentForm from "../../components/forms/CommentForms";
import Search from "../../components/Search";
import io from "socket.io-client";

const Home = () => {
  const [state, setState] = useContext(UserContext);
  // state
  const [content, setContent] = useState("");
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  // posts
  const [posts, setPosts] = useState([]);
  // people
  const [people, setPeople] = useState([]);
  // comments
  const [comment, setComment] = useState("");
  const [visible, setVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  // pagination
  const [totalPosts, setTotalPosts] = useState(0);
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);

  // route
  const router = useRouter();

    //socket
    const socket = io(process.env.NEXT_PUBLIC_SOCKETIO, {
      reconnection: true,
    });

  useEffect(() => {
    if (state && state.token) {
      newsFeed(page);
      findPeople();
    }
  }, [state && state.token, page]);  

  useEffect(() => {
    try {
      axios.get("/total-posts").then((res) => setTotalPosts(res.data));
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (socket) {
    socket.on("new-post", (post) => {
    setPosts([...posts, post]);
    newsFeed(); });}
    }, [socket]);

  useEffect(() => {
    if (socket) {
    socket.on("delete-post", (post) => {
    setPosts([...posts, post]);
    newsFeed(); });}
    }, [socket]);
  
  useEffect(() => {
    if (socket) {
    socket.on("new-comment", (comment) => {
    setPosts(posts.map((post) => {
    if (post._id === comment.postId) {
    return {...post, comments: [...post.comments, comment] };
    }
    return post;
    }));newsFeed(); });}
    }, [socket]);
  
  useEffect(() => {
    if (socket) {
    socket.on("remove-comment", (comment) => {
    setPosts(posts.map((post) => {
    if (post._id === comment.postId) {
    return {...post, comments: [...post.comments, comment] };
    }
    return post;
    }));newsFeed(); });}
    }, [socket]);
  
  const newsFeed = async (page) => {
    try {
      const { data } = await axios.get(`/news-feed/${page}`);
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };  

  const findPeople = async () => {
    try {
      const { data } = await axios.get("/find-people");
      setPeople(data);
    } catch (err) {
      console.log(err);
    }
  };

  const postSubmit = async (e) => {
    e.preventDefault();
    // console.log("post => ", content);
    try {
      const { data } = await axios.post("/create-post", { content, image });
      // console.log("create post response => ", data);
      if (data.error) {
        toast.error(data.error);
      } else {
        setPage(1);
        newsFeed();
        toast.success("Post created");
        setContent("");
        setImage({});
        socket.emit("new-post", data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    // console.log([...formData]);
    setUploading(true);
    try {
      const { data } = await axios.post("/upload-image", formData);
      // console.log("uploaded image => ", data);
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  const handleDelete = async (post) => {
    try {
      const answer = window.confirm("Are you sure?");
      if (!answer) return;
      const { data } = await axios.delete(`/delete-post/${post._id}`);
      toast.error("Post deleted");
      socket.emit("delete-post", data);
      newsFeed(page);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFollow = async (user) => {
    // console.log("add this user to following list ", user);
    try {
      const { data } = await axios.put("/user-follow", { _id: user._id });
      // console.log("handle follow response => ", data);
      // update local storage, update user, keep token
      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));
      // update context
      setState({ ...state, user: data });
      // update people state
      let filtered = people.filter((p) => p._id !== user._id);
      setPeople(filtered);
      // rerender the posts in newsfeed
      newsFeed(page);
      toast.success(`Seguindo ${user.name}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async (_id) => {
    // console.log("like this post => ", _id);
    try {
      const { data } = await axios.put("/like-post", { _id });
      // console.log("liked", data);
      newsFeed(page);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async (_id) => {
    // console.log("unlike this post => ", _id);
    try {
      const { data } = await axios.put("/unlike-post", { _id });
      // console.log("unliked", data);
      newsFeed(page);
    } catch (err) {
      console.log(err);
    }
  };

  const handleComment = (post) => {
    setCurrentPost(post);
    setVisible(true);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const addComment = async (e) => {
    e.preventDefault();
    // console.log("add comment to this post id", currentPost._id);
    // console.log("save comment to db", comment);
    try {
      const { data } = await axios.put("/add-comment", {
        postId: currentPost._id,
        comment,
      });
      // console.log("add comment", data);
      setComment("");
      setVisible(false);
      // socket.emit("new-comment", data);
      newsFeed(page);
    } catch (err) {
      console.log(err);
    }
  };

  const removeComment = async (postId, comment) => {
    // console.log(postId, comment);
    let answer = window.confirm("Are you sure?");
    if (!answer) return;
    try {
      const { data } = await axios.put("/remove-comment", {
        postId,
        comment,
      });
      // console.log("comment removed", data);
      socket.emit("remove-comment", data);
      newsFeed(page);
    } catch (err) {
      console.log(err);
    }
  };

  const info = async () => {
    try {
      // console.log(page)
      const { data } = await axios.get("/news-feed/" + '2'); 
      // console.log("info => ", data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <UserRoute>
      <div className="container-fluid">

        <div className="row py-3 background-index">
        <div className="col-md-8 index-container">
          <div className='header-index'>
            <h1>Publicações</h1>
            <button onClick={toggleForm} className="btn btn-primary btn-sm mt-1" >+ Criar nova publicação </button>
          </div>
          {showForm && (
            <PostForm
            content={content}
            setContent={setContent}
            postSubmit={postSubmit}
            handleImage={handleImage}
            uploading={uploading}
            image={image}
          />
          )}
          <br />
            <PostList
              posts={posts}
              handleDelete={handleDelete}
              handleLike={handleLike}
              handleUnlike={handleUnlike}
              handleComment={handleComment}
              removeComment={removeComment}
            />
            <div className='footer-pagination'>
              <Pagination
                defaultCurrent={1}
                total={Math.round((totalPosts / 3) * 10)}
                pageSize={10}
                onChange={(page) => setPage(page)}
                showSizeChanger={false}
              />
            </div>
          </div>

          {/* <pre>{JSON.stringify(posts, null, 4)}</pre> */}

          <div className="col-md-4 search-block">
            <Search/>
            <br/>
            {state && state.user && state.user.following && (
              <Link href={`/user/following`}>
                <p className="h6">{state.user.following.length} Seguindo</p>
              </Link>
            )}
            <People people={people} handleFollow={handleFollow} />
          </div>
        </div>

        <Modal
          visible={visible}
          onCancel={() => setVisible(false)}
          title="Comment"
          footer={null}
        >
          <CommentForm
            comment={comment}
            setComment={setComment}
            addComment={addComment}
          />
        </Modal>
      </div>
    </UserRoute>
  );
};

export default Home;