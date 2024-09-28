import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TodoForm from '@/app/components/TodoForm';
import TodoItem from '@/app/components/TodoItem';
import TodoFilter from '@/app/components/TodoFilter';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  isEditing?: boolean;
}

export default function FancyTodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [newDueDate, setNewDueDate] = useState<string>('');
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high'>('low');
  const [editText, setEditText] = useState<string>('');
  const [editDueDate, setEditDueDate] = useState<string>('');
  const [editPriority, setEditPriority] = useState<'low' | 'medium' | 'high'>('low');
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

        {/* Todo Form */}
        <TodoForm 
          newTodo={newTodo} 
          setNewTodo={setNewTodo} 
          newDueDate={newDueDate} 
          setNewDueDate={setNewDueDate} 
          newPriority={newPriority} 
          setNewPriority={setNewPriority} 
          addTodo={addTodo} 
          today={today} 
          inputRef={inputRef}
        />

        {/* Filter */}
        <TodoFilter filter={filter} setFilter={setFilter} />

        {/* Todo Items */}
        <AnimatePresence>
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              startEditing={startEditing}
              saveTodo={saveTodo}
              editText={editText}
              setEditText={setEditText}
              editDueDate={editDueDate}
              setEditDueDate={setEditDueDate}
              editPriority={editPriority}
              setEditPriority={setEditPriority}
              today={today}
              handleEditKeyPress={handleEditKeyPress}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
