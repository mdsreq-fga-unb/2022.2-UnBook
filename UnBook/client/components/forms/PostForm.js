import { Avatar, Divider} from "antd";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { CameraOutlined, LoadingOutlined } from "@ant-design/icons";
import "react-quill/dist/quill.snow.css";


const PostForm = ({ content, setContent, postSubmit, handleImage, uploading, image }) => {
    return(
        <div className = "card">
          <div className="card-body pb-3">
            <form className="form" onSubmit={postSubmit}>
              <ReactQuill
                theme='snow'
                value={content}
                onChange={(e) => setContent(e)}
                className="form-control"
                placeholder="Digite algo..."
              />
            </form>
          </div>

          <div className="card-footer d-flex justify-content-between text-muted">
              <button 
                disabled={!content} 
                className="btn btn-primary btn-sm mt-1" 
                onClick={postSubmit}
              > 
                Postar 
              </button>
              <label>
                {
                  image && image.url ? (
                    <Avatar size={30} src={image.url} className="mt-1" />
                  ) : uploading ? (
                    <LoadingOutlined className="mt-2 h5"/>
                  ) : (
                    <CameraOutlined className="mt-2 h5"/>
                  )}
                  <input onChange={handleImage} type="file" accept="images/*" hidden/>
              </label>
          </div>

        </div>
    );
};

export default PostForm;