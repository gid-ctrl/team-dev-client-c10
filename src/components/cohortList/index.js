import { useState, useEffect } from "react"
import CohortStudent from "../cohortStudent"
import { get } from "../../service/apiClient"
import { json } from "react-router-dom"



const CohortList = ({currentUser, users}) => {
    const [cohortList, setCohortList] = useState([])

    // cohort/id/users does not have names, so here we are filtering all users to match with
    // current users cohort Id
    
    useEffect(() =>{
        const filteredCohortUsers = users.filter(cohUser => cohUser.cohortId === currentUser.cohortId)
        setCohortList(filteredCohortUsers)
        console.log(cohortList)
    }, [currentUser, users])
    

    

    return (
        <>
        <h4>My Cohort</h4>
        <ul>
            {cohortList.map(cohortStudent => {
                return <CohortStudent
                    key={cohortStudent.id}
                    firstName={cohortStudent.firstName}
                    lastName={cohortStudent.lastName}
                />
            })}
        </ul>
        </>
    )

}

export default CohortList