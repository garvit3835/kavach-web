import React, { useCallback } from "react";
import ReactFlow, {
	useNodesState,
	useEdgesState,
	addEdge,
	MiniMap,
	Controls,
} from "reactflow";

import "reactflow/dist/base.css";
import initNodes from "./initialNodes.js";
import initEdges from "./initialEdges.js";
import customNode from "./customNode.js";

const nodeTypes = {
	custom: customNode,
};

let checkflag = false;
let childs = [];
function childAppender(array, reqd) {
	array.forEach((ele) => {
		if (checkflag === false) {
			if (ele.data.parent === reqd) {
				checkflag = true;
			}
		}
		if (checkflag === true) {
			childs.push(ele.id);
		}
		if (ele.data.children && ele.data.children.length !== 0) {
			childAppender(ele.data.children, reqd);
		} else {
			return;
		}
	});
	checkflag = false;
}

// const initNodes = [
// 	{
// 		id: "1",
// 		type: "custom",
// 		data: { name: "Jane Doe", job: "CEO", emoji: "😎" },
// 		position: { x: 0, y: 50 },
// 	},
// 	{
// 		id: "2",
// 		type: "custom",
// 		data: { name: "Tyler Weary", job: "Designer", emoji: "🤓" , warning: true},

// 		position: { x: -200, y: 200 },
// 	},
// 	{
// 		id: "3",
// 		type: "custom",
// 		data: { name: "Kristi Price", job: "Developer", emoji: "🤩" },
// 		position: { x: 200, y: 200 },
// 	},
// ];




// const initEdges = [
// 	{
// 		id: "e1-2",
// 		source: "1",
// 		target: "2",
// 	},
// 	{
// 		id: "e1-3",
// 		source: "1",
// 		target: "3",
// 	},
// ];

const Flow = () => {
	const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

	const onConnect = useCallback(
		(params) => setEdges((eds) => addEdge(params, eds)),
		[]
	);

	// console.log(nodes);

	const handleNodeClick = async (e, data) => {
		console.log(data);
		const findChildren = nodes.filter((item) => item?.data?.parent === data.id); // data gives access to label, parent, children
		if (!findChildren.length) {
			let t = 1;
			const itemChildren = [
				...data.data.children.map((item, i) => {
					console.log(item);
					if (i === 0) {
						t = 0;
					} else if (i % 2 === 0) {
						t = -t;
					} else {
						t = i + t;
					}
					return {
						id: item.id,
						type: item?.data?.children?.length ? "custom" : "custom",
						data: {
							label: item.data.label,
							children: item.data.children,
							warning: item.data.warning,
							job: item.data.job,
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
					};
				}),
			]);
			setNodes(nodes.concat(itemChildren));
		} else {
			childs = [];
			childAppender(nodes, data.id);
			// console.log(childs);
			setNodes([...nodes.filter((item) => !childs.includes(item.id))]);
			// console.log(nodes)
			setEdges([...edges.filter((item) => data.id !== item.source)]);
		}
	};

	return (
		<div style={{ width: "100vw", height: "100vh" }}>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onNodeClick={handleNodeClick}
				onConnect={onConnect}
				nodeTypes={nodeTypes}
				fitView
				className="bg-teal-100"
			>
				<MiniMap />
				<Controls />
			</ReactFlow>
		</div>
	);
};

export default Flow;
