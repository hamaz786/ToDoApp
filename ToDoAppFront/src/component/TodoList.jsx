import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { BsCheckLg } from 'react-icons/bs'

export default function TodoList() {

  
  const [isCompleteScreen, setIsCompleteScreen] = useState(false)

  // Initial state of all todos list
  const [allTodos, setTodos] = useState([])

  // Initial State of title
  const [newTitle, setNewTitle] = useState('')
  
  //Initial state of descript
  const [newDescription, setNewDescription] = useState('')

  // Intital completed todos
  const [completedTodos, setCompletedTodos] = useState([])

  //Intitial edit data
  const [currentEdit, setCurrentEdit] = useState('')
  // Initial edited item
  const [currentEditedItem, setCurrentEditedItem] = useState('')


  // When todolist is added by user
  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    }

    let updatedTodoArr = [...allTodos]
    updatedTodoArr.push(newTodoItem)
    setTodos(updatedTodoArr)
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr))
  }

  // When user delete the todoList the handleDelete is called
  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos]
    reducedTodo.splice(index)

    localStorage.setItem('todolist', JSON.stringify(reducedTodo))
    setTodos(reducedTodo)
  }

  // When  will click complete button to see completed list then user will see the list of data which was completed by him
  const handleComplete = (index) => {
    let now = new Date()
    let dd = now.getDate()
    let mm = now.getMonth() + 1
    let yyyy = now.getFullYear()
    let h = now.getHours()
    let m = now.getMinutes()
    let s = now.getSeconds()
    let completedOn =
      dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    }

    let updatedCompletedArr = [...completedTodos]
    updatedCompletedArr.push(filteredItem)
    setCompletedTodos(updatedCompletedArr)
    handleDeleteTodo(index)
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr))
  }

  // When a user delete todo list from list which was earlier completed
  const handleDeleteCompletedTodo = (index) => {
    let reducedTodo = [...completedTodos]
    reducedTodo.splice(index)

    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo))
    setCompletedTodos(reducedTodo)
  }


  // useEffect is used to saved the toDos which will be used by again when user refresh
  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'))
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'))
    if (savedTodo) {
      setTodos(savedTodo)
    }

    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo)
    }
  }, [])


  // When user click on edit button to edit the title or description
  const handleEdit = (ind, item) => {
    console.log(ind)
    setCurrentEdit(ind)
    setCurrentEditedItem(item)
  }

  // WHen title is update by the user handleUpdateTitle is called
  const handleUpdateTitle = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, title: value }
    })
  }

  // When description is update by user handleUpdateDescription is called
  const handleUpdateDescription = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, description: value }
    })
  }


  //When User on click on update button to update list from prev to new one
  const handleUpdateToDo = () => {
    let newToDo = [...allTodos]
    newToDo[currentEdit] = currentEditedItem
    setTodos(newToDo)
    setCurrentEdit('')
  }

  return (
    <>
{/*       Navbar  */}
      <Navbar />
      <div className="Todoster">
{/*           MAIN Heading   */}
        <h2>TodoSter -Plan,track and organize your Task</h2>

        <div className="todo-wrapper">
          <div className="todo-input">
{/*             ipnut of todo list */}
            <div className="todo-input-item">
              <label>Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="What's the task title?"
              />
            </div>
            <div className="todo-input-item">
              <label>Description</label>
              <input
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="What's the task description?"
              />
            </div>
            <div className="todo-input-item">
              <button
                type="button"
                onClick={handleAddTodo}
                className="primaryBtn"
              >
                Add ToDo
              </button>
            </div>
          </div>
          
          {/*    Buttons to switch between todos and completed todos       */}
          
          <div className="btn-area">
            <button
              className={`secondaryBtn ${
                isCompleteScreen === false && 'active'
              }`}
              onClick={() => setIsCompleteScreen(false)}
            >
              Todo
            </button>
            <button
              className={`secondaryBtn ${
                isCompleteScreen === true && 'active'
              }`}
              onClick={() => setIsCompleteScreen(true)}
            >
              Completed
            </button>
          </div>


            {/*  To Update ToDos List   */}
          
          <div className="todo-list">
            {isCompleteScreen === false &&
              allTodos.map((item, index) => {
                if (currentEdit === index) {
                  return (
                    <div className="edit__wrapper" key={index}>
                      <input
                        placeholder="Updated Title"
                        onChange={(e) => handleUpdateTitle(e.target.value)}
                        value={currentEditedItem.title}
                      />
                      <textarea
                        placeholder="Updated Title"
                        rows={4}
                        onChange={(e) =>
                          handleUpdateDescription(e.target.value)
                        }
                        value={currentEditedItem.description}
                      />
                      <button
                        type="button"
                        onClick={handleUpdateToDo}
                        className="primaryBtn"
                      >
                        Update
                      </button>
                    </div>
                  )
                } else {
                  return (
                    <div className="todo-list-item" key={index}>
                      
                        {/*  TodosList Will display here using map method   */} 
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </div>

                      <div>
                        <AiOutlineDelete
                          className="icon"
                          onClick={() => handleDeleteTodo(index)}
                          title="Delete?"
                        />
                        <BsCheckLg
                          className="check-icon"
                          onClick={() => handleComplete(index)}
                          title="Complete?"
                        />
                        <AiOutlineEdit
                          className="check-icon"
                          onClick={() => handleEdit(index, item)}
                          title="Edit?"
                        />
                      </div>
                    </div>
                  )
                }
              })}


           {/*                 Completed Todos by user on which date          */}

            
            {isCompleteScreen === true &&
              completedTodos.map((item, index) => {
                return (
                  <div className="todo-list-item" key={index}>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <p>
                        <small>Completed on: {item.completedOn}</small>
                      </p>
                    </div>

                    <div>
                      <AiOutlineDelete
                        className="icon"
                        onClick={() => handleDeleteCompletedTodo(index)}
                        title="Delete?"
                      />
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </>
  )
}
