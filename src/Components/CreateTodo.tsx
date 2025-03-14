import { type TodoTitle } from '../types'
import { useState } from 'react'

interface Props {
  saveTodo: ({title}: TodoTitle) => void
}

export const CreateTodo: React.FC<Props> = ({saveTodo}) => {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const title = inputValue.trim()
    if (title) {
      saveTodo({title})
      setInputValue('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className='new-todo'
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value)
        }}
        placeholder='Agregar tarea'
        autoFocus
      />
    </form>
  )
}