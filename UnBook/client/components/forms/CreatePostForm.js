import { Avatar, Divider} from "antd";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";


const CreatePostForm = ({ content, setContent, postSubmit }) => {
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

        <div className="card-footer">
            <button 
              disabled={!content} 
              className="btn btn-primary btn-sm mt-1" 
              onClick={postSubmit}
            > 
              Postar 
            </button>
        </div>

        </div>
    );
};

export default CreatePostForm;