import React from 'react';
import styles from './TodoListItem.module.css';

function TodoListItem({ todo, onRemove, onComplete }) {
  return (
    <li className={styles.ListItem}>
      <div>
        <span>{todo.title}</span>
        {todo.completedAt && (
          <p className={styles.CompletedAt}>Completed on: {new Date(todo.completedAt).toLocaleString()}</p>
        )}
      </div>
      <button className={styles.CompleteButton} onClick={onComplete}>
        Complete
      </button>
      <button className={styles.RemoveButton} onClick={onRemove}>
        Remove
      </button>
    </li>
  );
}

export default TodoListItem;
