import useModal from "../../hooks/useModal"
import Card from "../card"
import Comment from "../comment"
import EditPostModal from "../editPostModal"
import ProfileCircle from "../profileCircle"
import CommentIcon from "../../assets/icons/commentIcon"
import TextInput from "../form/textInput"
import CommentButton from "../commentButton"
import { useState, useEffect } from "react"
import "./style.css"
import AddCommentModal from "../addCommentModal"
import { get } from "../../service/apiClient"

const Post = ({ name, date, content, likes = 0, id, setTriggerUpdate, currentUserName, currentUserInitials}) => {
    const { openModal, setModal } = useModal()
    const [comments, setComments] = useState([])
    const [showComments, setShowComments] = useState(false)
    const [postComments, setPostComments] = useState([])


    const userInitials = name.match(/\b(\w)/g)
    
    const showModal = () => {
        setModal('Edit post', 
        <EditPostModal 
            id={id} 
            content={content} 
            setTriggerUpdate={setTriggerUpdate}
        />)
        openModal()
    }

    const showCommentModal = () => {
        setModal('Add a comment...', 
        <AddCommentModal 
            setTriggerUpdate = {setTriggerUpdate}
            id={id}
            currentUserName={currentUserName}
            currentUserInitials={currentUserInitials}
        />)
        openModal()
        }

    const findComments = async (Id, userId, text, tempArray) => {
        const res = await get(`users/${userId}`)
        const name = `${res.data.user.firstName} ${res.data.user.lastName}`
        const initials = `${res.data.user.firstName?.[0]}${res.data.user.lastName?.[0]}`
        const newComment = {
            "id": Id,
            "name": name,
            "initials": initials,
            "text": text
        }
        tempArray.push(newComment)
    }

    const fetchComments = async () => {
        if (postComments.length === 0) {
            const tempArray = []
            const res = await get(`posts/${id}/comments`)
            const tempComments = res.data.comments
            await Promise.all(tempComments.map(async (comment) => {
                const text = comment.content;
                await findComments(comment.id, comment.userId, text, tempArray);
              }));
            setPostComments(tempArray.reverse())
        }
        setShowComments(!showComments)
    }
    
    return (
        <Card>
            <article className="post">
                <section className="post-details">
                    <ProfileCircle initials={userInitials} />

                    <div className="post-user-name">
                        <p>{name}</p>
                        <small>{date}</small>
                    </div>
                    
                    <div className="edit-icon">
                        <p onClick={showModal}>...</p>
                    </div>
                </section>

                <section className="post-content">
                    <p>{content}</p>
                </section>

                <section className={`post-interactions-container border-top ${postComments.length ? 'border-bottom' : null}`}>
                    <div className="post-interactions">
                        <div>Like</div>
                        <button className="post-interactions-button" onClick={fetchComments} >
                            <CommentIcon />
                            <p>Comment</p>
                        </button>
                    </div>

                    <p>{!likes && 'Be the first to like this'}</p>
                    
                </section>

                <section>
                    {showComments && postComments.map(comment => <Comment
                        key={comment.id}
                        comment={comment} />)}
                </section>

                <section className="create-post-input">
                    <div className="profile-icon">
                        <p>{currentUserInitials}</p>
                    </div>
                    <CommentButton text="Add a comment..." onClick={showCommentModal} />
                </section>

            </article>
        </Card>
    )
}

export default Post