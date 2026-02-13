export const ShowTask=({taskList, setTaskList, editTask, delTask})=>{
  
    return(
        <section className="showTask">
            <div className="head">
                <div>
                    <span className="title">ToDo</span>
                    <span className="count">{taskList.length}</span>
                </div>
                <button className="clearAll" onClick={()=> setTaskList([])}>Clear All</button>
            </div>

            <ul>
                {taskList.map((mapTask)=>{
                    return(
                        <li key={mapTask.id}>
                            <p>
                                <span className="name">{mapTask.name}</span>
                                <span className="time">{mapTask.time}</span>
                            </p>
                            <i className="bi bi-pencil-square" onClick={()=> editTask(mapTask.id)}></i>
                            <i className="bi bi-trash" onClick={()=> delTask(mapTask.id)}></i>
                        </li>
                    )
                })}                
            </ul>
        </section>
    )
}