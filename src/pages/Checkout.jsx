import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import styles from "./Checkout.module.css";

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCart() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return alert("Please login first");

      const { data, error } = await supabase
        .from("shopping-cart")
        .select("book_id, quantity, books(title, author_name, cover_i, price)")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching cart:", error.message);
      } else {
        const formatted = data.map((item) => ({
          id: item.book_id,
          title: item.books.title,
          author_name: item.books.author_name,
          cover_i: item.books.cover_i,
          price: item.books.price,
          quantity: item.quantity,
        }));
        setCartItems(formatted);
      }

      setLoading(false);
    }

    fetchCart();
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (loading) return <p>Loading payment page...</p>;

  return (
    <div className={styles.checkout_page}>
      <h2>Payment Gateway</h2>

      <div className={styles.cart_list}>
        {cartItems.map((item) => (
          <div key={item.id} className={styles.cart_item}>
            <img src={item.cover_i} alt={item.title} />
            <div>
              <h4>{item.title}</h4>
              <p>{item.author_name}</p>
              <p>${item.price}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.total_box}>
        <p>Total Amount:</p>
        <h3>${total}</h3>
      </div>

      <button className={styles.pay_button}>Pay Now</button>
    </div>
  );
}
