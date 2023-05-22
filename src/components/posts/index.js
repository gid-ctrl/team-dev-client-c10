import { useEffect, useState } from "react";
import Post from "../post";
import { getPosts } from "../../service/apiClient";

const Posts = ({triggerUpdate, setTriggerUpdate, currentUserName, currentUserInitials}) => {
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
                        id={post.id}
                        setTriggerUpdate={setTriggerUpdate}
                        currentUserName={currentUserName}
                        currentUserInitials={currentUserInitials}
                    />
            })}
        </>
    )
}

export default Posts