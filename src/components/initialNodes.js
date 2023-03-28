const initialNodes = [
	{
		id: "1",
		name: "test",
		children: [
			{
				id: "2",
				name: "b",
				parent: "1",
				children: [
					{
						id: "3",
						name: "c",
						parent: "2",
						children: [{
							id: "4",
							parent: "3",
							name: "test123",
						}],
					},
				],
			},
			{
				id: "5",
				name: "b",
				parent: "1",
				children: [
					{
						id: "6",
						name: "c",
						parent: "5",
						children: [
							{
								id: "7",
								parent: "6",
								name: "hello",
							},
						],
					},
				],
			},
			{
				id: "8",
				name: "b",
				parent: "1",
				children: [
					{
						id: "9",
						name: "c",
						parent: "8",
						children: [
							{
								id: "10",
								parent: "9",
								name: "d",
							},
						],
					},
				],
			},
			{
				id: "11",
				name: "f",
				parent: "1",
			},
		],
	},
];

export default initialNodes
