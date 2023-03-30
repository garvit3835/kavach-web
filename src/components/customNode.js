import React, { memo } from "react";
import { Handle, Position } from "reactflow";

function CustomNode({ data }) {
  if (data.warning) {
    console.log(data.warning)
		return (
			<div className="px-4 py-2 shadow-md rounded-md bg-violet-400 border-2 border-stone-400">
				<div className="flex">
					<div className="rounded-full w-12 h-12 flex justify-center items-center text-red-700 text-4xl bg-violet-100">
						!
					</div>
					<div className="ml-2">
						<div className="text-lg font-bold">{data.label}</div>
						<div className="text-white">{data.job}</div>
					</div>
				</div>

				<Handle
					type="target"
					position={Position.Top}
					className="!w-16 !h-0.5 !bg-red-500 !rounded-none"
				/>
				<Handle
					type="source"
					position={Position.Bottom}
					className="!w-16 !h-0.5 !bg-red-500 !rounded-none"
				/>
			</div>
		);
	} else {
		return (
			<div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
				<div className="flex">
					{/* <div className="rounded-full w-12 h-12 flex justify-center items-center bg-gray-100">
            {data.emoji}
          </div> */}
					<div className="ml-2">
						<div className="text-lg font-bold">{data.label}</div>
						<div className="text-gray-500">{data.job}</div>
					</div>
				</div>

				<Handle
					type="target"
					position={Position.Top}
					className="!w-16 !h-0.5 !bg-teal-500 !rounded-none"
				/>
				<Handle
					type="source"
					position={Position.Bottom}
					className="!w-16 !h-0.5 !bg-teal-500 !rounded-none"
				/>
			</div>
		);
	}
}

export default memo(CustomNode);
