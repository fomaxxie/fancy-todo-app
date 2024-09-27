import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, CheckCircle, Circle, Plus, Edit, Save } from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';  // Added priority field
  isEditing?: boolean;
}

export default function FancyTodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [newDueDate, setNewDueDate] = useState<string>(''); 
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high'>('low'); // State for new priority
  const [editText, setEditText] = useState<string>('');
  const [editDueDate, setEditDueDate] = useState<string>(''); 
  const [editPriority, setEditPriority] = useState<'low' | 'medium' | 'high'>('low'); // State for editing priority
  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all'); 
  const inputRef = useRef<HTMLInputElement>(null);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    if (savedTodos.length > 0) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false, dueDate: newDueDate, priority: newPriority }]);
      setNewTodo('');
      setNewDueDate('');
      setNewPriority('low');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEditing = (id: number, currentText: string, currentDueDate?: string, currentPriority?: 'low' | 'medium' | 'high') => {
    setEditText(currentText);
    setEditDueDate(currentDueDate || '');
    setEditPriority(currentPriority || 'low');
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, isEditing: true } : todo)));
  };

  const saveTodo = (id: number) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, text: editText, dueDate: editDueDate, priority: editPriority, isEditing: false } : todo)));
    setEditText('');
    setEditDueDate('');
    setEditPriority('low');
  };

  const handleEditKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, id: number) => {
    if (e.key === 'Enter') {
      saveTodo(id);
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'incomplete') return !todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          className="text-5xl font-extrabold text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Fancy Todo List
          </span>
        </motion.h1>
        <form onSubmit={addTodo} className="mb-8">
          <div className="flex space-x-2">
            <Input
              ref={inputRef}
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task..."
              className="flex-grow bg-gray-800 text-white border-gray-700 focus:border-purple-500 focus:ring-purple-500"
            />
            <Input
              type="date"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
              className="bg-gray-800 text-white border-gray-700 focus:border-purple-500 focus:ring-purple-500"
              min={today}
            />
            <select 
              value={newPriority} 
              onChange={(e) => setNewPriority(e.target.value as 'low' | 'medium' | 'high')} 
              className="bg-gray-800 text-white border-gray-700 focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <Button type="submit" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded">
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </form>

        {/* Filter Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <Button onClick={() => setFilter('all')} variant={filter === 'all' ? 'default' : 'outline'}>
            All
          </Button>
          <Button onClick={() => setFilter('completed')} variant={filter === 'completed' ? 'default' : 'outline'}>
            Completed
          </Button>
          <Button onClick={() => setFilter('incomplete')} variant={filter === 'incomplete' ? 'default' : 'outline'}>
            Incomplete
          </Button>
        </div>

        <AnimatePresence>
          {filteredTodos.map(todo => (
            <motion.div
              key={todo.id}
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
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
