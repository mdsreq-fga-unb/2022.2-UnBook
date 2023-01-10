import { Header } from "../../components/Header";
import styles from "../../../App.module.css";
import { Sidebar } from "../../components/Sidebar";
import { Post, PostProps } from "../../components/Post";

const posts: Post[] = [
	{
	  id: 1,
	  author: {
			avatarUrl: "http://github.com/pedrocampos0.png",
			name: "Pedro Campos",
			role: "Web Developer",
	  },
	  content: [
			{ type: "paragraph", content: "Fala galeraa 👋" },
			{
		  type: "paragraph",
		  content:
			"Testando feed de postagens",
			},
			{
		  type: "link",
		  content: "unbook",
			},
	  ],
	  publishedAt: new Date("2022-10-10 20:00:00"),
	},
];
  
const Home: React.FC = () => {
	return (
		<div>
		  <Header />
	
		  <div className={styles.wrapper}>
				<Sidebar />
				<main>
			  {posts.map((post) => {
						return (
				  <Post
								key={post.id}
								author={post.author}
								content={post.content}
								publishedAt={post.publishedAt}
				  />
						);
			  })}
				</main>
		  </div>
		</div>
	  );
};

export { Home };