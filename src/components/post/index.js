import React, { useState } from "react";
import Like from "../../assets/icons/like";
import LikeRed from "../../assets/icons/likeRed";
import useModal from "../../hooks/useModal";
import Card from "../card";
import Comment from "../comment";
import EditPostModal from "../editPostModal";
import ProfileCircle from "../profileCircle";
import "./style.css";

const Post = ({
  name,
  date,
  content,
  comments = [],
  likes = 0,
  id,
  setTriggerUpdate,
  currentUserName,
}) => {
  const { openModal, setModal } = useModal();

  const userInitials = name.match(/\b(\w)/g);
  const [isLiked, setIsLiked] = useState(false);
  const [like, setLike] = useState(likes);

    const showModal = () => {
        setModal('Edit post', 
        <EditPostModal 
            id={id} 
            content={content} 
            setTriggerUpdate={setTriggerUpdate}
            name={name}
            userInitials={userInitials}
        />)
        openModal()
    }

  const handleClick = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
    setLike((prevLike) => (isLiked ? prevLike - 1 : prevLike + 1));
  };

  let likeIcon = null;
  if (isLiked) {
    likeIcon = <LikeRed />;
  } else {
    likeIcon = <Like />;
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
          {name === currentUserName && (
            <div className="edit-icon">
              <p onClick={showModal}>...</p>
            </div>
          )}
        </section>

        <section className="post-content">
          <p>{content}</p>
        </section>

        <section
          className={`post-interactions-container border-top ${
            comments.length ? "border-bottom" : null
          }`}
        >
          <button className="post-interactions-button like" onClick={handleClick}>
            {likeIcon}
            <p>Like</p>
          </button>

          <button className="post-interactions-button">
            <Like />
            <p>Comment</p>
          </button>

          <p>{(!like && "Be the first to like this") || like} </p>
        </section>

        <section>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              name={comment.name}
              content={comment.content}
            />
          ))}
        </section>
      </article>
    </Card>
  );
};

export default Post;
