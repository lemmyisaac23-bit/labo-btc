import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Logo } from "@/components/Logo";
import { ChevronDown } from "lucide-react";

export const Navbar = () => {
  const { user, signOut, isAdmin, loading, session } = useAuth();
  const navigate = useNavigate();
  const showSignOut = !loading && Boolean(user) && Boolean(session);

  const handleLogoClick = () => {
    if (showSignOut) {
      navigate(isAdmin ? "/admin" : "/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleLogoClick}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] rounded-md"
          >
            <Logo />
          </button>

          <div className="flex items-center gap-4 md:gap-6">
            {showSignOut ? (
              <>
                <Link
                  to={isAdmin ? "/admin" : "/dashboard"}
                  className="text-sm font-medium uppercase tracking-wide text-gray-700 hover:text-[#2563eb] transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => void signOut().then(() => navigate("/"))}
                  className="rounded-full border border-gray-900 px-5 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium uppercase tracking-wide text-gray-700 hover:text-[#2563eb] transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="rounded-full border border-gray-900 px-5 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50"
                >
                  Sign Up
                </Link>
              </>
            )}

            <button
              type="button"
              className="hidden items-center gap-1.5 rounded-md border border-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-700 sm:flex"
              aria-label="Language selector"
            >
              <span className="text-base leading-none">🇺🇸</span>
              <span>US</span>
              <ChevronDown className="h-3 w-3 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
