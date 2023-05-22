import Like from "../../assets/icons/like"
import LikeRed from "../../assets/icons/likeRed"
import useModal from "../../hooks/useModal"
import Card from "../card"
import Comment from "../comment"
import EditPostModal from "../editPostModal"
import ProfileCircle from "../profileCircle"
import "./style.css"
import {useState} from 'react' 

const Post = ({ name, date, content, comments = [], likes = 0, id, setTriggerUpdate, currentUserName}) => {
    const { openModal, setModal } = useModal()

    const userInitials = name.match(/\b(\w)/g)

    const [isHovered, setIsHovered] = useState(false);
    const [changeLike, setChangeLike] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    const handleClick = () => {
        setChangeLike(true)
    }

    const showModal = () => {
        setModal('Edit post', 
        <EditPostModal 
            id={id} 
            content={content} 
            setTriggerUpdate={setTriggerUpdate}
        />)
        openModal()
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
                    {name === currentUserName &&
                        <div className="edit-icon">
                            <p onClick={showModal}>...</p>
                        </div>
                    }
                </section>

                <section className="post-content">
                    <p>{content}</p>
                </section>

                <section className={`post-interactions-container border-top ${comments.length ? 'border-bottom' : null}`}>
                <button className="post-interactions-button like"
                 onMouseEnter={handleMouseEnter}
                 onMouseLeave={handleMouseLeave}
                 onClick={handleClick}>
                {isHovered ? <LikeRed /> : <Like />}
                            <p>Like</p>
                </button>

                <button className="post-interactions-button">
                            <Like />
                            <p>Like</p>
                </button>

                    <p>{!likes && 'Be the first to like this'}</p>
                    
                </section>

                <section>
                    {comments.map(comment => <Comment key={comment.id} name={comment.name} content={comment.content} />)}
                </section>
            </article>
        </Card>
    )
}

export default Post