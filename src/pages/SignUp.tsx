import { Navbar } from "@/components/Navbar";
import { VishnuLogo } from "@/components/VishnuLogo";
import { NavLink } from "@/components/NavLink";
import { useState, useEffect } from "react";
import { signInWithGoogle, handleRedirectResult } from "@/services/firebase";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle redirect result on component mount
  useEffect(() => {
    const checkRedirect = async () => {
      try {
        const user = await handleRedirectResult();
        if (user) {
          navigate("/");
        }
      } catch (error) {
        console.error("Redirect error:", error);
      }
    };
    checkRedirect();
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log("Sign up:", formData);
    // Add your registration logic here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    setError("");
    try {
      const user = await signInWithGoogle();
      if (user) {
        const userData = {
          uid: user.uid,
          name: user.displayName || 'User',
          email: user.email,
          photoURL: user.photoURL
        };
        localStorage.setItem('vishnuUser', JSON.stringify(userData));
      }
      navigate("/");
    } catch (error: any) {
      console.error("Sign up error:", error);
      setError(error.message || "Failed to sign up with Google. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-12 pt-16">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <NavLink to="/" className="inline-flex items-center gap-2 mb-4">
            <VishnuLogo size={48} />
          </NavLink>
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-gray-400">Join Vishnu AI and start searching smarter</p>
        </div>

        {/* Sign Up Form */}
        <div className="glass-card p-8 rounded-2xl">
          {/* Error Display */}
          {error && (
            <div className="mb-6 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {error}
            </div>
          )}

          {/* Google Sign Up */}
          <button
            onClick={handleGoogleSignUp}
            disabled={isLoading}
            className="w-full bg-white hover:bg-gray-100 text-black rounded-full py-3 font-semibold transition mb-6 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span>Signing up...</span>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </>
            )}
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#0a0a0a] text-gray-400">Or sign up with email</span>
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" required className="mt-1 rounded" />
              <span className="text-sm text-gray-400">
                I agree to the{" "}
                <a href="#" className="text-primary hover:text-primary/90 transition">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary hover:text-primary/90 transition">
                  Privacy Policy
                </a>
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white rounded-full py-3 font-semibold transition"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account?{" "}
            <NavLink to="/signin" className="text-primary hover:text-primary/90 transition font-semibold">
              Sign In
            </NavLink>
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl mt-6">
          <h3 className="font-semibold mb-3">What you'll get:</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>✓ 10 free searches per day</li>
            <li>✓ Save up to 10 chats</li>
            <li>✓ Access to community forum</li>
            <li>✓ Real-time AI-powered search</li>
          </ul>
        </div>
      </div>
    </div>
    </>
  );
};

export default SignUp;
