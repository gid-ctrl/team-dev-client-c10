import { Link } from "react-router-dom"
import ArrowBackIcon from "../../assets/icons/arrowBackIcon"

function BackButton() {
    return (
        <Link to='/'><ArrowBackIcon /></Link>
    )
}

export default BackButton