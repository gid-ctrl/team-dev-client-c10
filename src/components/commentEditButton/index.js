import { useEffect, useState } from "react";
import Menu from "../menu";
import MenuItem from "../menu/menuItem";
import DeleteIcon from "../../assets/icons/deleteIcon";
import ReportIcon from "../../assets/icons/reportIcon";
import CommentEditMenuItem from "./commentEditMenuItem";
import './style.css'

const CommentEditButton = ({userId, authorId}) => {
    
    const [isMenuVisible, setIsMenuVisible] = useState(false)
    
    return (
        <div className="edit-comment-circle" onClick={() => setIsMenuVisible(!isMenuVisible)}>
            {isMenuVisible && <CommentEditMenu userId={userId} authorId={authorId} />}
            <div className="edit-icon">
                <p>...</p>
            </div>
        </div>
    )
}

const CommentEditMenu = ({userId, authorId}) => {
    const [sameUser, setSameUser] = useState(false)

    useEffect(() => {
        if (userId === authorId) {
            setSameUser(true)
        }
    },[])

    return (
        <Menu className="edit-comment-menu" >
            { sameUser ? <CommentEditMenuItem 
                icon={<DeleteIcon />} 
                text='Delete Comment' 
                sameUser={sameUser} 
            /> : 
            <CommentEditMenuItem 
                icon={<ReportIcon />} 
                text='Report Comment' 
                sameUser={sameUser} 
            /> }
        </Menu>
    )
}

export default CommentEditButton