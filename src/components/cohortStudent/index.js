import ProfileCircle from "../profileCircle";
import "./style.css";

const CohortStudent = ({ firstName, lastName }) => {
  if (
    firstName.length === 0 ||
    lastName.length === 0 ||
    !firstName ||
    !lastName
  ) {
    return <></>;
  }

  const userInitials = `${firstName[0]}${lastName[0]}`;

  return (
    <div className="user">
      <span>
        <ProfileCircle initials={userInitials} />
      </span>
      <span>{`${firstName} ${lastName}`}</span>
      <div className="more-icon">
        <span className="more-text">...</span>
      </div>
    </div>
  );
};

export default CohortStudent;
