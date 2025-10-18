export async function handleLogin({ email, password, login, navigate, setError, setLoading }) {
  setError(null);
  setLoading(true);
  try {
    await login(email, password);
    navigate("/dashboard");
  } catch (err) {
    setError(err.message || "Login failed");
  } finally {
    setLoading(false);
  }
}
