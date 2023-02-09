const CommentForm = ({addComment, comment, setComment}) => {
    return (
        <form onSubmit={addComment}>
        <input 
          type="text" 
          className="form-control" 
          placeholder="Escreva algo..." 
          value={comment} 
          onChange={(e) => setComment(e.target.value)} 
          />
          <button className="btn btn-primary btn-sm btn-block mt-3">
            Enviar
          </button>
      </form>
    );
};


export default CommentForm;