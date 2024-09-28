import { NextApiRequest, NextApiResponse } from 'next';

// In-memory todo storage (it resets on server restart)
let todos: Array<{ id: number; text: string; completed: boolean; dueDate?: string; priority: 'low' | 'medium' | 'high' }> = [];

// API handler function
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Return all todos
    res.status(200).json(todos);
  } else if (req.method === 'POST') {
    const { text, dueDate, priority } = req.body;
    const newTodo = { id: Date.now(), text, completed: false, dueDate, priority };
    todos.push(newTodo);
    res.status(201).json(newTodo);
  } else if (req.method === 'PATCH') {
    const { id, text, completed, dueDate, priority } = req.body;
    todos = todos.map(todo =>
      todo.id === id ? { ...todo, text, completed, dueDate, priority } : todo
    );
    res.status(200).json(todos.find(todo => todo.id === id));
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    todos = todos.filter(todo => todo.id !== id);
    res.status(200).json({ message: 'Todo deleted' });
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
