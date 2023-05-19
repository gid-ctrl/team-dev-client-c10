import './style.css'

const Card = ({ children, boxShadow = false, id}) => {
    return (
        <div className={`card ${boxShadow && 'card-shadow'}`}  id={id}>
            {children}
        </div>
    )
}

export default Card