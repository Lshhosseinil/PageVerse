import styles from "./Dashboard.module.css";
import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import Chart from "./Chart";
export default function Dashboard() {
  const [stats, setStats] = useState({
    books: 0,
    users: 0,
    favarites: 0,
    cart: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      const books = await supabase.from("books").select("*");
      const users = await supabase.from("profiles").select("*");
      const favarites = await supabase.from("favarites").select("*");
      const cart = await supabase.from("shopping-cart").select("*");
      setStats({
        books: books.data.length,
        users: users.data.length,
        favorites: favarites.data.length,
        cart: cart.data.length,
      });
    }
    fetchStats();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      <div className={styles.stats}>
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className={styles.card}>
            <h3>{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
            <p>{value}</p>
          </div>
        ))}
      </div>
      <Chart />
    </div>
  );
}
