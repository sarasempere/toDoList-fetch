import React from "react";

//include images into your bundle

import { Todo } from "../component/todo.js";
//create your first component
export function Home() {
	return (
		<div className="text-center mt-5">
			<Todo></Todo>
		</div>
	);
}
