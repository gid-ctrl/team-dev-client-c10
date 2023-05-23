import ProfileCircle from "../../components/profileCircle";

export default function Students({ firstName, lastName }) {
  const firstLetters = firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  return (
    <>
      <section className="post-details user-display">
        <ProfileCircle newColor={randomColor} initials={firstLetters} />
        <p>
          {firstName} {lastName}
        </p>
        <div className="edit-icon">
          <p>...</p>
        </div>
      </section>
    </>
  );
}
