import { Routes, Route } from "react-router-dom";
import Input from "./components/input";
import Flowchart from "./components/flowchart";
import Flow from "./components/flow";

const App = () => {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Input />}/>
				<Route path="/flowchart" element={<Flowchart />} />
				<Route path="/flow" element={<Flow />} />
			</Routes>
		</div>
	);
};

export default App;
