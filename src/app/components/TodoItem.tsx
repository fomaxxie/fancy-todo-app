import { motion } from 'framer-motion';
import { Trash2, CheckCircle, Circle, Edit, Save } from 'lucide-react';

interface TodoItemProps {
  todo: {
    id: number;
    text: string;
    completed: boolean;
    dueDate?: string;
    priority: 'low' | 'medium' | 'high';
    isEditing?: boolean;
  };
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  startEditing: (id: number, text: string, dueDate?: string, priority?: 'low' | 'medium' | 'high') => void;
  saveTodo: (id: number) => void;
  editText: string;
  setEditText: (value: string) => void;
  editDueDate: string;
  setEditDueDate: (value: string) => void;
  editPriority: 'low' | 'medium' | 'high';
  setEditPriority: (value: 'low' | 'medium' | 'high') => void;
  today: string;
  handleEditKeyPress: (e: React.KeyboardEvent<HTMLInputElement>, id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo, toggleTodo, deleteTodo, startEditing, saveTodo, editText, setEditText, editDueDate, setEditDueDate, editPriority, setEditPriority, today, handleEditKeyPress
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center justify-between p-4 mb-4 bg-gray-800 rounded-lg shadow-lg ${
        todo.priority === 'high' ? 'border-l-4 border-red-500' : todo.priority === 'medium' ? 'border-l-4 border-yellow-500' : 'border-l-4 border-green-500'
      }`}
    >
      <div className="flex items-center space-x-3">
        <motion.button 
          onClick={() => toggleTodo(todo.id)} 
          className="focus:outline-none"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {todo.completed ? (
            <CheckCircle className="text-green-500 h-6 w-6" />
          ) : (
            <Circle className="text-gray-400 h-6 w-6" />
          )}
        </motion.button>
        {todo.isEditing ? (
          <>
            <input
              className="bg-gray-800 text-white border-gray-700 focus:border-purple-500 focus:ring-purple-500"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => handleEditKeyPress(e, todo.id)}
            />
            <input
              type="date"
              className="bg-gray-800 text-white border-gray-700 focus:border-purple-500 focus:ring-purple-500"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              min={today}
            />
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value as 'low' | 'medium' | 'high')}
              className="bg-gray-800 text-white border-gray-700 focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </>
        ) : (
          <span className={`${todo.completed ? 'line-through text-gray-500' : 'text-white'} text-lg`}>
            {todo.text} {todo.dueDate && <span className="text-sm text-gray-400">({todo.dueDate})</span>}
            <span className={`ml-2 text-xs ${todo.priority === 'high' ? 'text-red-500' : todo.priority === 'medium' ? 'text-yellow-500' : 'text-green-500'}`}>
              [{todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)} Priority]
            </span>
          </span>
        )}
      </div>
      <div className="flex space-x-3">
        {todo.isEditing ? (
          <motion.button 
            onClick={() => saveTodo(todo.id)} 
            className="text-green-500 hover:text-green-700 focus:outline-none"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Save className="h-5 w-5" />
          </motion.button>
        ) : (
          <motion.button 
            onClick={() => startEditing(todo.id, todo.text, todo.dueDate, todo.priority)} 
            className="text-yellow-500 hover:text-yellow-700 focus:outline-none"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Edit className="h-5 w-5" />
          </motion.button>
        )}
        <motion.button 
          onClick={() => deleteTodo(todo.id)} 
          className="text-red-500 hover:text-red-700 focus:outline-none"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Trash2 className="h-5 w-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TodoItem;
