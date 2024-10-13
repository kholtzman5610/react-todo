import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './TodoListItem.module.css';
import { FaUndo, FaCheck, FaEdit, FaSave, FaTrash } from 'react-icons/fa';

const TodoListItem = ({ todo, onRemoveTodo, onToggleComplete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [isExpanded, setIsExpanded] = useState(false);
  const isCompleted = !!todo.completedAt;
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [newTitle]);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const truncatedText = todo.title.length > 50 && !isExpanded
    ? `${todo.title.slice(0, 50)}...`
    : todo.title;

  const handleEdit = () => {
    if (isEditing && newTitle !== todo.title) {
      onEdit(todo.id, newTitle);
    }
    setIsEditing(!isEditing);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleEdit();
    }
  };

  return (
    <li className={styles.ListItem}>
      <div className={styles.ContentWrapper}>
        <div>
          <span style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>
            {isEditing ? (
              <textarea
                ref={textareaRef}
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyPress={handleKeyPress}
                className={styles.TextArea} 
                rows={1}
              />
            ) : (
              truncatedText
            )}
          </span>
          {todo.title.length > 50 && !isEditing && (
            <button className={styles.SeeMoreButton} onClick={toggleExpand}>
              {isExpanded ? 'See Less' : 'See More'}
            </button>
          )}
          {isCompleted && (
            <p className={styles.CompletedAt}>
              Completed on: {new Date(todo.completedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
      <div className={styles.ButtonGroup}>
        <button className={styles.CompleteButton} onClick={() => onToggleComplete(todo.id, todo.completedAt)}>
          {isCompleted ? <FaUndo /> : <FaCheck />}
          {isCompleted ? ' Undo' : ' Mark as Completed'}
        </button>
        <button className={styles.EditButton} onClick={handleEdit}>
          {isEditing ? <FaSave /> : <FaEdit />}
          {isEditing ? ' Save' : ' Edit'}
        </button>
        <button className={styles.RemoveButton} onClick={() => onRemoveTodo(todo.id)}>
          <FaTrash />
          Remove
        </button>
      </div>
    </li>
  );
};

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completedAt: PropTypes.string,
  }).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default TodoListItem;
