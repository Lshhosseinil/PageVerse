function Header() {
  return (
    <div className="header">
      <div className="logo">
        <img src="/digital-library.png" alt="logo" />
      </div>

      <form className="search">
        <i className="bi bi-search"></i>
        <input type="text" placeholder="Search " />
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
