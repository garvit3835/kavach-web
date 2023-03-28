import { useCallback, useState } from "react";
import ReactFlow, {
	ReactFlowProvider,
	useReactFlow,
	useNodesState,
	useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";

const defaultNodes = [
	{
		id: "1",
		position: { x: 550, y: 100 },
		data: { label: "1" },
		type: "input",
	},
	{ id: "2", position: { x: 1100, y: 200 }, data: { label: "2" } },
	{ id: "3", position: { x: 50, y: 200 }, data: { label: "3" } },
];
const defaultEdges = [
	{ id: "e1-2", source: "1", target: "2" },
	{ id: "e1-3", source: "1", target: "3", label: "hello" },
	{ id: "e3-2", source: "3", target: "2", label: "hi" },
];

const edgeOptions = {
	animated: true,
	style: {
		stroke: "white",
	},
};

const connectionLineStyle = { stroke: "white" };

let nodeId = 3;
let nodeLabel = ''

function Flow() {
	const reactFlowInstance = useReactFlow();
	const onClick = useCallback((event: any) => {
        event.preventDefault();
        console.log(nodeLabel)
        const id = `${++nodeId}`;
        const label = nodeLabel
		const newNode = {
			id,
			position: {
				x: 1100,
				y: 100,
			},
			data: {
				label,
			},
		};
		reactFlowInstance.addNodes(newNode);
	}, []);

	return (
		<div style={{ width: "100vw", height: "100vh" }}>
			<ReactFlow
				defaultNodes={defaultNodes}
				defaultEdges={defaultEdges}
				defaultEdgeOptions={edgeOptions}
				style={{
					backgroundColor: "#D3D2E5",
				}}
				connectionLineStyle={connectionLineStyle}
			/>
			<form className="absolute z-10 top-2 right-2">
				<input
					type="text"
					placeholder="Enter Node Label"
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						nodeLabel = event.target.value;
					}}
				/>
				<button type="submit" onClick={onClick}>
					add node
				</button>
			</form>
		</div>
	);
}

export default function () {
	return (
		<ReactFlowProvider>
			<Flow />
		</ReactFlowProvider>
	);
}
