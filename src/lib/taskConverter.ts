import { DocumentData, QueryDocumentSnapshot, Timestamp } from 'firebase/firestore';
import { Task } from '../types/task';

export const taskConverter = {
  toFirestore(task: Task): DocumentData {
    return {
      userId: task.userId,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate ? Timestamp.fromDate(task.dueDate) : null,
      priority: task.priority,
      completed: task.completed,
      createdAt: Timestamp.fromDate(task.createdAt),
      updatedAt: Timestamp.fromDate(task.updatedAt),
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Task {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      userId: data.userId,
      title: data.title,
      description: data.description,
      dueDate: data.dueDate ? data.dueDate.toDate() : null,
      priority: data.priority,
      completed: data.completed,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    };
  },
};