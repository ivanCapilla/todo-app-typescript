import { useState } from 'react'
import { Todos } from './Components/Todos'
import { type TodoId, type Todo as TodoType, type FilterValue, type TodoTitle } from './types'
import { TODO_FILTERS } from './consts'
import { Footer } from './Components/Footer'
import { Header } from './Components/Header'


const mockTodos = [
  {
    id: '1',
    title: 'Todo 1',
    completed: false,
  },
  {
    id: '2',
    title: 'Todo 2',
    completed: true,
  },
  {
    id: '3',
    title: 'Todo 3',
    completed: false,
  },
]

const App: React.FC = () => {
  const [todos, setTodos] = useState(mockTodos)
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

  const handleRemove = ({ id }: TodoId) => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }
  
  const handleCompleted = ({ id, completed }: Pick<TodoType, 'id' | 'completed'>): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed }
      }
      return todo
    })
    setTodos(newTodos)
  }

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter) 
  }
  
  const filteredTodos = todos.filter((todo) => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  const handleRemoveAllCompleted = (): void => {
    const newTodos = todos.filter((todo) => !todo.completed)
    setTodos(newTodos)
  }
  const activeCount = todos.filter((todo) => !todo.completed).length
  const completedCount = todos.length - activeCount

  const handleAddTodo = ({title}: TodoTitle): void => {
    const newTodo = {
      title,
      id : crypto.randomUUID(),
      completed: false,
    }
    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
  } 
  
  return (
    <>
      <div className='todoapp'>
        <Header onAddTodo={handleAddTodo} />
        <Todos
          handleCompleted={handleCompleted} 
          handleRemove={handleRemove}
          todos={filteredTodos}
        />
        <Footer
          activeCount={activeCount}
          completedCount={completedCount}
          filterSelected={filterSelected}
          onClearCompleted={handleRemoveAllCompleted}
          handleFilterChange={handleFilterChange}
        />
      </div>
    </>
  )
}

export default App
