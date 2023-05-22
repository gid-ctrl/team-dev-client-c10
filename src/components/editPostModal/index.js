import { useState } from "react"
import useModal from "../../hooks/useModal"
import './style.css'
import Button from '../button'
import { patch } from '../../service/apiClient'



// passing current post ID and message content through props
const EditPostModal = ({ id, content, setTriggerUpdate, name, userInitials}) => {

    const { closeModal } = useModal()
    const [message, setMessage] = useState(null)
    const [text, setText] = useState(content)

    const onChange = (e) => {
        setText(e.target.value)
    }

    const onSubmit = () => {
   
        patch(`posts/${id}`, {
            'content': text
        }).then(() => {
            setTriggerUpdate(true)
        })


        setMessage('Submit button was clicked! Closing modal in 2 seconds...')

        setTimeout(() => {
            setMessage(null)
            closeModal()
        }, 2000)
    }


    return (
        <>
            <section className="create-post-user-details">
                <div className="profile-icon"><p>{userInitials}</p></div>
                <div className="post-user-name"><p>{name}</p></div>
            </section>

            <section>
                <textarea onChange={onChange} value={text} placeholder={content}></textarea>
            </section>

            <section className="create-post-actions">
                <Button
                    onClick={onSubmit}
                    text='Post'
                    classes={`${text.length ? 'blue' : 'offwhite' } width-full`}
                    disabled={!text.length}
                />
            </section>

            {message && <p>{message}</p>}
        </>
    )
}

export default EditPostModal