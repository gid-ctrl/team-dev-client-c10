import { useEffect, useState } from "react";
import Post from "../post";
import { getPosts } from "../../service/apiClient";

const Posts = ({triggerUpdate, setTriggerUpdate, currentUserName, currentUserInitials, currentUser}) => {
    const [posts, setPosts] = useState([])
       
    useEffect(() => {
        if (triggerUpdate) {
            getPosts().then(setPosts)
            setTriggerUpdate(false)
        } else {
            getPosts().then(setPosts)
        }
    }, [setTriggerUpdate, triggerUpdate])

    return (
        <>
            {
            posts.sort( (a, b) => {
                return a.createdAt.localeCompare(b.createdAt);
            })
            .slice(0)
            .reverse()
            .map(post => {
                    return <Post
                        key={post.id}
                        name={`${post.author.firstName} ${post.author.lastName}`}
                        date={post.createdAt}
                        content={post.content}
                        id={post.id}
                        liked={post.likedPosts}
                        setTriggerUpdate={setTriggerUpdate}
                        currentUserName={currentUserName}
                        currentUserInitials={currentUserInitials}
                        currentUser={currentUser}
                        currentUserId={currentUser.id}
                        authorId={post.author.id}
                    />
            })}
        </>
    )
}

export default Posts