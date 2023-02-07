import { useContext } from 'react';
import { UserContext } from '../context';
import ParallaxBG from '../components/cards/ParallaxBG';
import axios from 'axios';
import Post from "../components/cards/Post";

const Home = ({posts}) => {
    const [state, setState] = useContext(UserContext) || [];

    return (
      <>
        <ParallaxBG url="images/default.jpg"/>
          <div className="container">
            <div className="row">
              {posts.map((post) => (
                <div className="col-md-4">
                  <Post
                    key={post._id}
                    post={post} />
                </div>
              ))}
            </div>
          </div>
      </>
    );
};

export async function getServerSideProps(context) {
  const { data } = await axios.get("/posts");
  return {
    props: {
      posts: data,
    },
  };
}

export default Home;

