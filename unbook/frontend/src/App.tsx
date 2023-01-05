import "./App.module.css";
import "./global.css";
import { Routes, Route } from "react-router-dom";

type Props = {
	makeLogin: React.FC;
};

function App({ makeLogin }: Props): JSX.Element {
	return (
		<div className="App">
			<Routes>
				<Route path="/login" element={makeLogin()} />
			</Routes>
		</div>
	);
}

export default App;
