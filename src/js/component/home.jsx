import React, { useState, useEffect} from "react";


//create your first component
const Home = () => {
	const[todo,settodo] = useState([]);
const[inputValue, setInputValue] = useState ("");

useEffect(() => {
	showTasks();
}, []);

async function showTasks() {
	const response = await fetch(`https://glorious-invention-q7v6jp7pr5x63x5j9-3000.app.github.dev/users/TIMAURE`);
	const data = await response.json();
	const newTodos = data.todos;
	settodo(newTodos);
}

const addTask = async () => {
	if (!inputValue) {
		alert("Por Favor Agrega Una Tarea");
		return;
	}

	const body = {
		label: inputValue,
		"is_done": false
	};

	try {
		const response = await fetch("https://glorious-invention-q7v6jp7pr5x63x5j9-3000.app.github.dev/todos/TIMAURE", {
			method: "POST",
			headers: {
				"accept": "application/json",
				"Content-Type": "application/json"},
			body: JSON.stringify(body)});
		
			const data = await response.json();
		settodo([...todo, data]);
	} catch (error) {
		console.log(error);
	}
	setInputValue("");
};



	return (
		<div className="contenedo">
<h1>To Do List!</h1>
<ul>
	<li><input type="text" 
	placeholder="Tareas Por Hacer?" 
	onChange={(e)=> setInputValue(e.target.value)} 
	value={inputValue} 
	onKeyDown={(e) =>{if (e.key === "Enter"){settodo(todo.concat([inputValue]));
	setInputValue("");}} } ></input>
	</li>
	{todo.length === 0 ? (<li>"No hay tareas, añadir tareas"</li>) : todo.map((item, index) =><li className="conjunto" >{item}{""}
		<i className="fa-solid fa-x" 
		onClick={() => 
		settodo(todo.filter((t, currentindex)=> index != currentindex))}>
			</i></li>)}
</ul>
<div className="numeroPagina"><strong>{todo.length} items</strong></div>
</div>);};

export default Home;




