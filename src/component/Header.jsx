import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    const term = searchTerm.trim();
    const categories = ["best-seller", "Classic", "Children"];
    e.preventDefault();
    if (categories.includes(term)) {
      navigate(`/category/${term}`);
      return;
    }
  }
  return (
    <div className="header">
      <div className="logo">
        <img src="/digital-library.png" alt="logo" />
      </div>

      <form className="search" onSubmit={handleSubmit}>
        <i className="bi bi-search" type="submit"></i>

        <input
          type="text"
          placeholder="Search "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

      <div className="icons">
        <button>
          <i className="bi bi-person"></i>
        </button>
        <button>
          <i className="bi bi-heart"></i>
        </button>
        <button>
          <i className="bi bi-cart3"></i>
        </button>
      </div>
    </div>
  );
}

export default Header;
