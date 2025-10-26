import { useState } from "react";
import styles from "./AuthPage.module.css";
import supabase from "../supabaseClient";
import { useNavigate } from "react-router-dom";
function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    let result;
    if (isLogin) {
      result = await supabase.auth.signInWithPassword({ email, password });
    } else {
      result = await supabase.auth.signUp({ email, password });
    }
    if (result.error) {
      alert(result.error.message);
    } else {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      alert(`Welcom ${email}`);
      const { data: profileExists } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (!profileExists) {
        console.log("user:", user);
        console.log("user.email:", user.email);
        await supabase.from("profiles").insert({
          id: user.id,
          email: user.email,
          role: "user",
        });
      }

      navigate("/");
    }
  }
  return (
    <div className={styles.auth_container}>
      <div className={styles.auth_box}>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        </form>
        <p className={styles.toggle_text}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Sign up" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;
