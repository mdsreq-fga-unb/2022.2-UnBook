import { Avatar, Divider} from "antd";

const CreatePostForm = ({ content, setContent, postSubmit }) => {
    return(
        <div className = "card">
          <div className="card-body pb-3">
            <form className="form" onSubmit={postSubmit}>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="form-control"
                placeholder="Digite algo..."
              ></textarea>
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