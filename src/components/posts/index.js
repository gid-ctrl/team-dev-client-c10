import { useEffect, useState } from "react";
import Post from "../post";
import { getPosts } from "../../service/apiClient";

const Posts = ({triggerUpdate, setTriggerUpdate, currentUser}) => {
    const [posts, setPosts] = useState([])
   
    useEffect(() => {
        if (triggerUpdate) {
            getPosts().then(setPosts)
            setTriggerUpdate(false)
        } else {
            getPosts().then(setPosts)
        }
    }, [triggerUpdate])

    return (
        <>
            {posts.map(post => {
                    return <Post
                        key={post.id}
                        name={`${post.author.firstName} ${post.author.lastName}`}
                        date={post.createdAt}
                        content={post.content}
                        comments={post.comments}
                        id={post.id}
                        setTriggerUpdate={setTriggerUpdate}
                        currentUserName={`${currentUser.firstName} ${currentUser.lastName}`}
                    />
            })}
        </>
    )
}

export default Posts