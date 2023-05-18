import { useState, useEffect } from "react"
import { json } from "react-router-dom"



const CohortList = () => {
    // we'll need props or something else to get the current user's cohort id
    const [cohortList, setCohortList] = useState([])

    // set up fetch request to get all students in current user's cohort
    useEffect(() => {
    fetch('https://localhost:4000/cohorts/1/users', {
        headers: {
            
        }
    })
    // hardcoded for now until I can figure out how to get the current users cohort id
        .then(res => res.json())
        .then(data => {
            setCohortList(data.users)

        })}, [])
    

    // update state to the list of students

    return (
        <>
        <h4>My Cohort</h4>
        <ul>
            {cohortList.map(cohortStudent => {
                return <cohortStudent
                    key={cohortStudent.id}
                    name={`${cohortStudent.firstName} ${cohortStudent.lastName}`}
                />
            })}
        </ul>
        </>
    )

}

export default CohortList