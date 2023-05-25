import React, { useEffect, useState } from "react";
import Like from "../../assets/icons/like";
import LikeRed from "../../assets/icons/likeRed";
import useModal from "../../hooks/useModal";
import Card from "../card";
import Comment from "../comment";
import EditPostModal from "../editPostModal";
import DeletePostModal from "../deletePostModal"
import ProfileCircle from "../profileCircle";
import OptionsButton from "../optionsButton";
import CommentIcon from "../../assets/icons/commentIcon"
import CommentIconFilled from "../../assets/icons/commentIconFilled"
import TextInput from "../form/textInput"
import CommentButton from "../commentButton"
import "./style.css";
import { post, deleted } from "../../service/apiClient";
import AddCommentModal from "../addCommentModal"
import { get } from "../../service/apiClient"



const Post = ({
  name, 
  date, 
  content, 
  comments=[], 
  liked, 
  id, 
  setTriggerUpdate, 
  currentUserName, 
  currentUserInitials, 
  currentUser, 
  currentUserId, 
  authorId
}) => {

  const { openModal, setModal } = useModal()
  const [showComments, setShowComments] = useState(false)
  const [postComments, setPostComments] = useState([])
  const [updateComments, setUpdateComments] = useState(false)
  const [showAllComments, setShowAllComments] = useState(false)
  const [firstClick, setFirstClick] = useState(true)


  const userInitials = name.match(/\b(\w)/g);
  const [isLiked, setIsLiked] = useState(false);
  const [like, setLike] = useState(liked.length);
    
  useEffect(() => {
    if (!firstClick) {
        if (postComments.length !== 0) {
            setShowComments(true)
        } else {
            setShowComments(false)
        }
    }
  }, [postComments])

  useEffect(() => {
    if (updateComments) {
        fetchComments()
        setUpdateComments(false)
    }
  },[updateComments])

  useEffect(() => {
    const isLiked = liked.some(postlikes => postlikes.userId === currentUserId)
    setIsLiked(isLiked)
    }, [currentUserId, liked])

  const showEditModal = () => {
    setModal(
      'Edit post',
      <EditPostModal
        id={id}
        content={content}
        setTriggerUpdate={setTriggerUpdate}
        name={name}
        userInitials={userInitials}
      />
    );
    openModal();
  };

  const showDeleteModal = () => {
    setModal(
      'Delete post',
      <DeletePostModal
        id={id}
        setTriggerUpdate={setTriggerUpdate}
      />
    );
    openModal();
  };

  useEffect(() => {
    const isLiked = liked.some(postlikes => postlikes.userId === currentUserId)
    setIsLiked(isLiked)
    }, [currentUserId, liked])
    
  const handleClick = (event) => {
    if(event.detail > 1){
      setLike((prevLike) => prevLike)
      return
		}
   
    if (isLiked) {
        deleted(`posts/${id}/like`, {id}).then(() => {
        setIsLiked(false);
        setLike((prevLike) => prevLike - 1);
      });
    } else {
        post(`posts/${id}/like`, {id}).then(() => {
        setIsLiked(true);
        setLike((prevLike) => prevLike + 1);
      });
    }
  };



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
            tempComments.map(async (comment) => {
              const userId = comment.userId;
              const name = `${comment.user.profile.firstName} ${comment.user.profile.lastName}`;
              const initials = `${comment.user.profile.firstName?.[0]}${comment.user.profile.lastName?.[0]}`;
              const newComment = {
                id: comment.id,
                updateTime: comment.updatedAt,
                authorId: comment.userId,
                name: name,
                initials: initials,
                text: comment.content,
              };
              tempArray.push(newComment);
            })
          const sortedArray = tempArray.sort((a,b) => a.id - b.id)
          setPostComments(sortedArray.reverse());
      };

      const fetchComments = () => {
        if (updateComments || firstClick) {
            setFirstClick(false)
            setUpdateComments(false)
            findComments()
        } else if (postComments.length !== 0) {
            setShowComments(!showComments)
        }
      };
      
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
            <small>{(new Date(Date.parse(date))).toLocaleDateString('en-GB')} at {date.slice(11, 16)}</small>
          </div>
          <OptionsButton 
            showEditModal={showEditModal} 
            showDeleteModal={showDeleteModal} 
            authorId={authorId} 
            currentUserId={currentUserId} 
            postId={id} 
            setTriggerUpdate={setTriggerUpdate}/>
        </section>

        <section className="post-content">
          <p>{content}</p>
        </section>

                <section className={`post-interactions-container border-top ${postComments.length ? 'border-bottom' : null}`}>
                    <button className="post-interactions" onClick={handleClick}>
                      {!isLiked && <Like />}
                      {isLiked && <LikeRed/>}
                      <p>Like</p>
                    </button>
                      <button className="post-interactions" onClick={fetchComments} >
                          {!showComments && <CommentIcon />}
                          {showComments && <CommentIconFilled />}
                          <p>Comment</p>
                      </button>
          <p>{(!like && "Be the first to like this") || like} </p>
        </section>

                <section>
                    {postComments.length <= 3 && showComments && (
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