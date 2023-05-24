import ProfileCircle from "../../components/profileCircle";
import  { Link } from "react-router-dom"

export default function Students({ firstName, lastName, id }) {
  const firstLetters = firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  return (
    <>
      <section className="post-details user-display">
        <ProfileCircle newColor={randomColor} initials={firstLetters} />
        <Link to={`/profile/${id}`} style={{ textDecoration: 'none'}}>
        <p>
          {firstName} {lastName} 
        </p>
        </Link>
        <div className="edit-icon">
          <p>...</p>
        </div>
      </section>
    </>
  );
}
