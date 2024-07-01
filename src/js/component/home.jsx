import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
  const [todo, setTodo] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    getTasks();
  }, []);

  async function getTasks() {
    try {
      const response = await fetch(
        "https://playground.4geeks.com/todo/users/TIMAURE"
      );
      if (!response.ok) {
        if (response.status === 404) {
          await createUser();
          await getTasks();
        } else {
          throw new Error(`Error: ${response.statusText}`);
        }
      } else {
        const data = await response.json();
        console.log(data);
        setTodo(data.todos); 
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function createUser() {
    try {
      const response = await fetch(
        "https://playground.4geeks.com/todo/users/TIMAURE",
        {
          method: "POST",
          headers: {
            accept: "application/json",
          },
          body: JSON.stringify({
            label: inputValue,
            is_done: false,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`Error al crear usuario: ${response.statusText}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function addTodo(e) {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      try {
        const newTodo = { label: inputValue, is_done: false };
        const response = await fetch(
          "https://playground.4geeks.com/todo/todos/TIMAURE",
          {
            method: "POST",
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newTodo),
          }
        );
        if (response.ok) {
          setTodo(prevTodo => [...prevTodo, newTodo]); 
          setInputValue("");
        } else {
          const data = await response.json();
          console.error("Error adding todo:", data);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  async function deleteOne(id) {
    try {
      console.log(id);
      const response = await fetch(
        `https://playground.4geeks.com/todo/todos/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.status === 204 ) {
        console.log("Todo deleted successfully:", id);
        getTasks();
    }
      console.log(response);
      
    } catch (error) {
      console.error(error);
    }
  }

  const deleteAll = async () => {
    try {
      const promises = todo.map((todo) => {
        return fetch(`https://playground.4geeks.com/todo/todos/${todo.id}`, {
          method: "DELETE",
        });
      });

      await Promise.all(promises);
      getTasks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="contenedo">
      <h1>To Do List!</h1>
      <ul>
        <li>
          <input
            type="text"
            placeholder="Tareas Por Hacer?"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyDown={addTodo}
          ></input>
        </li>

        {todo.map((item, index) => (
  <li key={index}>
    {item.label}
    <i
      className="fa-solid fa-x"
      onClick={() => deleteOne(item.id)}
    ></i>
  </li>
))}
      </ul>
      <div className="numeroPagina">
        <strong>{todo.length} items</strong>
      </div>
      <button onClick={deleteAll} className="btn" type="button">
  Delete All
</button>
    </div>
  );
};

export default Home;


