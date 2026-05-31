import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, User, Lock, Phone, MapPin } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const SignUp = () => {
  const navigate = useNavigate();
  const redirectedRef = useRef(false);
  const { signUp, user, profile, isAdmin, loading: authLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    country: "",
    agreeToTerms: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle automatic redirects after successful sign up
  // Wait for authLoading=false so profile (and thus isAdmin) is fully known
  useEffect(() => {
    if (authLoading) return;

    if (user && !redirectedRef.current) {
      redirectedRef.current = true;
      setIsLoading(false);
      navigate(isAdmin ? '/admin' : '/dashboard', { replace: true });
    } else if (!user && !authLoading) {
      redirectedRef.current = false;
    }
  }, [user, isAdmin, authLoading, navigate]);

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

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms and conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);

    try {
      // Combine first and last name for full_name
      const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim();
      
      // Call signUp from AuthContext
      await signUp(formData.email.trim().toLowerCase(), formData.password, fullName);

      // Store phone and country for later update (after user is available)
      const phoneValue = formData.phone.trim();
      const countryValue = formData.country.trim();

      // Wait for user to be available, then update profile with additional info
      if (phoneValue || countryValue) {
        const updateProfile = async () => {
          // Wait for user to be set
          let attempts = 0;
          while (attempts < 10) {
            await new Promise(resolve => setTimeout(resolve, 500));
            const { data: { user: currentUser } } = await supabase.auth.getUser();
            if (currentUser) {
              const updateData: any = {};
              if (phoneValue) updateData.mobile = phoneValue;
              if (countryValue) updateData.country = countryValue;

              if (Object.keys(updateData).length > 0) {
                await supabase
                  .from('profiles')
                  .update(updateData)
                  .eq('user_id', currentUser.id);
              }
              break;
            }
            attempts++;
          }
        };
        updateProfile().catch(console.error);
      }

      // useEffect handles redirect once profile is loaded

    } catch (error: any) {
      console.error('Sign up error:', error);

      let errorMessage = 'Sign up failed. Please try again.';

      if (error.message) {
        if (error.message.includes('User already registered') || error.message.includes('already registered')) {
          errorMessage = 'An account with this email already exists. Please sign in instead.';
        } else if (error.message.includes('Password should be at least')) {
          errorMessage = 'Password must be at least 6 characters long.';
        } else if (error.message.includes('Invalid email')) {
          errorMessage = 'Please enter a valid email address.';
        } else if (
          error.message.toLowerCase().includes('email rate limit') ||
          error.message.toLowerCase().includes('rate limit') ||
          error.message.toLowerCase().includes('over_email_send_rate_limit')
        ) {
          errorMessage =
            'Too many sign-up attempts. Please wait a few minutes and try again, or ask the admin to disable email confirmation in Supabase settings.';
        } else {
          errorMessage = error.message;
        }
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
          Create Account
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="container mx-auto w-full max-w-2xl">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-8 shadow-sm">
              <h2 className="font-serif text-xl sm:text-2xl text-gray-900 mb-4 sm:mb-6">Create Your Account</h2>
              
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-gray-600">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className={`pl-10 bg-white text-gray-900 border-gray-200 ${errors.firstName ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.firstName && <p className="text-sm text-red-400 mt-1">{errors.firstName}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="lastName" className="text-gray-600">Last Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className={`pl-10 bg-white text-gray-900 border-gray-200 ${errors.lastName ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.lastName && <p className="text-sm text-red-400 mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-gray-600">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`pl-10 bg-white text-gray-900 border-gray-200 ${errors.email ? "border-red-500" : ""}`}
                    />
                  </div>
                  {errors.email && <p className="text-sm text-red-400 mt-1">{errors.email}</p>}
                </div>

                {/* Phone - Optional */}
                <div>
                  <Label htmlFor="phone" className="text-gray-600">Phone Number <span className="text-gray-400 text-xs">(Optional)</span></Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 234 567 8900"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="pl-10 bg-white text-gray-900 border-gray-200"
                    />
                  </div>
                </div>

                {/* Country - Optional */}
                <div>
                  <Label htmlFor="country" className="text-gray-600">Country <span className="text-gray-400 text-xs">(Optional)</span></Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="country"
                      type="text"
                      placeholder="United States"
                      value={formData.country}
                      onChange={(e) => handleInputChange("country", e.target.value)}
                      className="pl-10 bg-white text-gray-900 border-gray-200"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <Label htmlFor="password" className="text-gray-600">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className={`pl-10 pr-10 bg-white text-gray-900 border-gray-200 ${errors.password ? "border-red-500" : ""}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                  {errors.password && <p className="text-sm text-red-400 mt-1">{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div>
                  <Label htmlFor="confirmPassword" className="text-gray-600">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className={`pl-10 pr-10 bg-white text-gray-900 border-gray-200 ${errors.confirmPassword ? "border-red-500" : ""}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-sm text-red-400 mt-1">{errors.confirmPassword}</p>}
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                    className={`mt-1 ${errors.agreeToTerms ? "border-red-500" : ""}`}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none text-gray-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the{" "}
                      <Link to="/terms" className="text-[#2563eb] hover:underline">
                        Terms and Conditions
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy" className="text-[#2563eb] hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                </div>
                {errors.agreeToTerms && <p className="text-sm text-red-400">{errors.agreeToTerms}</p>}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#1e3a5f] to-[#2563eb] hover:brightness-110 text-gray-900 font-semibold py-3"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>

              {/* Sign In Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Already have an account?{" "}
                  <Link to="/login" className="text-[#2563eb] hover:underline font-medium">
                    Sign In
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

export default SignUp;
