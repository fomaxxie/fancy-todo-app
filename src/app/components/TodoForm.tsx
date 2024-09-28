import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Plus } from 'lucide-react';

interface TodoFormProps {
  newTodo: string;
  setNewTodo: (value: string) => void;
  newDueDate: string;
  setNewDueDate: (value: string) => void;
  newPriority: 'low' | 'medium' | 'high';
  setNewPriority: (value: 'low' | 'medium' | 'high') => void;
  addTodo: (e: React.FormEvent) => void;
  today: string;
  inputRef: React.RefObject<HTMLInputElement>;
}

const TodoForm: React.FC<TodoFormProps> = ({
  newTodo, setNewTodo, newDueDate, setNewDueDate, newPriority, setNewPriority, addTodo, today, inputRef
}) => {
  return (
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
  );
};

export default TodoForm;
