import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./SignupForm.module.css";
import { handleSignup } from "./SignupForm.logic";

export default function SignupForm({ setMode }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* Name */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
      </div>

      {/* Email */}
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

      {/* Password */}
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

      {/* Confirm Password */}
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

      {/* Error */}
      {error && <p className={styles.error}>{error}</p>}

      {/* Button */}
      <button type="submit" disabled={loading} className={styles.button}>
        {loading ? "Creating account..." : "Sign-up"}
      </button>

      {/* Login link */}
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
