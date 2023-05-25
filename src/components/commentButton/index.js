import AddCommentIcon from "../../assets/icons/addCommentIcon";

const CommentButton = ({
  text,
  onClick,
  type = "button",
  classes,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
    >
      {text}
      <AddCommentIcon />
    </button>
  );
};

export default CommentButton;