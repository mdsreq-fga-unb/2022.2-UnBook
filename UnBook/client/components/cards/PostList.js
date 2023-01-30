import renderHTML from "react-render-html";
import moment from "moment";
import { Avatar } from 'antd';
import PostImage from '../images/PostImage';

export const PostList = ({posts}) => {
    return( 
        <>
            {posts && posts.map((post) => <div key={post._id} className="card mb-5">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <div>
                    <Avatar size={40} className='mb-2'>
                      {post.postedBy.name[0]}  
                    </Avatar>{" "}
                    <span className="pt-2 ml-3" style={{marginLeft: "0.2rem"}}>{post.postedBy.name}</span>
                  </div>
                  <span className="pt-2 ml-3">{moment(post.createdAt).fromNow()}</span>
                </div>
                <div className="card-body">
                    {renderHTML(post.content)}
                </div>
                <div className="card-footer">
                  {post.image && (<PostImage url={post.image.url} />)}
                  <div className="pt-3">like/ unlike 3 likes 2 comments</div>
                </div>
            </div>)}
        </>
    );
};

export default PostList;