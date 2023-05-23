import useModal from "../../hooks/useModal"
import Card from "../card"
import Comment from "../comment"
import EditPostModal from "../editPostModal"
import ProfileCircle from "../profileCircle"
import CommentIcon from "../../assets/icons/commentIcon"
import CommentIconFilled from "../../assets/icons/commentIconFilled"
import TextInput from "../form/textInput"
import CommentButton from "../commentButton"
import { useState, useEffect } from "react"
import "./style.css"
import AddCommentModal from "../addCommentModal"
import { get } from "../../service/apiClient"

const Post = ({ name, date, content, likes = 0, id, setTriggerUpdate, currentUserName, currentUserInitials, currentUser}) => {
    const { openModal, setModal } = useModal()
    const [showComments, setShowComments] = useState(false)
    const [postComments, setPostComments] = useState([])
    const [updateComments, setUpdateComments] = useState(false)
    const [showAllComments, setShowAllComments] = useState(false)


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
            setUpdateComments={setUpdateComments}
        />)
        openModal()
        }

    const findComments = async () => {
          const tempArray = [];
          const res = await get(`posts/${id}/comments`);
          const tempComments = res.data.comments;
          await Promise.all(
            tempComments.map(async (comment) => {
              const userId = comment.userId;
              const commentRes = await get(`users/${userId}`);
              const name = `${commentRes.data.user.firstName} ${commentRes.data.user.lastName}`;
              const initials = `${commentRes.data.user.firstName?.[0]}${commentRes.data.user.lastName?.[0]}`;
              const newComment = {
                id: comment.id,
                authorId: comment.userId,
                name: name,
                initials: initials,
                text: comment.content,
              };
              tempArray.push(newComment);
            })
          );
          const sortedArray = tempArray.sort((a,b) => a.id - b.id)
          setPostComments(sortedArray.reverse());
      };
      
      const fetchComments = async () => {
        if (postComments.length === 0 || updateComments) {
            await findComments();
            setShowComments(true)
        } else {
            setShowComments(!showComments)
        }
      };

      useEffect(() => {
        if (updateComments) {
            fetchComments()
            setUpdateComments(false)
        }
      },[updateComments])
      
      const toggleAllComments = () => {
        setShowAllComments(!showAllComments)
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
                            {!showComments && <CommentIcon />}
                            {showComments && <CommentIconFilled />}
                            <p>Comment</p>
                        </button>
                    </div>

                    <p>{!likes && 'Be the first to like this'}</p>
                    
                </section>

                <section>
                    {postComments.length < 3 && showComments && (
                        <>
                            {postComments.map(comment => <Comment
                                key={comment.id}
                                comment={comment}
                                currentUser={currentUser} />)}
                        </>
                    )}
                    {postComments.length > 3 && showComments && !showAllComments && (
                        <>
                            <p onClick={toggleAllComments}>See previous comments</p>
                            {postComments.slice(0,3).map(comment => <Comment
                                key={comment.id}
                                comment={comment}
                                currentUser={currentUser} />)}
                        </>
                    )}
                    {postComments.length > 3 && showComments && showAllComments && (
                        <>
                            <p onClick={toggleAllComments}>Hide previous comments</p>
                            {postComments.map(comment => <Comment
                                key={comment.id}
                                comment={comment}
                                currentUser={currentUser} />)}
                        </>
                    )}
                        
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