// TaskModal.js
import React, { useEffect, useState } from "react";
import "./style.css";
import { RiTaskLine } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { generateId } from "./utils/generateId";

const Status = {
  TODO: "Por Hacer",
  ON_GOING: "En curso",
  DONE: "Finalizada",
};

const Priority = {
  BAJA: "Baja",
  MEDIA: "Media",
  ALTA: "Alta",
};

const originalTaskData = {
  id: "0",
  name: "",
  priority: "",
  status: "",
  notes: "",
  subtasks: [],
};

const TaskModal = ({ isOpen, closeModal, task, editTask }) => {
  const modalClassName = `task-modal ${isOpen ? "open" : ""}`;

  const handleModalClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    setTaskData(task);
  }, [task]);

  const [taskData, setTaskData] = useState(originalTaskData);

  const [subtasks, setSubtasks] = useState(task?.subtasks || []);
  const [subtaskText, setSubtaskText] = useState("");

  //delete subtask from task
  const handleSubtaskDelete = (index) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks.splice(index, 1);
    setSubtasks(updatedSubtasks);
  };

  //change subtask status to done

  const handleSubtaskStatusChange = (subtaskIndex) => {
    const updatedSubtasks = [...taskData.subtasks];
    updatedSubtasks[subtaskIndex].status =
      updatedSubtasks[subtaskIndex].status === Status.DONE
        ? Status.ON_GOING
        : Status.DONE;

    setTaskData({
      ...taskData,
      subtasks: updatedSubtasks,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "status" && subtasks.length > 0 && value === Status.DONE) {
      setSubtasks((prev) => prev.map((el) => ({ ...el, status: value })));
    }

    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubtaskAdd = () => {
    if (subtaskText.trim() === "") return;

    const newSubtask = {
      id: generateId(),
      name: subtaskText,
      status: task.status,
    };

    setTaskData({
      ...taskData,
      subtasks: [...subtasks, newSubtask],
    });

    setSubtasks([...subtasks, newSubtask]);
    setSubtaskText("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    editTask(taskData);
    setTaskData(originalTaskData);
    closeModal();
  };

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleHoverEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleHoverLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <>
      <div className={modalClassName} onClick={handleModalClick}>
        <div className="modal-content">
          <span className="close-button" onClick={closeModal}>
            <AiOutlineClose />
          </span>
          <div className="title-container">
            <RiTaskLine color="#00006F" fontSize={"24px"} />
            <h3
              style={{
                fontSize: "24px",
                textAlign: "left",
                color: "#00006F",
              }}
            >
              {task?.name}
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  width: "40%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <label htmlFor="priority">Prioridad:</label>
                <select
                  name="priority"
                  value={taskData?.priority}
                  onChange={handleInputChange}
                >
                  <option value={Priority.BAJA}>{Priority.BAJA}</option>
                  <option value={Priority.MEDIA}>{Priority.MEDIA}</option>
                  <option value={Priority.ALTA}>{Priority.ALTA}</option>
                </select>
              </div>
              <div
                style={{
                  width: "40%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <label htmlFor="status">Estado:</label>
                <select
                  name="status"
                  value={taskData?.status}
                  onChange={handleInputChange}
                >
                  <option value={Status.TODO}>{Status.TODO}</option>
                  <option value={Status.ON_GOING}>{Status.ON_GOING}</option>
                  <option value={Status.DONE}>{Status.DONE}</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="notes">Notas:</label>
              <textarea
                rows={3}
                name="notes"
                value={taskData?.notes}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  gap: "24px",
                }}
              >
                <input
                  type="text"
                  placeholder="Nueva Subtarea"
                  value={subtaskText}
                  onChange={(e) => setSubtaskText(e.target.value)}
                />
                <button
                  type="button"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "5px",
                    color: "#00006F",
                    fontSize: "16px",
                  }}
                  onClick={handleSubtaskAdd}
                >
                  Agregar
                </button>
              </div>

              {subtasks?.map((subtask, index) => (
                <ul
                  key={index}
                  className="list-item"
                  onMouseEnter={() => handleHoverEnter(index)}
                  onMouseLeave={() => handleHoverLeave(index)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px",
                    margin: "4px 0",
                    backgroundColor:
                      hoveredIndex === index ? "#f6f6f6" : "transparent", 
                  }}
                >
                  <span className="list-item">
                    <span
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        gap: "8px",
                      }}
                    >
                      <input
                        type="checkbox"
                        defaultChecked={subtask.status === Status.DONE}
                        onChange={() => handleSubtaskStatusChange(index)}
                        style={{ cursor: "pointer" }}
                      />

                      {subtask?.name}
                    </span>
                    {hoveredIndex === index && (
                      <div>
                        <FaTrash
                          color="#AEA9BA"
                          onClick={() => handleSubtaskDelete(index)}
                          style={{ cursor: "pointer", marginLeft: "8px" }}
                        />
                      </div>
                    )}
                  </span>
                </ul>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button className="delete-button">Borrar tarea</button>
              <button className="submit-button" type="submit">
                Guardar Tarea
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TaskModal;
