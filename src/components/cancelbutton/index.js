import { Link } from "react-router-dom"
import CrossBlackIcon from "../../assets/icons/crossBlackIcon"

function CancelButton() {
    return (
        <Link to='/'><CrossBlackIcon /></Link>
    )
}

export default CancelButton