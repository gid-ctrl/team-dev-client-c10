import ProfileCircle from "../../components/profileCircle"
export default function Teacher ({ bio, firstName, lastName}) {
    const firstLetters = firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase()
    return (
        <>
            <section className="post-details ">
              <ProfileCircle initials={firstLetters} />

              <div className="teacher-info">
                <span>{firstName} {lastName}</span>
                <p>{bio}</p>
              </div>

              <div className="edit-icon">
                <p>...</p>
              </div>
            </section>
        </>
    )
}