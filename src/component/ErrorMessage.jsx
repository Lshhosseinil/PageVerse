export default function ErrorMessage({ message, top }) {
  const errorStyle = {
    marginTop: `${top}px`,
  };

  return (
    <p className="error" style={errorStyle}>
      {/* <span>⛔</span> */}
      {message}
    </p>
  );
}
