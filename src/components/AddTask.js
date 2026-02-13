export const AddTask=({currentTask, handleSubmit, handleChange})=>{
      
    return(
        <section className="addTask">
            <span id="spnErrMsg" className="spnErr"></span>
            <form onSubmit={handleSubmit}>
                <input type="text" name="task" value={currentTask.name || ""} placeholder="Add Task" autoComplete="off" maxLength="25" onChange={handleChange}></input>
                <button type="submit">{ currentTask.id ? "Update Task" : "Add Task"}</button>
            </form>
        </section>
    )
}

