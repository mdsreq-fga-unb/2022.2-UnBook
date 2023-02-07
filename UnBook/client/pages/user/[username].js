import { useContext, useState, useEffect } from "react";
import { Avatar, Card } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { UserContext } from "../../context";
import axios from "axios";
import { RollbackOutlined } from "@ant-design/icons";
import Link from "next/link";
import { toast } from "react-toastify";
import { newsFeed } from "./dashboard";

const { Meta } = Card;

const Username = () => {
  const [state, setState] = useContext(UserContext);
  // state
  const [user, setUser] = useState([]);

  const router = useRouter();

  useEffect(() => {
    if (router.query.username) fetchUser();
  }, [router.query.username]);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`/user/${router.query.username}`);
      //console.log("router.query.username => ", data);
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  const imageSource = (user) => {
    if (user && user.image && user.image.url) {
      return user.image.url;
    } else {
      return "/images/logo.png";
    }
  };

  const showName = (user) => {
    if (user && user.userName) {
        return user.userName;
    } else {
        return user.name;
    }
  };

  return (
    <div className="row col-md-6 offset-md-3">
      {/* <pre>{JSON.stringify(user, null, 4)}</pre> */}
      <div className='pt-5 pb-5'>
        <Card hoverable cover={<img src={imageSource(user)} alt={user.name}/>}>
          <Meta
            title={user.userName}
            description={user.about}
          />
          <p className='pt-2 text-muted'> Entrou {moment(user.createdAt).fromNow()}</p>
          <div className='d-flex justify-content-between'>
            <span className='btn btn-sm'>
              {user.followers && user.followers.length} Seguidores
            </span>
            <span className='btn btn-sm'>
              {user.following && user.following.length} Seguindo
            </span>
          </div>
        </Card>
        <Link href="/user/dashboard">
          <p className="d-flex justify-content-center pt-5" >
            <RollbackOutlined />
          </p>
        </Link>
      </div> 
    </div>
  );
};

export default Username;