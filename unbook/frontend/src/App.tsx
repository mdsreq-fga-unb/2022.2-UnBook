import "./App.module.css";
import "./global.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./presentation/pages/home/home";
import { makeLogin } from "./main/factories/pages/login/login-factory";
import { SignUp } from "./presentation/pages/signup/signup";

function App(): JSX.Element {
	return (
		<div className="App">
			<Routes>
				<Route path="/login" element={makeLogin()} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/" element={<Home />} />
			</Routes>
		</div>
	);
}

export default App;
