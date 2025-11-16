import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import logo from "../assets/digital-library.png";
import supabase from "../supabaseClient";

export default function NavBar() {
  const [hide, setHide] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function checkRole() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        if (data?.role === "admin") {
          setIsAdmin(true);
        }
      }
    }

    checkRole();
  }, []);

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
    <>
      <nav className={`${styles.navbar} ${hide ? styles.hide : ""}`}>
        <div className={styles.hamburger} onClick={() => setMobileOpen(true)}>
          <p>☰</p>
          <img src={logo} alt="logo" className={styles.logo} />
        </div>
        <ul className={styles.menu}>
          <li className={styles.item}>
            <Link to="/" className={styles.link}>
              PageVerse
            </Link>
          </li>
          <li className={styles.item}>
            <Link to="/category/best-seller" className={styles.link}>
              Best Seller
            </Link>
          </li>
          <li className={styles.item}>
            <Link to="/category/Children" className={styles.link}>
              Children
            </Link>
          </li>
          <li className={styles.item}>
            <Link to="/category/Classic" className={styles.link}>
              Classic
            </Link>
          </li>
          <li className={styles.item}>
            <span>CheapBooks</span>
            <div className={styles.submenu}>
              <Link to="/cheap-books/classic">Under $100 - Classic</Link>
              <Link to="/cheap-books/children">Under $100 - Children</Link>
              <Link to="/cheap-books/best-seller">
                Under $100 - Best Seller
              </Link>
            </div>
          </li>
          <li className={styles.item}>
            <span>ExpensiveBooks</span>
            <div className={styles.submenu}>
              <Link to="/expensive-books/Classic">Over $100 - Classic</Link>
              <Link to="/expensive-books/Children">Over $100 - Children</Link>
              <Link to="/expensive-books/best-seller">
                Over $100 - Best Seller
              </Link>
            </div>
          </li>
          {isAdmin && (
            <li className={styles.item}>
              <Link to="/admin" className={styles.link}>
                Admin Panel
              </Link>
            </li>
          )}
        </ul>
      </nav>

      <div
        className={`${styles.fullscreenMenu} ${mobileOpen ? styles.show : ""}`}
      >
        <div className={styles.close} onClick={() => setMobileOpen(false)}>
          <p>×</p>
          <img src={logo} alt="logo" className={styles.logo} />
        </div>
        <div className={styles.nav}>
          <ul className={styles.menufullscreen}>
            <li className={styles.itemfullscreen}>
              <Link
                to="/category/best-seller"
                onClick={() => setMobileOpen(false)}
                className={styles.link}
              >
                Best Seller
              </Link>
            </li>
            <li className={styles.itemfullscreen}>
              <Link
                to="/category/Children"
                onClick={() => setMobileOpen(false)}
                className={styles.link}
              >
                Children
              </Link>
            </li>
            <li className={styles.itemfullscreen}>
              <Link
                to="/category/Classic"
                onClick={() => setMobileOpen(false)}
                className={styles.link}
              >
                Classic
              </Link>
            </li>
            <li className={styles.itemfullscreen}>
              <span>CheapBooks</span>
              <div className={styles.submenufullscreen}>
                <Link
                  to="/cheap-books/classic"
                  onClick={() => setMobileOpen(false)}
                >
                  Under $100 - Classic
                </Link>
                <Link
                  to="/cheap-books/children"
                  onClick={() => setMobileOpen(false)}
                >
                  Under $100 - Children
                </Link>
                <Link
                  to="/cheap-books/best-seller"
                  onClick={() => setMobileOpen(false)}
                >
                  Under $100 - Best Seller
                </Link>
              </div>
            </li>
            <li className={styles.itemfullscreen}>
              <span>ExpensiveBooks</span>
              <div className={styles.submenufullscreen}>
                <Link
                  to="/expensive-books/Classic"
                  onClick={() => setMobileOpen(false)}
                >
                  Over $100 - Classic
                </Link>
                <Link
                  to="/expensive-books/Children"
                  onClick={() => setMobileOpen(false)}
                >
                  Over $100 - Children
                </Link>
                <Link
                  to="/expensive-books/best-seller"
                  onClick={() => setMobileOpen(false)}
                >
                  Over $100 - Best Seller
                </Link>
              </div>
            </li>
            {isAdmin && (
              <li className={styles.itemfullscreen}>
                <Link
                  to="/admin"
                  onClick={() => setMobileOpen(false)}
                  className={styles.link}
                >
                  Admin Panel
                </Link>
              </li>
            )}
            <li>
              <button
                onClick={handleLogOut}
                style={{
                  padding: "15px",
                  border: "none",
                  backgroundColor: "#3498DB",
                  color: "#fff",
                  borderRadius: "5px",
                  fontSize: "15px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
