import useModal from "../../hooks/useModal"
import { deleted } from '../../service/apiClient'
import './style.css'


function DeletePostModal({ id, setTriggerUpdate }) {
  const { closeModal } = useModal()

  const handleDelete = (e) => {
      deleted(`posts/${id}`, {id})
      .then(() => {
        setTriggerUpdate(true)
      })

      setTimeout(() => {
        closeModal()
    }, 2000)
  }

  const handleClose = () => {
    closeModal()
  }
  return(
    <>
      <p>Are you sure you want to delete this post?</p>
      <div className='button-container'>
        <button className='cancel-button' onClick={handleClose}>Cancel</button>
        <button className='delete-button' onClick={handleDelete}>Delete Post</button>
      </div>
    </>
  )
}

export default DeletePostModal