import { useState } from 'react';
import styles from './App.module.css';
import { Form } from './components/form/Form';
import { TodoItem } from './components/toDoItem/TodoItem';
import { getSubHeading } from './utils/getSubHeading';
import { tasksList } from './data/taskList';

function App() {
	const [isFormShown, setIsFormShown] = useState(false);
	const [tasks, setTasks] = useState(tasksList);

	// ✅ Add new task
	const addItem = newTaskName => {
		setTasks(prevTasks => {
			const maxId = prevTasks.length > 0 ? Math.max(...prevTasks.map(task => task.id)) : 0;
			return [...prevTasks, { name: newTaskName, done: false, id: maxId + 1 }];
		});
		setIsFormShown(false);
	};

	// ✅ Delete task
	const deleteItem = id => {
		setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
	};

	// ✅ Mark task as done
	const doneTask = id => {
		setTasks(prevTasks => prevTasks.map(task => (task.id === id ? { ...task, done: true } : task)));
	};

	// ✅ Update task name
	const updateTaskName = (id, newName) => {
		setTasks(prevTasks => prevTasks.map(task => (task.id === id ? { ...task, name: newName } : task)));
	};

	// ✅ Move item up
	const moveItemUp = index => {
		setTasks(prevTasks => {
			if (index === 0) return prevTasks;
			const newTasks = [...prevTasks];
			[newTasks[index], newTasks[index - 1]] = [newTasks[index - 1], newTasks[index]];
			return newTasks;
		});
	};

	// ✅ Move item down
	const moveItemDown = index => {
		setTasks(prevTasks => {
			if (index === prevTasks.length - 1) return prevTasks;
			const newTasks = [...prevTasks];
			[newTasks[index], newTasks[index + 1]] = [newTasks[index + 1], newTasks[index]];
			return newTasks;
		});
	};

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<h1>Do zrobienia</h1>
				<h2>{getSubHeading(tasks.length)}</h2>
				{!isFormShown && (
					<button onClick={() => setIsFormShown(true)} className={styles.button}>
						+
					</button>
				)}
			</header>
			{isFormShown && <Form onFormSubmit={addItem} />}
			<ul>
				{tasks.map(({ id, name, done }, index) => (
					<TodoItem
						key={id}
						id={id}
						name={name}
						done={done}
						onDeleteButtonClick={() => deleteItem(id)}
						onDoneButtonClick={() => doneTask(id)}
						onMoveUp={() => moveItemUp(index)}
						onMoveDown={() => moveItemDown(index)}
						onUpdateTask={updateTaskName}
					/>
				))}
			</ul>
		</div>
	);
}

export default App;
