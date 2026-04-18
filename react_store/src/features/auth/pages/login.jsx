import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import api from "../../../api/axios";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { FaEnvelope, FaLock, FaGoogle, FaArrowRight } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    loginWithGoogle,
    loading: googleLoading,
    error: googleError,
  } = useGoogleAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const res = await api.post("/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError("Email or password incorrect. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const { user, loading: authLoading } = useAuth();


  if (authLoading) return null;

  if (user) {
    return user.role === "admin" ? (
      <Navigate to="/admin" replace />
    ) : (
      <Navigate to="/" replace />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6] p-4 font-sans">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      </div>

      <div className="w-full max-w-[440px] z-10">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 overflow-hidden border border-white/20">
          {/* HEADER */}
          <div className="p-8 pt-10 text-center">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mx-auto shadow-xl shadow-indigo-200 mb-6 rotate-3">
              <FaLock size={24} />
            </div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-gray-400 font-medium mt-2">
              Enter your details to access your account <br />
              page admin :
              admin@admin.com
              123123123
            </p>
          </div>

          <div className="px-8 pb-10 space-y-6">
            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-indigo-500 transition-colors" />
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium text-gray-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                    Password
                  </label>
                  {/* <Link to="/forgot-password" size={10} className="text-[10px] font-bold text-indigo-600 hover:underline">Forgot?</Link> */}
                </div>
                <div className="relative group">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-indigo-500 transition-colors" />
                  <input
                    name="password"
                    type="password"
                    required
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium text-gray-700"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 text-xs font-bold p-4 rounded-xl text-center animate-shake">
                  {error}
                </div>
              )}

              <button
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-200 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {loading ? "Authenticating..." : "Sign In"}
                {!loading && (
                  <FaArrowRight
                    className="group-hover:translate-x-1 transition-transform"
                    size={12}
                  />
                )}
              </button>
            </form>

            {/* SEPARATOR */}
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-gray-100"></div>
              <span className="flex-shrink mx-4 text-gray-300 text-[10px] font-black uppercase tracking-[0.2em]">
                Or continue with
              </span>
              <div className="flex-grow border-t border-gray-100"></div>
            </div>

            {/* GOOGLE BUTTON */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={loginWithGoogle}
                disabled={googleLoading}
                className="w-full bg-white border-2 border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/30 text-gray-700 py-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
              >
                <FaGoogle className="text-red-500" />
                {googleLoading ? "Connecting..." : "Google Account"}
              </button>

              {googleError && (
                <p className="text-red-500 text-[10px] font-bold text-center uppercase tracking-wider">
                  {googleError}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        {/* <p className="text-center mt-8 text-gray-500 text-sm font-medium">
          Don't have an account? <Link to="/register" className="text-indigo-600 font-black hover:underline underline-offset-4">Create one for free</Link>
        </p> */}
      </div>
    </div>
  );
}

export default Login;
