import React from 'react';
import styles from './TodoListItem.module.css';

function TodoListItem({ todo, onRemove, onToggleComplete }) {
  const isCompleted = !!todo.completedAt;

  return (
    <li className={styles.ListItem}>
      <div>
        <span
          style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}
        >
          {todo.title}
        </span>
        {todo.completedAt && (
          <p className={styles.CompletedAt}>
            Completed on: {new Date(todo.completedAt).toLocaleString()}
          </p>
        )}
      </div>
      <button
        className={styles.CompleteButton}
        onClick={() => onToggleComplete(todo.id)}
      >
        {isCompleted ? 'Undo' : 'Mark as Completed'}
      </button>
      <button className={styles.RemoveButton} onClick={() => onRemove(todo.id)}>
        Remove
      </button>
    </li>
  );
}

export default TodoListItem;
