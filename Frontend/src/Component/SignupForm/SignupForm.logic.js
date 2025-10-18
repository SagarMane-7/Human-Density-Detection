import { updateProfile } from "firebase/auth";

export async function handleSignup({
  name,
  email,
  password,
  confirm,
  signup,
  navigate,
  setError,
  setLoading,
}) {
  setError(null);

  const emailValue = email.trim();
  if (!emailValue) {
    setError("Please enter an email.");
    return;
  }
  if (password !== confirm) {
    setError("Passwords do not match.");
    return;
  }
  if (password.length < 6) {
    setError("Password must be at least 6 characters.");
    return;
  }

  setLoading(true);

  try {
    const userCredential = await signup(emailValue, password);

    if (name.trim()) {
      await updateProfile(userCredential.user, { displayName: name.trim() });
    }
    navigate("/dashboard");
  } catch (err) {
    setError(err.message || "Failed to create an account.");
  } finally {
    setLoading(false);
  }
}
