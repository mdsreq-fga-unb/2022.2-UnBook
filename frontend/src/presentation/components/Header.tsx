import styles from "./Header.module.css";
import logoUnBook from "../assets/logo_UnBook.png";

export function Header() {
	return (
		<header className={styles.header}>
			<img src={logoUnBook} alt="Logotipo UnBook" />
			<p>Feed</p>
		</header>
	);
}
