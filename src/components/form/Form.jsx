import { useState } from 'react';
import { Button } from '../button/Button';
import styles from './Form.module.css';

export const Form = ({ onFormSubmit }) => {
	const [inputValue, setInputValue] = useState('');
	console.log(inputValue);
	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				onFormSubmit(inputValue);
			}}
			className={styles.form}>
			<input
				value={inputValue}
				onChange={e => setInputValue(e.target.value)}
				className={styles.input}
				type='text'
				placeholder='Co jest do zrobienia?'
			/>
			<Button inputValue={inputValue}>Dodaj</Button>
		</form>
	);
};
