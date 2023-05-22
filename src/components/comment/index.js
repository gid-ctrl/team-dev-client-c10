import { useEffect, useState } from "react"
import { get } from "../../service/apiClient"
import ProfileCircle from "../profileCircle"
import './style.css'

const Comment = ({ comment }) => {

    return (
        <div className={'comment'}>
            <ProfileCircle initials={comment.initials} />
            <div className={'bg-blue5 comment-body'}>
                <h6>{comment.name}</h6>
                <p>{comment.text}</p>
            </div>
            <div className="edit-icon">
                <p>...</p>
            </div>
        </div>
    )
}

export default Comment