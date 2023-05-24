import Menu from "../menu"
import MenuItem from "../menu/menuItem"
import ProfileIcon from "../../assets/icons/profileIcon"
import AddIcon from "../../assets/icons/addIcon"
import CohortIcon from "../../assets/icons/cohortIcon"
import SquareBracketsIcon from "../../assets/icons/squareBracketsIcon"
import CohortIconFill from "../../assets/icons/cohortIcon-fill"
import MonitorIcon from "../../assets/icons/monitorIcon"
import DeleteIcon from "../../assets/icons/deleteIcon"
import './style.css'


const CascadingMenu = () => {
    return (
        <Menu className="profile-circle-menu">
            <MenuItem icon={<ProfileIcon />} text='Profile' />
            <MenuItem icon={<AddIcon />} text='Add note' />

            <MenuItem icon={<CohortIcon />} text='Move to cohort'>
                <MenuItem icon={<SquareBracketsIcon />} text='Software Development'>
                    <MenuItem icon={<CohortIconFill />} text='Cohort 1' />
                    <MenuItem icon={<CohortIconFill />} text='Cohort 2' />
                    <MenuItem icon={<CohortIconFill />} text='Cohort 3' />
                </MenuItem>

                <MenuItem icon={<MonitorIcon />} text='Frontend Development'>
                    <MenuItem icon={<CohortIconFill />} text='Cohort 1' />
                    <MenuItem icon={<CohortIconFill />} text='Cohort 2' />
                    <MenuItem icon={<CohortIconFill />} text='Cohort 3' />
                </MenuItem>
            
            </MenuItem>

            <MenuItem icon={<DeleteIcon />} text='Delete student' />
        </Menu>
    )
}

export default CascadingMenu