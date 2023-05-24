import { useState } from 'react'
import Menu from '../menu'
import MenuItem from '../menu/menuItem'
import DeleteIcon from '../../assets/icons/deleteIcon'
import CogIcon from '../../assets/icons/cogIcon'
import LocIcon from '../../assets/icons/locIcon'
import './style.css'

function OptionsButton({ showModal }) {
  const [isMenuVisible, setIsMenuVisible] = useState(false)

  const CascadingMenu = () => {
    return (
        <Menu className="profile-circle-menu">
            <MenuItem icon={<LocIcon />} text='Report' />
            <MenuItem icon={<CogIcon />} text='Edit' onClick={() => {
              setIsMenuVisible(false)
              showModal()
            }}/>
            <MenuItem icon={<DeleteIcon />} text='Delete' />
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