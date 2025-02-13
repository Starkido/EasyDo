// import { useState } from 'react';
// import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
// import { db } from '../lib/firebase';
// import { Task } from '../types/task';
// import { CheckCircle2, Circle, Pencil, Trash2, Calendar, Flag } from 'lucide-react';
// import { format } from 'date-fns';
// import clsx from 'clsx';

// interface TaskItemProps {
//   task: Task;
// }

// const priorityColors = {
//   low: 'text-green-600',
//   medium: 'text-yellow-600',
//   high: 'text-red-600',
// };

// export default function TaskItem({ task }: TaskItemProps) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [title, setTitle] = useState(task.title);
//   const [description, setDescription] = useState(task.description || '');

//   const handleToggleComplete = async () => {
//     const taskRef = doc(db, 'tasks', task.id);
//     await updateDoc(taskRef, {
//       completed: !task.completed,
//       updatedAt: new Date(),
//     });
//   };

//   const handleSave = async () => {
//     const taskRef = doc(db, 'tasks', task.id);
//     await updateDoc(taskRef, {
//       title,
//       description,
//       updatedAt: new Date(),
//     });
//     setIsEditing(false);
//   };

//   const handleDelete = async () => {
//     if (window.confirm('Are you sure you want to delete this task?')) {
//       await deleteDoc(doc(db, 'tasks', task.id));
//     }
//   };

//   if (isEditing) {
//     return (
//       <div className="bg-white rounded-lg shadow p-4">
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full mb-2 p-2 border rounded"
//           placeholder="Task title"
//         />
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="w-full mb-4 p-2 border rounded"
//           placeholder="Task description"
//           rows={3}
//         />
//         <div className="flex justify-end space-x-2">
//           <button
//             onClick={() => setIsEditing(false)}
//             className="px-3 py-1 text-gray-600 hover:text-gray-900"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSave}
//             className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={clsx(
//       'bg-white rounded-lg shadow p-4 transition-opacity',
//       task.completed && 'opacity-75'
//     )}>
//       <div className="flex items-start gap-4">
//         <button
//           onClick={handleToggleComplete}
//           className="mt-1 text-gray-400 hover:text-gray-600"
//         >
//           {task.completed ? (
//             <CheckCircle2 className="h-5 w-5 text-green-600" />
//           ) : (
//             <Circle className="h-5 w-5" />
//           )}
//         </button>

//         <div className="flex-1">
//           <h3 className={clsx(
//             'text-lg font-medium',
//             task.completed && 'line-through text-gray-500'
//           )}>
//             {task.title}
//           </h3>
          
//           {task.description && (
//             <p className={clsx(
//               'mt-1 text-gray-600',
//               task.completed && 'line-through'
//             )}>
//               {task.description}
//             </p>
//           )}

//           <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
//             {task.dueDate && (
//               <div className="flex items-center gap-1">
//                 <Calendar className="h-4 w-4" />
//                 {/* <span>{format(task.dueDate, 'MMM d, yyyy')}</span> */}
//                 <span>{task.dueDate ? format(new Date(task.dueDate), 'MMM d, yyyy') : 'No due date'}</span>
//               </div>
              
//             )}
            
//             <div className="flex items-center gap-1">
//               <Flag className={clsx('h-4 w-4', priorityColors[task.priority])} />
//               <span className="capitalize">{task.priority}</span>
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center gap-2">
//           <button
//             onClick={() => setIsEditing(true)}
//             className="p-1 text-gray-400 hover:text-gray-600"
//           >
//             <Pencil className="h-4 w-4" />
//           </button>
//           <button
//             onClick={handleDelete}
//             className="p-1 text-gray-400 hover:text-red-600"
//           >
//             <Trash2 className="h-4 w-4" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState } from 'react';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Task } from '../types/task';
import { CheckCircle2, Circle, Pencil, Trash2, Calendar, Flag } from 'lucide-react';
import { format, isValid } from 'date-fns'; // Import isValid from date-fns
import clsx from 'clsx';

interface TaskItemProps {
  task: Task;
}

const priorityColors = {
  low: 'text-green-600',
  medium: 'text-yellow-600',
  high: 'text-red-600',
};

export default function TaskItem({ task }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');

  const handleToggleComplete = async () => {
    const taskRef = doc(db, 'tasks', task.id);
    await updateDoc(taskRef, {
      completed: !task.completed,
      updatedAt: new Date(),
    });
  };

  const handleSave = async () => {
    const taskRef = doc(db, 'tasks', task.id);
    await updateDoc(taskRef, {
      title,
      description,
      updatedAt: new Date(),
    });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteDoc(doc(db, 'tasks', task.id));
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
          placeholder="Task title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          placeholder="Task description"
          rows={3}
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setIsEditing(false)}
            className="px-3 py-1 text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx(
      'bg-white rounded-lg shadow p-4 transition-opacity',
      task.completed && 'opacity-75'
    )}>
      <div className="flex items-start gap-4">
        <button
          onClick={handleToggleComplete}
          className="mt-1 text-gray-400 hover:text-gray-600"
        >
          {task.completed ? (
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          ) : (
            <Circle className="h-5 w-5" />
          )}
        </button>
        <div className="flex-1">
          <h3 className={clsx(
            'text-lg font-medium',
            task.completed && 'line-through text-gray-500'
          )}>
            {task.title}
          </h3>
          
          {task.description && (
            <p className={clsx(
              'mt-1 text-gray-600',
              task.completed && 'line-through'
            )}>
              {task.description}
            </p>
          )}
          <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
            {task.dueDate && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>
                  {isValid(new Date(task.dueDate)) ? format(new Date(task.dueDate), 'MMM d, yyyy') : 'No due date'}
                </span>
              </div>
            )}
            
            <div className="flex items-center gap-1">
              <Flag className={clsx('h-4 w-4', priorityColors[task.priority])} />
              <span className="capitalize">{task.priority}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 text-gray-400 hover:text-gray-600"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1 text-gray-400 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}