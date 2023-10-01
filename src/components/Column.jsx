import { useState } from "react";
import Task from "./Tasks";
import "./style.css";

const Column = ({
  title,
  tasks,
  handleCreateTask,
  handleDetail,
  handleDeleteTask,
  handleSubtaskStatusChange,
  handleTaskStatusChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskName, setTaskName] = useState("");

  const handleInputChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleAddTask = () => {
    handleCreateTask(taskName, title);
    setIsEditing(false);
    setTaskName("");
  };

  return (
    <div className="column" >
      <p className="column-title">{title}</p>
      <div onClick={() => setIsEditing(true)}>
        <p
          style={{
            background: "#FFFFFF",
            boxShadow:
              "-1px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -2px rgba(0,0,0,0.05)",
            padding: "1rem",
            cursor: "pointer",
            color:'#6653E0'
          }}
        >
          Agregar tarea
        </p>
      </div>
      <div className="task-list">
        <div
          style={{
            width: "100%",
            display: isEditing ? "flex" : "none",
            flexDirection: "column",
            background: "#FFFFFF",
          }}
        >
          <div
            style={{
              height: "70px",
              p: "10px",
              alignSelf: "center",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <input
              type="text"
              name="name"
              value={taskName}
              placeholder="Nombre de la tarea"
              style={{
                width: "80%",
                backgroundColor: "#F6F6F6",
              }}
              onChange={handleInputChange}
            />
          </div>

          <button
            style={{
              border: "none",
              height: "40px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#00006F",
            }}
            onClick={handleAddTask}
          >
            <p style={{ color: "white" }}>Agregar Tarea</p>
          </button>
        </div>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            handleEdit={handleDetail}
            handleSubtaskStatusChange={handleSubtaskStatusChange}
            handleDeleteTask={handleDeleteTask}
            handleTaskStatusChange={handleTaskStatusChange}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;
