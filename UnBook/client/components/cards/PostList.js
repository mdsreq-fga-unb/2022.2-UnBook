import renderHTML from "react-render-html";
import moment from "moment";
import { Avatar } from 'antd';
import PostImage from '../images/PostImage';
import { HeartOutlined, HeartFilled, CommentOutlined } from "@ant-design/icons"

export const PostList = ({posts}) => {
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
                  <div  className="d-flex align-items-center">
                    <div className="d-flex align-items-center">
                      <HeartOutlined className="text-danger h5 mt-2" />
                      <div className="ps-1">3 likes</div>
                    </div>
                    <div className="d-flex align-items-center">
                      <CommentOutlined className="text-danger h5 ps-3 mt-2" />
                      <div className="ps-1">2 comments</div>
                    </div>
                  </div>
                </div>
            </div>)}
        </>
    );
};

export default PostList;