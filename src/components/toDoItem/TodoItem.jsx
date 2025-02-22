import { useState } from 'react';
import { Button } from '../button/Button';
import styles from './TodoItem.module.css';

export const TodoItem = ({
	id,
	name,
	done,
	onDeleteButtonClick,
	onDoneButtonClick,
	onMoveUp,
	onMoveDown,
	onUpdateTask,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedName, setEditedName] = useState(name);

	const handleUpdate = () => {
		onUpdateTask(id, editedName);
		setIsEditing(false);
	};

	return (
		<li className={styles.item}>
			<div className={styles.buttonsContainer}>
				<Button onClick={onMoveUp} disabled={isEditing}>
					Up
				</Button>
				<Button onClick={onMoveDown} disabled={isEditing}>
					Down
				</Button>
			</div>

			{/* ✅ Tryb edycji / Normalny tryb */}
			{isEditing ? (
				<input className={styles.input} type='text' value={editedName} onChange={e => setEditedName(e.target.value)} />
			) : (
				<span onClick={() => setIsEditing(true)} className={`${styles.name} ${done ? styles.done : ''}`}>
					{name}
				</span>
			)}

			{/* ✅ Przycisk "Zmień" */}
			{isEditing && <Button onClick={handleUpdate}>Zapisz</Button>}

			<div className={styles.buttonsContainer}>
				{!done && <Button onClick={onDoneButtonClick}>Zrobione</Button>}
				<Button onClick={onDeleteButtonClick}>Usuń</Button>
			</div>
		</li>
	);
};
