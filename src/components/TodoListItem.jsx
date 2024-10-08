import React from 'react';
import PropTypes from 'prop-types';
import styles from './TodoListItem.module.css';
import { FaUndo, FaCheck } from 'react-icons/fa';

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
            Completed on: {new Date(todo.completedAt).toLocaleDateString()}
          </p>
        )}
      </div>
      <button
        className={styles.CompleteButton}
        onClick={onToggleComplete}
      >
        {/* Toggle between icons based on completion state */}
        {isCompleted ? <FaUndo /> : <FaCheck />}
        {isCompleted ? ' Undo' : ' Mark as Completed'}
      </button>
      <button className={styles.RemoveButton} onClick={onRemove}>
        Remove
      </button>
    </li>
  );
}

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completedAt: PropTypes.string,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
};

export default TodoListItem;
