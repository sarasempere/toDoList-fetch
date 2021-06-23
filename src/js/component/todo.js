import React, { useState, useEffect } from "react";

export const Todo = () => {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		upLoad();
	}, []);

	const upLoad = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/otra")
			.then(function(response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				// Read the response as json.
				return response.json();
			})
			.then(function(responseAsJson) {
				// Do stuff with the JSON
				//console.log(responseAsJson);
				let tasks = responseAsJson;
				//console.log(tasks[0], 0);
				let labels = [];
				tasks.map(function(x) {
					labels.push(x);
				});
				setTodos(labels);
				return todos;
			})
			.catch(function(error) {
				console.log("Looks like there was a problem: \n", error);
			});
	};

	const validateInput = () => {
		let newTask = [...todos, { label: inputValue, done: false }];

		fetch("https://assets.breatheco.de/apis/fake/todos/user/otra", {
			method: "PUT",
			body: JSON.stringify(newTask),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(() => upLoad())
			.catch(error => console.error("Error:", error));
		setInputValue("");
	};

	const deleteItem = item => {
		let deleteList = todos.filter((x, index) => {
			return x.label !== todos.indexOf(item);
		});

		console.log(deleteList, "delete");
		fetch("https://assets.breatheco.de/apis/fake/todos/user/otra", {
			method: "PUT",
			body: JSON.stringify(deleteList),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => response.json())
			.then(data => {
				console.log(data);
				upLoad();
			})
			.catch(error => console.error("Error:", error));
	};
	const listItems = todos.map((w, index) => (
		<div key={index} className="row">
			<li className="list-group-item col-12">
				{w.label}{" "}
				<button className="deleteBtn" onClick={() => deleteItem(w)}>
					X
				</button>
			</li>
		</div>
	));

	return (
		<div className="container">
			<h2 className="col-12 title">~todos~</h2>
			<div className="col-12">
				<input
					className="inputBox"
					type="text"
					placeholder="Add a new task!"
					onChange={e => setInputValue(e.target.value)}
					value={inputValue}
				/>
				<button
					className="btn btn-info"
					onClick={() => validateInput()}>
					Add!
				</button>
			</div>
			<ul className="list-group">{listItems}</ul>
			<p>{`${todos.length} item/s left`}</p>
		</div>
	);
};
