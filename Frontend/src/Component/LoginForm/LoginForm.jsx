import { useEffect,useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";
import { handleLogin } from "./LoginForm.logic";
import Animation from "../../Component/Animation/Animation";


export default function LoginForm({ setMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAnimation, setShowAnimation] = useState(true);
      
  useEffect(() => {
    const timer = setTimeout(() => {
    setShowAnimation(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);
  

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    await handleLogin({ email, password, login, navigate, setError, setLoading });
  }

  if (showAnimation) {
      return <Animation />;
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          required
        />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.buttonWrapper}>
        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>

      <p className={styles.signupText}>
        Don’t have an account?{" "}
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={styles.signupBtn}
        >
          Sign-up
        </button>
      </p>
    </form>
  );
}
