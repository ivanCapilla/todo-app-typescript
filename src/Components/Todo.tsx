import { type TodoId, type Todo as TodoType } from '../types'

interface TodoProps extends TodoType {
  handleRemove: ({id}: TodoId) => void
  handleCompleted: ({id, completed}: Pick<TodoType, 'id' | 'completed'>) => void
}

export const Todo: React.FC<TodoProps> = ({ id, title, completed, handleRemove, handleCompleted }) => {
  return (
    <div className="view">
      <input 
        className="toggle" 
        type="checkbox" 
        checked={completed} 
        onChange={(event)=>{
          handleCompleted({id, completed: event.target.checked})
        }}
      />
      <label>{title}</label>
      <button
        className='destroy'
        onClick={()=>{
          handleRemove({id})
        }}
      ></button>
    </div>
  )
}