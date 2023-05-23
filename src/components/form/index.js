const Form = ({ children, onSubmit, className, onBlur }) => {
    const onFormSubmit = (event) => {
        event.preventDefault()
        onSubmit()
    }

    return (
        <form className={className} onSubmit={onFormSubmit} onBlur={onBlur}>
            {children}
        </form>
    )
}

export default Form