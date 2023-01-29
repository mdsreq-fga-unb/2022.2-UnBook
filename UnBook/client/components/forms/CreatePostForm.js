import { Avatar, Divider} from "antd";

const CreatePostForm = () => {
    return(
        <div className = "card">
          <div className="card-body pb-3">
            <form className="form">
              <textarea
                className="form-control"
                placeholder="Digite algo..."
              ></textarea>
            </form>
          </div>

        <div className="card-footer">
            <button className="btn btn-primary btn-sm mt-1">Postar</button>
        </div>

        </div>
    );
};

export default CreatePostForm;