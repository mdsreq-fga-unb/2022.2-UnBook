import "./App.module.css";
import { Login } from "./presentation/pages/login/Login";
import "./global.css";

function App(): JSX.Element {
	return (
		<div className="App">
			<Login />
		</div>
	);
}

export default App;
