import React, { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import Form from "./components/Form";
import Todo from "./components/Todo";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function App() {
  const [tasks, setTasks] = useState([]);

  const toggleTaskCompleted = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  };

  const taskList = tasks.map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
    />
  ));

  const addTask = (name) => {
    const newTask = { id: "todo-" + nanoid(), name: name, done: false };
    setTasks([...tasks, newTask]);
  };

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun}`;

  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  const deleteDoneTasks = () => {
    const updatedTasks = tasks.filter((task) => task.completed !== true);
    setTasks(updatedTasks);
  }

  console.log("tasks", tasks);
  return (
    <div className="todoapp stack-large">
      <Form addTask={addTask} />
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {tasks.length > 0 ? headingText : ""}
      </h2>
      {tasks.length === 0 ? (
        <div className="empty-view">No Todo</div>
      ) : (
        <>
          <ul
            className="todo-list stack-large stack-exception"
            aria-labelledby="list-heading"
          >
            {taskList}
          </ul>
          <div>
            <button type="button" className="btn btn__danger" onClick={deleteDoneTasks}>
              Delete All Done
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
