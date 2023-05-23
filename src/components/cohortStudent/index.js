import ProfileCircle from "../profileCircle"


const CohortStudent = ({name}) => {

    const userInitials = name.match(/\b(\w)/g)

    return(
        <>
            <span><ProfileCircle initials={userInitials} /></span>
            <span>`${name}</span>

        </>
    )

}

export default CohortStudent