import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
	useNodesState,
	useReactFlow,
	useEdgesState,
	addEdge,
	ReactFlowProvider,
	MarkerType,
} from "reactflow";
import node4 from "./node4";
import "reactflow/dist/style.css";
import initialEdges from "./initialEdges";
import initialNodes from "./initialNodes";
import axios from "axios";
var tryNodes = [];

const fitViewOptions = { padding: 1 };

const proOptions = { hideAttribution: true };

let id = 1;
const getId = () => `${id++}`;



const edgeOptions = {
	animated: true,
	style: {
		stroke: "black",
	},
};

let nodeId = 3;
let nodeLabel = "";

const ExpandAndCollapse = (props) => {
	const reactFlowWrapper = useRef(null);
	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
	const [getNodes, setgetNodes] = useState([]);
	const reactFlowInstance = useReactFlow();

	const fetch = async () => {
		const article = {
			password: "RAJA897924767",
			file: "https://kavach.s3.amazonaws.com/XXXXXXXXXXX4755-01-04-2022to31-03-2023.pdf",
			credit_score: 8.7,
		};
		await axios
			.post(
				"https://fin-sights.onrender.com/api/trail_analysis/v1/fund_flow",
				article
			)
			.then((res) => {
				tryNodes.push(res.data.data);
				setgetNodes(tryNodes);
			});
	};
	fetch();

	useEffect(() => {
		setNodes([
			...getNodes.map((item) => {
				return {
					id: item.id,
					type: item?.children?.length ? "default" : "output",
					data: { label: item.name, children: item.children },
					position: { x: 0, y: 10000 },
				};
			}),
		]);
	}, [getNodes]);

	const onConnect = useCallback(
		(params) =>
			setEdges((eds) =>
				addEdge({ ...params, animated: true, style: { stroke: "#fff" } }, eds)
			),
		[]
	);
	const handleNodeClick = async (e, data) => {
		const findChildren = nodes.filter((item) => item?.data?.parent === data.id); // data gives access to label, parent, children
		if (!findChildren.length) {
			let t = 1;
			const itemChildren = [
				...data.data.children.map((item, i) => {
					if (i === 0) {
						t = 0;
					} else if (i % 2 === 0) {
						t = -t;
					} else {
						t = i + t;
					}
					return {
						id: item.id,
						type: item?.children?.length ? "default" : "output",
						data: {
							label: item.name,
							children: item.children,
							parent: item.parent,
						},

						position: {
							x: data.position.x + t * 200,
							y: data.position.y + 200,
						},
					};
				}),
			];
			setEdges([
				...edges,
				...itemChildren.map((item) => {
					return {
						id: String(parseInt(Math.random(100000000) * 1000000)),
						source: item?.data?.parent,
						target: item?.id,
						markerEnd: {
							type: MarkerType.ArrowClosed,
						},
					};
				}),
			]);
			setNodes(nodes.concat(itemChildren));
		} else {
			childs = [];
			childAppender(getNodes, data.id);
			// console.log(childs);
			setNodes([...nodes.filter((item) => !childs.includes(item.id))]);
			// console.log(nodes)
			setEdges([...edges.filter((item) => data.id !== item.source)]);
		}
	};

	const onClick = useCallback((event) => {
		event.preventDefault();
		console.log(nodeLabel);
		const id = `${++nodeId}`;
		const label = nodeLabel;
		const newNode = {
			id,
			position: {
				x: 0,
				y: 100,
			},
			data: {
				label,
			},
		};
		reactFlowInstance.addNodes(newNode);
	}, []);

	let checkflag = false;
	let childs = [];
	function childAppender(array, reqd) {
		array.forEach((ele) => {
			if (checkflag === false) {
				if (ele.parent === reqd) {
					checkflag = true;
				}
			}
			if (checkflag === true) {
				childs.push(ele.id);
			}
			if (ele.children && ele.children.length !== 0) {
				childAppender(ele.children, reqd);
			} else {
				return;
			}
		});
		checkflag = false;
	}
	const test = () => {
		// console.log(document.getElementById("-1"));
		console.log(document.querySelector("div[data-id='-1']"));
		let data = document.querySelector("div[data-id='-1']")
		// data.classList.add("bg-red-500")
		data.classList.add("bg-red-500")
	};

	return (
		<div
			className="wrapper"
			ref={reactFlowWrapper}
			style={{ width: "100vw", height: "100vh" }}
		>
			<button
				onClick={() => {
					test();
				}}
			>
				test
			</button>
			{/* <CustomNode/> */}
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				onNodeClick={handleNodeClick}
				fitView
				// nodeTypes={nodeTypes}
				defaultEdgeOptions={edgeOptions}
				maxZoom={0.9}
				defaultViewport={{ x: 0, y: 0, zoom: 0.5 }}
				fitViewOptions={fitViewOptions}
				proOptions={proOptions}
				className="bg-sky-300"
			/>
			<form className="absolute z-10 top-2 right-5">
				<input
					type="text"
					placeholder="Enter Node Label"
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					onChange={(event) => {
						nodeLabel = event.target.value;
					}}
				/>
				<button
					type="submit"
					onClick={onClick}
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					add node
				</button>
			</form>
		</div>
	);
};

export default () => (
	<ReactFlowProvider>
		<ExpandAndCollapse />
	</ReactFlowProvider>
);
