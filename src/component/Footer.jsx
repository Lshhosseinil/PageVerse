export default function Footer({ onScrool, onClassic, onChildren, onHome }) {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2 className="footer-logo">📚PageVerse</h2>
          <p style={{ lineHeight: 1.8 }}>
            Discover your next favorite book with 📚PageVerse — your go-to
            library for timeless classics and bestsellers.
          </p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <button onClick={onHome}>Home</button>
            </li>
            <li>
              <button onClick={onScrool}>BestSeller</button>
            </li>
            <li>
              <button onClick={onClassic}>Classic</button>
            </li>
            <li>
              <button onClick={onChildren}>Children</button>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p style={{ marginTop: "10px" }}>📍 Shiraz, Iran</p>
          <p style={{ marginTop: "10px" }}>+98 912 000 0000</p>
          <p style={{ marginTop: "10px" }}>info@PageVerse.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()}
        📚PageVerse. All rights reserved
      </div>
    </footer>
  );
}
