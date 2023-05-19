import './style.css'

const Card = ({ children, boxShadow = false, id, onFocus }) => {
    return (
        <div onFocus={onFocus} className={`card ${boxShadow && 'card-shadow'}`}  id={id}>
            {children}
        </div>
    )
}

export default Card