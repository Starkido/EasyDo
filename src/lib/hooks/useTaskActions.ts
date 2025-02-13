import { collection, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { Task } from '../../types/task';
import { taskConverter } from '../taskConverter';

export function useTaskActions() {
  const { user } = useAuth();

  const addTask = async (taskData: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    if (!user) throw new Error('User must be authenticated');

    const task: Omit<Task, 'id'> = {
      ...taskData,
      userId: user.uid,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const tasksRef = collection(db, 'tasks').withConverter(taskConverter);
    await addDoc(tasksRef, task);
  };

  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    if (!user) throw new Error('User must be authenticated');

    const taskRef = doc(db, 'tasks', taskId).withConverter(taskConverter);
    await updateDoc(taskRef, {
      ...updates,
      updatedAt: new Date(),
    });
  };

  const deleteTask = async (taskId: string) => {
    if (!user) throw new Error('User must be authenticated');

    const taskRef = doc(db, 'tasks', taskId);
    await deleteDoc(taskRef);
  };

  return {
    addTask,
    updateTask,
    deleteTask,
  };
}