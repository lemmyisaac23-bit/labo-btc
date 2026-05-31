import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const SignIn = () => {
  const navigate = useNavigate();
  const redirectedRef = useRef(false);
  const { signIn, user, isAdmin, loading: authLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user && !authLoading && !redirectedRef.current) {
      redirectedRef.current = true;
      setIsLoading(false);
      const destination = isAdmin ? '/admin' : '/dashboard';
      navigate(destination, { replace: true });
    } else if (!user && !authLoading) {
      redirectedRef.current = false;
    }
  }, [user, authLoading, isAdmin, navigate]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
    if (error) {
      setError(null);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);

    try {
      await signIn(formData.email.trim().toLowerCase(), formData.password);
      setIsLoading(false);
    } catch (error: unknown) {
      let errorMessage = 'Sign in failed. Please check your credentials and try again.';
      const message = error instanceof Error ? error.message : '';

      if (message.includes('Invalid login credentials') || message.includes('Invalid credentials')) {
        errorMessage = 'Invalid email or password. Please try again.';
      } else if (message.includes('Email not confirmed') || message.includes('email not confirmed')) {
        errorMessage = 'Please verify your email address before signing in.';
      } else if (message.includes('too many requests')) {
        errorMessage = 'Too many sign in attempts. Please wait a moment and try again.';
      } else if (message) {
        errorMessage = message;
      }

      setError(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="landing-hero-banner w-full py-5 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-white md:text-base">
          Sign In
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="font-serif text-2xl text-gray-900 mb-2">Login To Your Account</h2>
            <p className="text-sm text-gray-500 mb-6">Welcome back to BtcCloudBase</p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Username or Email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-white text-gray-900 border-gray-200 h-12"
                />
                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="bg-white text-gray-900 border-gray-200 h-12 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-gray-600 text-sm">
                    Remember Me
                  </Label>
                </div>
                <Link to="/forgot-password" className="text-sm text-[#2563eb] hover:text-blue-700">
                  Forgot Password
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#1e3a5f] to-[#2563eb] hover:brightness-110 text-gray-900 font-semibold py-3 h-12"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Login"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don&apos;t Have An Account?{" "}
                <Link to="/signup" className="text-[#2563eb] hover:text-blue-700 font-medium">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SignIn;
