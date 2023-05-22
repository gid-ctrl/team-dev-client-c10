import ProfileCircle from "../../components/profileCircle";

export default function Teacher({ bio, firstName, lastName }) {
  const firstLetters =
    firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  return (
    <>
      <section className="post-details ">
        <ProfileCircle newColor={randomColor} initials={firstLetters} />

        <div className="teacher-info">
          <span>
            {firstName} {lastName}
          </span>
          <p>{bio}</p>
        </div>

        <div className="edit-icon">
          <p>...</p>
        </div>
      </section>
    </>
  );
}
