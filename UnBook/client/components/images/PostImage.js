const PostImage = ({ url }) => (
  <div style={{
        backgroundImage: `url(${url})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        height: "300px",
        width: "100%",
        backgroundRepeat: "no-repeat",
      }}>
  </div>
)

export default PostImage;