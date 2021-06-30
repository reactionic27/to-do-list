import React, { useState } from "react";

function Form(props) {
  const [name, setName] = useState("");
  const [isEmpty, setEmpty] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      setEmpty(true);
      return;
    }
    props.addTask(name);
    setName("");
    setEmpty(false);
  }

  function handleChange(e) {
    setName(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-wrapper">
        <div className="input-wrapper">
          <input
            type="text"
            id="new-todo-input"
            className="input input__lg"
            name="text"
            autoComplete="off"
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className="btn-wrapper">
          <button type="submit" className="btn btn__primary btn__lg">
            Add
          </button>
        </div>
      </div>
      {isEmpty && <div className="error-message">Name can not be blank</div>}
    </form>
  );
}

export default Form;
