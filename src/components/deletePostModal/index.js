import useModal from "../../hooks/useModal"
import { deleted } from '../../service/apiClient'
import './style.css'


function DeletePostModal({ id, setTriggerUpdate }) {
  const { closeModal } = useModal()

  const handleOnClick = (e) => {
    const value = e.target.innerText
    if (value === 'Delete Post') {
      deleted(`posts/${id}`)
      .then(() => {
        setTriggerUpdate(true)
      })

      setTimeout(() => {
        closeModal()
    }, 2000)
    } else {
      closeModal()
    }
  }
  return(
    <>
      <p>Are you sure you want to delete this post?</p>
      <div className='button-container'>
        <button className='cancel-button' onClick={handleOnClick}>Cancel</button>
        <button className='delete-button' onClick={handleOnClick}>Delete Post</button>
      </div>
    </>
  )
}

export default DeletePostModal