import { Routes, Route } from "react-router-dom";
import Input from "./components/input";
import Flowchart from "./components/flowchart";
import Flow from "./components/flow";
import NewFlow from "./components/newFlow";
import KataiNewFlow from "./components/kataiNewFlow"

const App = () => {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Input />}/>
				<Route path="/flowchart" element={<Flowchart />} />
				<Route path="/flow" element={<Flow />} />
				<Route path="/newflow" element={<NewFlow />} />
				<Route path="/katainewflow" element={<KataiNewFlow />} />

			</Routes>
		</div>
	);
};

export default App;
