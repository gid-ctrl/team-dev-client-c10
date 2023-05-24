import { NavLink } from "react-router-dom"

const CommentEditMenuItem = ({ icon, text, children, linkTo = '#nogo', sameUser }) => {
    return (
        <li>
            <NavLink to={linkTo}>
                {icon}
                <p>{text}</p>
            </NavLink>
            {children && <ul>{children}</ul>}
        </li>
    )
}

export default CommentEditMenuItem