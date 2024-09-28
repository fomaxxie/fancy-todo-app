import { Button } from '@/app/components/ui/button';

interface TodoFilterProps {
  filter: 'all' | 'completed' | 'incomplete';
  setFilter: (filter: 'all' | 'completed' | 'incomplete') => void;
}

const TodoFilter: React.FC<TodoFilterProps> = ({ filter, setFilter }) => {
  return (
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
  );
};

export default TodoFilter;
