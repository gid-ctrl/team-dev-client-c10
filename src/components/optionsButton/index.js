import { useState } from 'react'
import Menu from '../menu'
import MenuItem from '../menu/menuItem'
import DeleteIcon from '../../assets/icons/deleteIcon'
import CogIcon from '../../assets/icons/cogIcon'
import LocIcon from '../../assets/icons/locIcon'
import { deleted } from '../../service/apiClient'
import './style.css'

function OptionsButton({ showEditModal, showDeleteModal, authorId, currentUserId, postId, setTriggerUpdate}) {
  const [isMenuVisible, setIsMenuVisible] = useState(false)

  const CascadingMenu = () => {
    return (
        <Menu className="profile-circle-menu">
            <MenuItem icon={<LocIcon />} text='Report' />
            {authorId === currentUserId ? 
            (
              <>
                <MenuItem icon={<CogIcon />} text='Edit' onClick={() => {
                  setIsMenuVisible(false)
                  showEditModal()
                }}/>
                <MenuItem icon={<DeleteIcon />} text='Delete' onClick={() => {
                  setIsMenuVisible(false)
                  showDeleteModal()
                }}/>
              </>
            ) : <></>}
            
        </Menu>
    )
  }

  return (
    <div className="edit-icon">
      {isMenuVisible && <CascadingMenu />}
      <p onClick={() => setIsMenuVisible(!isMenuVisible)}>...</p>
    </div>
  )
}



export default OptionsButton