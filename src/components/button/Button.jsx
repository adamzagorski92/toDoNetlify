import styles from './Button.module.css';

export const Button = ({ children, onClick, inputValue }) => {
	return (
		<button
			disabled={inputValue === '' ? true : false}
			onClick={onClick}
			className={inputValue === '' ? styles.buttonDisabled : styles.button}>
			{children}
		</button>
	);
};
