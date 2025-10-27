// const images = ["./assets/pic2.jpg", "/pic1.jpg", "/pic3.jpg"];
const images = [
  new URL("../assets/pic1.jpg", import.meta.url).href,
  new URL("../assets/pic2.jpg", import.meta.url).href,
  new URL("../assets/pic3.jpg", import.meta.url).href,
];

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
