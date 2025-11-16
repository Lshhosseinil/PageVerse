import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import supabase from "../supabaseClient";
import styles from "./Users.module.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    const { data, error } = await supabase.from("profiles").select("*");
    if (error) {
      console.error("Error fetching users:", error.message);
      setErrorMsg("Failed to load users.");
    } else {
      setUsers(data);
    }
    setLoading(false);
  }

  async function handleAddUser(e) {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const fakeId = uuidv4();
    const { error } = await supabase
      .from("profiles")
      .insert({ id: fakeId, email, role });

    if (error) {
      setErrorMsg("Failed to add user: " + error.message);
    } else {
      setEmail("");
      setRole("user");
      fetchUsers();
    }

    setLoading(false);
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    setErrorMsg("");
    setLoading(true);

    const { error } = await supabase.from("profiles").delete().eq("id", id);
    if (error) {
      setErrorMsg("Failed to delete user: " + error.message);
    } else {
      fetchUsers();
    }

    setLoading(false);
  }

  const filteredUsers = users.filter((u) =>
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1>User Management</h1>

      {errorMsg && <p className={styles.error}>{errorMsg}</p>}
      {loading && <p className={styles.loading}>Loading...</p>}

      <form onSubmit={handleAddUser} className={styles.form}>
        <input
          className={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <select
          className={styles.select}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button className={styles.button} type="submit">
          Add User
        </button>
      </form>

      <input
        className={styles.search}
        placeholder="Search by email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <p>Total Users: {filteredUsers.length}</p>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td
                className={user.role === "admin" ? styles.admin : styles.user}
              >
                {user.role}
              </td>
              <td>
                {user.created_at
                  ? new Date(user.created_at).toLocaleDateString()
                  : "—"}
              </td>
              <td>
                <button
                  className={styles.delete}
                  onClick={() => handleDelete(user.id)}
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
