import React, { useState } from "react";
import Column from "./Column";
import TaskModal from "./TaskModal";
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

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleCreateTask = (name, status) => {
    const newTask = {
      name,
      status,
      priority:Priority.BAJA,
      id: generateId(),
      createdAt: new Date()
    };

    setTasks([...tasks, newTask]);
  };

  const editTask = (task) => {
    const filteredTasks = tasks.filter((t) => t.id !== task.id);

    setTasks([...filteredTasks, task]);
  };

  const handleOpenModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleTaskStatusChange = (id) => {
    setTasks((prevTasks) => {
        return prevTasks.map((task) => {
          if (task.id === id) {
      
            const updatedTask = {
              ...task,
              status: task.status === Status.ON_GOING ? Status.DONE : Status.ON_GOING,
            };
    
            // Actualizamos también el estado de las subtasks si existen
            if (updatedTask.subtasks && updatedTask.subtasks.length > 0) {
              const updatedSubtasks = updatedTask.subtasks.map((subtask) => ({
                ...subtask,
                status: updatedTask.status, 
              }));
              updatedTask.subtasks = updatedSubtasks;
            }
    
            return updatedTask; 
          }
    
          return task; 
        });
      });
  };


  const handleSubtaskStatusChange = (taskId, subtaskId) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === taskId) {
       
          const updatedSubtasks = task.subtasks.map((subtask) => {
            if (subtask.id === subtaskId) {
            
              const newSubtaskStatus =
                subtask.status ===  Status.DONE ? Status.ON_GOING : Status.DONE;
  
              return {
                ...subtask,
                status: newSubtaskStatus,
              };
            }
            return subtask;
          });
  
          const updatedTask = {
            ...task,
            subtasks: updatedSubtasks,
          };

  
          // Comprobamos si todas las subtasks están en estado 'done'
          const allSubtasksDone = updatedTask.subtasks.every(
            (subtask) => subtask.status === Status.DONE
          );
          
  
          // Actualizamos el estado de la tarea principal en función de las subtasks
          updatedTask.status = allSubtasksDone ? Status.DONE : Status.ON_GOING;
  
          return updatedTask; 
        }
  
        return task; 
      });
    });
  };
  


  return (
    <>
      <div className="todo-list">
        <div
          style={{ display: "flex", justifyContent: "space-evenly" }}
          className="columns-container"
        >
          <Column
            title={Status.TODO}
            tasks={tasks.filter((task) => task.status === Status.TODO)}
            handleCreateTask={handleCreateTask}
            handleDetail={handleOpenModal}
            handleDeleteTask={handleDeleteTask}
            handleSubtaskStatusChange={handleSubtaskStatusChange}
            handleTaskStatusChange={handleTaskStatusChange}
          />
          <Column
            title={Status.ON_GOING}
            tasks={tasks.filter((task) => task.status === Status.ON_GOING)}
            handleCreateTask={handleCreateTask}
            handleDetail={handleOpenModal}
            handleDeleteTask={handleDeleteTask}
            handleSubtaskStatusChange={handleSubtaskStatusChange}
            handleTaskStatusChange={handleTaskStatusChange}
          />
          <Column
            title={Status.DONE}
            tasks={tasks.filter((task) => task.status === Status.DONE)}
            handleCreateTask={handleCreateTask}
            handleDetail={handleOpenModal}
            handleDeleteTask={handleDeleteTask}
            handleSubtaskStatusChange={handleSubtaskStatusChange}
            handleTaskStatusChange={handleTaskStatusChange}
          />
        </div>
      </div>
      <TaskModal
        isOpen={isModalOpen}
        task={selectedTask}
        editTask={editTask}
        closeModal={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default TodoList;
