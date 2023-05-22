import { useEffect, useState } from "react"
import { get } from "../../service/apiClient"

const Comment = ({ comment }) => {
    
    const [commentName, setCommentName] = useState("")
    const [commentInitials, setCommentInitials] = useState("")
    const [commentText, setCommentText] = useState("")

    useEffect(() => {
        get(`users/${comment.userId}`).then((res) => {
            setCommentName(`${res.data.user.firstName} ${res.data.user.lastName}`)
            setCommentInitials(`${res.data.user.firstName?.[0]}${res.data.user.lastName?.[0]}`)
        })
        setCommentText(comment.content)
    },[])

    const testFunction = () => {
        console.log(commentInitials)
    }

    const testFunction2 = () => {
        setCommentInitials(commentName.match(/\b(\w)/g))
    }

    return (
        <>
            <h6>{commentName}</h6>
            <p>{commentInitials}</p>
            <p onClick={testFunction} >{commentText}</p>
        </>
    )
}

export default Comment