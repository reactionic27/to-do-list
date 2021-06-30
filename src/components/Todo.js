import React from "react";

export default function Todo(props) {
  return (
    <li className="todo">
      <div className="stack-small">
        <div className="c-cb">
          <input
            id={props.id}
            type="checkbox"
            defaultChecked={props.completed}
            onChange={() => props.toggleTaskCompleted(props.id)}
          />
          <label
            className={props.completed ? "todo-active-label" : "todo-label"}
            htmlFor={props.id}
          >
            <span>{props.name}</span>
          </label>
        </div>
        <div className="btn-group">
          <button
            type="button"
            className="btn btn__primary"
            onClick={() => props.deleteTask(props.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}
