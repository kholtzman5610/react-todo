import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './TodoListItem.module.css';
import { FaUndo, FaCheck, FaEdit, FaSave, FaTrash } from 'react-icons/fa';

const TodoListItem = ({ todo, onRemove, onToggleComplete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const isCompleted = !!todo.completedAt;

  const handleEdit = () => {
    if (isEditing && newTitle !== todo.title) {
      onEdit(todo.id, newTitle);
    }
    setIsEditing(!isEditing);
  };

  return (
    <li className={styles.ListItem}>
      <div>
        <span style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>
          {isEditing ? (
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          ) : (
            todo.title
          )}
        </span>
        {isCompleted && (
          <p className={styles.CompletedAt}>
            Completed on: {new Date(todo.completedAt).toLocaleDateString()}
          </p>
        )}
      </div>
      <button className={styles.CompleteButton} onClick={() => onToggleComplete(todo.id, todo.completedAt)}>
        {isCompleted ? <FaUndo /> : <FaCheck />}
        {isCompleted ? ' Undo' : ' Mark as Completed'}
      </button>
      <button className={styles.EditButton} onClick={handleEdit}>
        {isEditing ? <FaSave /> : <FaEdit />}
        {isEditing ? ' Save' : ' Edit'}
      </button>
      <button className={styles.RemoveButton} onClick={() => onRemove(todo.id)}>
        <FaTrash />
        Remove
      </button>
    </li>
  );
};

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completedAt: PropTypes.string,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default TodoListItem;
