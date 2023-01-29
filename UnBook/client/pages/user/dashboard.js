import { useContext } from "react";
import { UserContext } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import CreatePostForm from "../../components/forms/CreatePostForm";
const Home = () => {
    const {state, setState} = useContext(UserContext);

    return(
      <UserRoute>
        <div className = "container-fluid">
          <div className="row py-5 text-light bg-default-image">
            <div className="col text-center">
              <h1>Feed</h1>
            </div>
          </div>
            <div className="row py-3">
                <div className="col-md-8"><CreatePostForm/></div>
                <div className="col-md-4">Sidebar</div>
            </div>
        </div>
      </UserRoute>
    );
};

export default Home;