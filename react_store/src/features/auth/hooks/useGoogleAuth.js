import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../../config/firebase";
import api from "../../../api/axios";

export const useGoogleAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);

      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      const res = await api.post("/auth/google", {
        name: user.displayName,
        email: user.email,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      window.location.href = "/";
    } catch (err) {
      setError(err?.response?.data?.message || "Google login failed");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return { loginWithGoogle, loading, error };
};