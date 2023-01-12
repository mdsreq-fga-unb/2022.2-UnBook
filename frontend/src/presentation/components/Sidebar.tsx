import styles from "./Sidebar.module.css";
import imagemCapa from "../assets/imagemCapa.jpeg";
import { Avatar } from "./Avatar";
import { PencilLine } from "phosphor-react";

export function Sidebar() {
	return (
		<aside className={styles.sidebar}>
			<img className={styles.cover} src={imagemCapa} />
			<div className={styles.profile}>
				<Avatar src="https://github.com/pedrocampos0.png" />
				<strong>Pedro Campos</strong>
				<span>Web Developer</span>
			</div>

			<footer>
				<a href="#">
          <PencilLine />
          Editar seu perfil
        </a>
			</footer>
		</aside>
	);
}
