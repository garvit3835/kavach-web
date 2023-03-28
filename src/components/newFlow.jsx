import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
	useNodesState,
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

// import './index.css';
var tryNodes = []

const proOptions = { hideAttribution: true };
// tryNodes !==[] && console.log(tryNodes)

let id = 1;
const getId = () => `${id++}`;

const fitViewOptions = {
	padding: 1,
};

const ExpandAndCollapse = (props) => {
	const reactFlowWrapper = useRef(null);
	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
	const [getNodes, setgetNodes] = useState([]);
	const onConnect = useCallback(
		(params) => setEdges((eds) => addEdge(params, eds)),
		[]
    );
    
    const fetch = async () => {
        const article = {
            password: "RAJA897924767",
            file: "feb.pdf",
            credit_score: 8.7,
        };
        await axios
            .post(
                "https://fin-sights.onrender.com/api/trail_analysis/v1/fund_flow",
                article
            )
            .then((res) => {
                // console.log(res.data.data)
                // setgetNodes([response.data.data]);
                // res.data.data.children.forEach((item) => {
                tryNodes.push(res.data.data);
                setgetNodes(tryNodes)
                // console.log(tryNodes)
                // })
                
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
					// sourcePosition: 'right',
					// targetPosition: 'left'
				};
			}),
		]);
	}, [getNodes]);

	// console.log(nodes);

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
						// sourcePosition: 'right',
						// targetPosition: 'left'
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

	function childChecker(element) {
		// console.log(element);
		return false;
	}

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

	return (
		<div
			className="wrapper"
			ref={reactFlowWrapper}
			style={{ width: "100vw", height: "100vh" }}
		>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				onNodeClick={handleNodeClick}
				fitView
				maxZoom={0.9}
				defaultViewport={{ x: 1, y: 1, zoom: 0.5 }}
				fitViewOptions={fitViewOptions}
				proOptions={proOptions}
			/>
		</div>
	);
};

export default () => (
	<ReactFlowProvider>
		<ExpandAndCollapse />
	</ReactFlowProvider>
);
