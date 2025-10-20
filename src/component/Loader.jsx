export default function Loader({ top }) {
  const loaderStyle = {
    marginTop: `${top}px`,
  };

  return (
    <p className="loader" style={loaderStyle}>
      Loading...
    </p>
  );
}
