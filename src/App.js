import { useState, useEffect } from "react";
import {Header} from "./components/Header.js"
import {AddTask} from "./components/AddTask.js"
import {ShowTask} from "./components/ShowTask.js"
import './App.css';

function App() {
  const [taskList, setTaskList] = useState(JSON.parse(localStorage.getItem("tasklist")) || [])
  const [theme,setTheme]=useState(JSON.parse(localStorage.getItem("theme")) || "gTwo");
  const [currentTask, setCurrentTask] = useState({})
  
    const handleSubmit=(e)=>{
      e.preventDefault();
      
      if(currentTask.id){
        const date=new Date();
          
          const updatedTaskList = taskList.map((task)=>{
              return (task.id === currentTask.id ? {id: currentTask.id, name: currentTask.name, time: date.toLocaleDateString() + " " + date.toLocaleTimeString() } : task)
          })
          
          setTaskList(updatedTaskList);
          setCurrentTask({});
      } else {
          if(handleCheckExist(currentTask.name)){          
            document.getElementById('spnErrMsg').innerText = "Task already exist!";
            e.target.task.focus();
            return;
          }

          const date=new Date();
          const newTask={
              id: date.getTime(),
              name: currentTask.name,
              time: date.toLocaleDateString() + " " + date.toLocaleTimeString()
          }

          setTaskList([...taskList, newTask])
          setCurrentTask({});
      }      
    }

    const handleEdit=(taskId)=>{
        const selectedTask = taskList.find((task)=>{
            return task.id === taskId
        })

        setCurrentTask(selectedTask)
    }

    const handleDelete=(taskId)=>{
        const newTaskList = taskList.filter((task)=>{
            return task.id !== taskId
        })

        setTaskList(newTaskList)
    }

    const handleCheckExist=(taskName)=>{
        const matchingTask = taskList.find((task)=>{
          return (task.name).trim() === (taskName).trim()
        })

        if(matchingTask){
          return true;
        }
        return false;
    }
    const handleTaskChange=(e)=>{
        document.getElementById('spnErrMsg').innerText = "";
        setCurrentTask({...currentTask, name: e.target.value})
    }


    useEffect(()=>{
      localStorage.setItem("tasklist",JSON.stringify(taskList)) 
    }, [taskList])

    useEffect(()=>{
          localStorage.setItem("theme",JSON.stringify(theme));
          document.documentElement.className=theme;
      },[theme])

  return (
    <div className={"App " + theme}>
        <Header theme={theme} setTheme={setTheme} />
        <AddTask currentTask={currentTask} setCurrentTask={setCurrentTask} handleSubmit={handleSubmit} handleChange={handleTaskChange} />
        <ShowTask taskList={taskList} setTaskList={setTaskList} editTask={handleEdit} delTask={handleDelete} />    
    </div>
  );
}

export default App;
