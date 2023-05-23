import { useState, useEffect } from "react"
import CohortStudent from "../cohortStudent"
import { get } from "../../service/apiClient"
import { json } from "react-router-dom"



const CohortList = () => {
    // we'll need props or something else to get the current user's cohort id
    const [cohortList, setCohortList] = useState([])

    // set up fetch request to get all students in current user's cohort
    useEffect(() => {
        get(`cohorts/1/users`)
        .then(res => res.json())
        .then(data => setCohortList(data.users))
        console.log(cohortList)
        }, [cohortList])
    

    // update state to the list of students

    return (
        <>
        <h4>My Cohort</h4>
        <ul>
            {cohortList.map(cohortStudent => {
                return <CohortStudent
                    key={cohortStudent.id}
                    name={`${cohortStudent.firstName} ${cohortStudent.lastName}`}
                />
            })}
        </ul>
        </>
    )

}

export default CohortList