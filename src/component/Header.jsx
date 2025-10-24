import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  async function handleSubmit(e) {
    const term = searchTerm.trim();
    const categories = ["best-seller", "Classic", "Children"];
    e.preventDefault();
    if (categories.includes(term)) {
      navigate(`/category/${term}`);
      return;
    }
    const { data, error } = await supabase
      .from("books")
      .select("id,title,author_name")
      .or(`title.ilike.%${term}%,author_name.ilike.%${term}%`);
    if (data && data.length > 0) {
      navigate(`/book/${data[0].id}`);
    } else {
      alert("Book not found");
    }
  }
  async function handleLogOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error.message);
    } else {
      alert("You Log Out");
      navigate("/");
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
        <button onClick={() => navigate("/Auth")}>
          <i className="bi bi-person"></i>
        </button>

        <button onClick={() => navigate("/favarite")}>
          <i className="bi bi-heart"></i>
        </button>
        <button onClick={() => navigate("/shoppingCart")}>
          <i className="bi bi-cart3"></i>
        </button>
        <button onClick={handleLogOut}>
          <i className="bi bi-box-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}

export default Header;
