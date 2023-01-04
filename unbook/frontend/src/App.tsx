import "./App.module.css";
import { Login } from "./presentation/pages/login/login";
import "./global.css";

function App(): JSX.Element {
	return (
		<div className="App">
			<Login />
		</div>
	);
}

export default App;
