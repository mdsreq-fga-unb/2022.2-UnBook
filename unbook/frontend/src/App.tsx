import "./App.module.css";
import "./global.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./presentation/pages/home/home";

type Props = {
	makeLogin: React.FC;
};

function App({ makeLogin }: Props): JSX.Element {
	return (
		<div className="App">
			<Routes>
				<Route path="/login" element={makeLogin()} />
				<Route path="/" element={<Home />} />
			</Routes>
		</div>
	);
}

export default App;
