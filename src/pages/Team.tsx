import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Team = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // If user is logged in, show team view from dashboard
  // Otherwise show public team page
  if (user) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="mb-8 text-center font-serif text-4xl text-gray-900">Our Team</h1>
        <p className="mx-auto mb-12 max-w-3xl text-center text-gray-600">
          Meet the dedicated professionals behind BtcCloudBase, working tirelessly to provide you with the best cloud mining experience.
        </p>
        {/* Team content would go here - same as dashboard team view */}
        <div className="text-center py-12">
          <p className="text-white/70">Please sign in to view our team members.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Team;

