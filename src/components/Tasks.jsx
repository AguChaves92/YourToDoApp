import React from "react";
import "./style.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import dayjs from "dayjs";
import LowPrioritySVG from "../assets/svgs/LowPrioritySvg";
import MediumPrioritySVG from "../assets/svgs/MediumPrioritySvg";
import HighPrioritySVG from "../assets/svgs/HighPrioritySvg";
import {AiFillCloseCircle} from 'react-icons/ai'
const Priority = {
  BAJA: "Baja",
  MEDIA: "Media",
  ALTA: "Alta",
};

const Status = {
  TODO: "Por Hacer",
  ON_GOING: "En curso",
  DONE: "Finalizada",
};

const Task = ({
  task,
  handleEdit,
  handleDeleteTask,
  handleSubtaskStatusChange,
  handleTaskStatusChange,
}) => {



  const handleClick = (event) => {
    // Verificar si el clic ocurrió en la checkbox o en el icono de borrar
    const isCheckbox = event.target.type === "checkbox";
    const isDeleteButton = event.target.classList.contains("delete-task");
    if (!isCheckbox && !isDeleteButton) {
      handleEdit(task);
    }
  };


  return (
    <div className="task" onClick={handleClick}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "1rem",
        }}
      >
        <span
          className="delete-task"
          style={{
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={(event) => {
            event.stopPropagation();
            handleDeleteTask(task.id);
          }}
        >
          {" "}
          <AiFillCloseCircle fontSize='20px' color={"#D12828"} />
        </span>
      </div>

      <div className="task-header">
        <input
          type="checkbox"
          defaultChecked={task.status === Status.DONE}
          onChange={() => handleTaskStatusChange(task.id)}
        />
        <span className="task-name">{task.name}</span>
      </div>
      {task.subtasks && task.subtasks.length > 0 && (
        <div className="subtasks">
          {task.subtasks.map((subtask, index) => (
            <div key={index} className="subtask">
              <input
                type="checkbox"
                defaultChecked={subtask.status === Status.DONE}
                onChange={() => handleSubtaskStatusChange(task.id, subtask.id)}
              />
              {subtask.name}
            </div>
          ))}
        </div>
      )}

      {task.notes && task.notes.length > 0 ? (
        <div
          className="task-header"
          style={{
            backgroundColor: "#F6F6F6",
            padding: "5px",
          }}
        >
          <p className="task-notes">
            {task.notes.length > 40
              ? `${task.notes.slice(0, 40)}...`
              : task.notes}
          </p>
        </div>
      ) : null}
      <div style={{ border: "0.25px solid #AEA9BA", borderRadius: "5px" }} />

      <div className="task-footer">
        <span
          style={{
            display: "flex",
            gap: "8px",
            color: "#AEA9BA",
            fontSize: "14px",
          }}
        >
          <FaRegCalendarAlt color="#0073F7" />
          {dayjs(task.date).format("D/M/YYYY")}
        </span>
        {task.priority === Priority.BAJA ? (
          <span
            style={{
              display: "flex",
              gap: "8px",
              color: "#494454",
              fontSize: "14px",
              alignItems:'center'
            }}
          >
            {task.priority}
            <LowPrioritySVG />
          </span>
        ) : task.priority === Priority.MEDIA ? (
          <span
            style={{
              display: "flex",
              gap: "8px",
              color: "#1D1A27",
              fontSize: "14px",
              alignItems:'center'
            }}
          >
            {task.priority}
            <MediumPrioritySVG />
          </span>
        ) : (
          <span
            style={{
              display: "flex",
              gap: "8px",
              color: "#1D1A27",
              fontSize: "14px",
              alignItems:'center'
            }}
          >
            {task.priority}
            <HighPrioritySVG />
          </span>
        )}
      </div>
    </div>
  );
};

export default Task;
