const Form = ({ children, onSubmit, className, onMouseDown, onFocus }) => {
	const onFormSubmit = (event) => {
		event.preventDefault()
		onSubmit()
	}

	return (
		<form
			className={className}
			onSubmit={onFormSubmit}
			onMouseDown={onMouseDown}
			onFocus={onFocus}
		>
			{children}
		</form>
	)
}

export default Form
