import "./App.module.css";
import "./global.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./presentation/pages/login/login";

function App(): JSX.Element {
	return (
		<div className="App">
			<Routes>
				<Route
					path="/login"
					element={<Login validation={undefined} authentication={undefined} />}
				/>
				<Route
					path="/"
					element={<Login validation={undefined} authentication={undefined} />}
				/>
			</Routes>
		</div>
	);
}

export default App;
