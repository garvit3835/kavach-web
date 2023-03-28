import React, { useCallback, useState } from "react";
import ReactFlow, {
	ReactFlowProvider,
	useReactFlow,
	MiniMap,
	Controls,
	Background,
	useNodesState,
	useEdgesState,
	addEdge,
	Panel,
	// useReactFlow,
} from "reactflow";

import "reactflow/dist/style.css";

const initialNodes = [
	{ id: "1", position: { x: 550, y: 0 }, data: { label: "1" }, type: "input" },
	{ id: "2", position: { x: 1100, y: 100 }, data: { label: "2" } },
	{ id: "3", position: { x: 50, y: 100 }, data: { label: "3" } },
];
const initialEdges = [
	{ id: "e1-2", source: "1", target: "2" },
	{ id: "e1-3", source: "1", target: "3", animated: true, label: "error" },
	{ id: "e3-2", source: "3", target: "2", animated: true, label: "error" },
];

const proOptions = { hideAttribution: true };
let nodeId = 0;

function Flowchart() {
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
	const [label, setLabel] = useState<any>("");

	const reactFlowInstance = useReactFlow();

	const handleNewNode = useCallback((event: any) => {
		event.preventDefault();
		const id = `${++nodeId}`;
		console.log(label);
		const newNode = {
			id,
			position: {
				x: 1100,
				y: 100,
			},
			data: {
				label: label,
			},
		};
		if (newNode) {
			console.log(newNode);
			reactFlowInstance.addNodes(newNode);
		}
	}, [])

	// const reactFlowInstance = useReactFlow();
	// const onClick = useCallback(() => {
	// 	const id = `${++nodeId}`;
	// 	const newNode = {
	// 		id,
	// 		position: {
	// 			x: Math.random() * 500,
	// 			y: Math.random() * 500,
	// 		},
	// 		data: {
	// 			label: `Node ${id}`,
	// 		},
	// 	};
	// 	reactFlowInstance.addNodes(newNode);
	// }, []);

	const onConnect = useCallback(
		(params: any) => setEdges((eds) => addEdge(params, eds)),
		[setEdges]
	);

	return (
		<div style={{ width: "100vw", height: "100vh" }}>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				fitView
				proOptions={proOptions}
			>
				<Controls />
				<MiniMap />
				<Background gap={12} size={1} />
				<Panel position="top-left">Transactions</Panel>
			</ReactFlow>
			<form
				className="z-10 top-2 right-2 absolute flex"
				onSubmit={handleNewNode}
			>
				<input
					type="text"
					placeholder="Enter Node Label"
					onChange={(event) => setLabel(event.target.value)}
				/>
				<button type="submit">Add Node</button>
			</form>
		</div>
	);
}

export default function () {
	return (
		<ReactFlowProvider>
			<Flowchart />
		</ReactFlowProvider>
	);
}
