import ProfileCircle from "../../components/profileCircle"
import { useState } from "react"
export default function Username ({firstName, lastName}) {
    // const [initials, setInitials] = useState('')
    const firstLetters = firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase()


    return (
        <>
            <section className="post-details user-display">
              <ProfileCircle initials={firstLetters} />
              <p>{firstName} {lastName}</p>
              <div className="edit-icon">
                <p>...</p>
              </div>
            </section>
        </>
    )
}