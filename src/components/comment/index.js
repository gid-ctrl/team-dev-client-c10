import { useEffect, useState } from "react"
import { get } from "../../service/apiClient"
import ProfileCircle from "../profileCircle"
import CommentEditButton from "../commentEditButton"
import './style.css'

const Comment = ({ comment, currentUser }) => {

    return (
        <div className={'comment'} >
            <ProfileCircle initials={comment.initials} />
            <div className={'bg-blue5 comment-body'}>
                <h6>{comment.name}</h6>
                <p>{comment.text}</p>
            </div>
            <CommentEditButton
            userId={currentUser.id}
            authorId={comment.authorId} />
        </div>
    )
}

export default Comment