import { useState } from "react"
import { post } from "../../service/apiClient"
import useModal from "../../hooks/useModal"
import './style.css'
import Button from '../button'

const AddCommentModal = ({setTriggerUpdate, currentUserName, currentUserInitials, id, setUpdateComments}) => {
    // Use the useModal hook to get the closeModal function so we can close the modal on user interaction
    const { closeModal } = useModal()

    const [message, setMessage] = useState(null)
    const [text, setText] = useState('')

    const onChange = (e) => {
        setText(e.target.value)
    }

    const onSubmit = (e) => {
        setMessage('Submit button was clicked! Closing modal in 2 seconds...')
        post(`posts/${id}/comments`, {"content": text})
        .then(() => {
            setTriggerUpdate(true)
            setUpdateComments(true)
        })

        setTimeout(() => {
            setMessage(null)
            closeModal()
        }, 2000)
    }


    return (
        <>
            <section className="create-post-user-details">
                <div className="profile-icon"><p>{currentUserInitials}</p></div>
                <div className="post-user-name"><p>{currentUserName}</p></div>
            </section>

            <section>
                <textarea onChange={onChange} value={text} placeholder="What's your comment?"></textarea>
            </section>

            <section className="create-post-actions">
                <Button
                    onClick={onSubmit}
                    text='Post Comment'
                    classes={`${text.length ? 'blue' : 'offwhite' } width-full`}
                    disabled={!text.length}
                />
            </section>

            {message && <p>{message}</p>}
        </>
    )
}
export default AddCommentModal