const images = ["/pic1.jpg", "/pic2.jpg", "/pic3.jpg"];

export default function Sliders({
  current,
  onGoToSlide,
  onHandlePrev,
  onHandleNext,
  id,
}) {
  return (
    <div className="slider" id={id}>
      <button className="prev" onClick={onHandlePrev}>
        <i className="bi bi-chevron-compact-left"></i>
      </button>
      <img src={images[current]} alt={current + 1} />
      <button className="next" onClick={onHandleNext}>
        <i className="bi bi-chevron-compact-right"></i>
      </button>
      <div className="dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === current ? "active" : ""}`}
            data-slide={i}
            onClick={() => onGoToSlide(i)}
          ></button>
        ))}
      </div>
    </div>
  );
}
