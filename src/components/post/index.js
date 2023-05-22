import useModal from "../../hooks/useModal"
import Card from "../card"
import Comment from "../comment"
import EditPostModal from "../editPostModal"
import ProfileCircle from "../profileCircle"
import CommentIcon from "../../assets/icons/commentIcon"
import TextInput from "../form/textInput"
import CommentButton from "../commentButton"
import { useState } from "react"
import "./style.css"
import AddCommentModal from "../addCommentModal"
import { get } from "../../service/apiClient"

const Post = ({ name, date, content, likes = 0, id, setTriggerUpdate, currentUserName, currentUserInitials}) => {
    const { openModal, setModal } = useModal()
    const [comments, setComments] = useState([])

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

    const fetchComments = () => {
        const fetchData = async () => {
            const res = await get(`posts/${id}/comments`)
            setComments(res.data.comments)
        }
        if (comments.length === 0) {
            fetchData()
        } else {
            setComments([])
        }
    }

    const testFunction = () => {
        console.log(comments)
        console.log(comments[0].userId)
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

                <section className={`post-interactions-container border-top ${comments.length ? 'border-bottom' : null}`}>
                    <div className="post-interactions">
                        <div onClick={testFunction} >Like</div>
                        <button className="post-interactions-button" onClick={fetchComments} >
                            <CommentIcon />
                            <p>Comment</p>
                        </button>
                    </div>

                    <p>{!likes && 'Be the first to like this'}</p>
                    
                </section>

                <section>
                    {comments.map(comment => <Comment
                        key={comment.id}
                        comment={comment} />)}
                </section>

                <section className={`create-post-input`}>
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