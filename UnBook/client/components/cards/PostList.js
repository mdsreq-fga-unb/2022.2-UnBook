import renderHTML from "react-render-html";
import { useContext } from "react";
import moment from "moment";
import { Avatar } from 'antd';
import PostImage from '../images/PostImage';
import { 
  HeartOutlined, 
  HeartFilled, 
  CommentOutlined, 
  EditOutlined, 
  DeleteOutlined } from "@ant-design/icons"
import { UserContext } from "../../context";
import { useRouter } from "next/router";

export const PostList = ({posts, handleDelete, handleLike, handleUnlike}) => {
    const [ state ] = useContext(UserContext);
    const router = useRouter();
    return( 
        <>
            {posts && posts.map((post) => <div key={post._id} className="card mb-5">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <div>
                    <Avatar size={40}>
                      {post.postedBy.name[0]}  
                    </Avatar>{" "}
                    <span className="ml-3" style={{marginLeft: "0.2rem"}}>{post.postedBy.name}</span>
                  </div>
                  <span className="ml-3">{moment(post.createdAt).fromNow()}</span>
                </div>
                <div className="card-body">
                    {renderHTML(post.content)}
                </div>
                <div className="card-footer">
                  {post.image && (<PostImage url={post.image.url} />)}
                  <div className="d-flex align-items-center justify-content-between">
                    <div  className="d-flex align-items-center">
                      <div className="d-flex align-items-center">
                        {post.likes.includes(state.user._id) ? (
                          <HeartFilled onClick={() => handleUnlike(post)} 
                          className="text-danger pt-2 h5 px-2" 
                          />
                        ) : (
                          <HeartOutlined onClick={() => handleLike(post)} 
                          className="text-danger pt-2 h5 px-2" 
                          />
                        )}
                        <div className="px-1">3 likes</div>
                      </div>
                      <div className="d-flex align-items-center">
                        <CommentOutlined className="text-danger h5 ps-3 mt-2" />
                        <div className="px-1">2 comments</div>
                      </div>
                    </div>
                    {state && state.user && state.user._id === post.postedBy._id && (
                      <div  className="d-flex align-items-center">
                        <EditOutlined onClick={() => router.push(`/user/post/${post._id}`)} className="text-danger h5 ps-3 mt-2" />
                        <DeleteOutlined onClick={() => handleDelete(post)} className="text-danger h5 ps-3 mt-2" />
                      </div>
                    )}
                  </div>
                </div>
            </div>)}
        </>
    );
};

export default PostList;