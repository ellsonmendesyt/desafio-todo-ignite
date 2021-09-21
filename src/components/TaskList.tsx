import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export const TaskList:React.FC=()=> {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if (!newTaskTitle) return; //se nao tiver tasck cancela

    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false
    }

    setTasks(oldState => [...oldState, newTask]);
    setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: number) {
    // olhe cada tarefa, se achar alguma tarefa com esse id
    //poe a tarefa em cima, mas troque sua flag de completa para seu inverso
    //para as outras tarefas simplesmente poe ela de volta no vetor
    const novasTarefas = tasks.map(tarefa => tarefa.id === id ? {
      ...tarefa,
      isComplete: !tarefa.isComplete
    } : tarefa);

    setTasks(novasTarefas)
  }

  function handleRemoveTask(id: number) {
    // crie uma lista com todas as tarefas menoes a tarefa com esse id
    const tarefasFiltradas = tasks.filter(tarefa => tarefa.id !== id);
    ///basicamente remove a tarefa
    setTasks(tarefasFiltradas)

  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}