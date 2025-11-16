import { useEffect, useState } from "react";
import styles from "./Books.module.css";
import supabase from "../supabaseClient";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author_name: "",
    category: "",
    description: "",
    cover_i: "",
    stock: "",
    price: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    setLoading(true);
    const { data, error } = await supabase.from("books").select("*");
    if (error) {
      console.error("Fetch error:", error.message);
      setErrorMsg("Failed to load books.");
    } else {
      setBooks(data);
    }
    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { error } = editingId
      ? await supabase.from("books").update(form).eq("id", editingId)
      : await supabase.from("books").insert([form]);

    if (error) {
      console.error("Submit error:", error.message);
      setErrorMsg("Failed to save book: " + error.message);
    } else {
      setForm({
        title: "",
        author_name: "",
        category: "",
        description: "",
        cover_i: "",
        stock: "",
        price: "",
      });
      setEditingId(null);
      fetchBooks();
    }

    setLoading(false);
  }

  async function handleDelete(id) {
    setLoading(true);
    const { error } = await supabase.from("books").delete().eq("id", id);
    if (error) {
      console.error("Delete error:", error.message);
      setErrorMsg("Failed to delete book: " + error.message);
    } else {
      fetchBooks();
    }
    setLoading(false);
  }

  return (
    <div className={styles.container}>
      <h1>Books</h1>

      {errorMsg && <p className={styles.error}>{errorMsg}</p>}
      {loading && <p className={styles.loading}>Loading...</p>}

      <form onSubmit={handleSubmit} className={styles.form}>
        {["title", "author_name", "category", "description", "cover_i"].map(
          (field) => (
            <input
              key={field}
              className={styles.input}
              placeholder={field.replace("_", " ").toUpperCase()}
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            />
          )
        )}
        <input
          className={styles.input}
          type="number"
          placeholder="STOCK"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
        />
        <input
          className={styles.input}
          type="number"
          placeholder="PRICE"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
        />

        <button className={styles.button} type="submit">
          {editingId ? "Update" : "Add"} Book
        </button>
      </form>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author_name}</td>
              <td>{book.category}</td>
              <td>
                <button
                  className={styles.edit}
                  onClick={() => {
                    setForm(book);
                    setEditingId(book.id);
                  }}
                >
                  Edit
                </button>
                <button
                  className={styles.delete}
                  onClick={() => handleDelete(book.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
