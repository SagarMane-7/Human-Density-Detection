import { useEffect,useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./SignupForm.module.css";
import { handleSignup } from "./SignupForm.logic";
import Animation from "../../Component/Animation/Animation";


export default function SignupForm({ setMode }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAnimation, setShowAnimation] = useState(true);
        
  useEffect(() => {
    const timer = setTimeout(() => {
    setShowAnimation(false);
    },500);
    return () => clearTimeout(timer);
  }, []);
  

  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    await handleSignup({
      name,
      email,
      password,
      confirm,
      signup,
      navigate,
      setError,
      setLoading,
    });
  }

  if (showAnimation) {
      return <Animation />;
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
      </div>

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

      <div className={styles.inputGroup}>
        <label className={styles.label}>Confirm Password</label>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className={styles.input}
          required
        />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <button type="submit" disabled={loading} className={styles.button}>
        {loading ? "Creating account..." : "Sign-up"}
      </button>
      
      <p className={styles.switchText}>
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => setMode("login")}
          className={styles.switchBtn}
        >
          Login
        </button>
      </p>
    </form>
  );
}
