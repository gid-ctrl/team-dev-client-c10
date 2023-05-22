import ProfileCircle from "../../components/profileCircle";

export default function Students({ firstName, lastName }) {
  const firstLetters =
    firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();

  return (
    <>
      <section className="post-details user-display">
        <ProfileCircle initials={firstLetters} />
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
