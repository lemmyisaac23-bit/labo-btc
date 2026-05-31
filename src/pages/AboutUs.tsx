import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const AboutUs = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // If user is logged in, show about view from dashboard
  // Otherwise show public about page
  if (user) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="mb-8 text-center font-serif text-4xl text-gray-900">About Us</h1>
        <div className="mx-auto max-w-4xl space-y-6 leading-relaxed text-gray-600">
          <p>
            BtcCloudBase is one of the leading cryptocurrency mining platforms, offering cryptocurrency mining capacities in every range — for newcomers. Our mission is to make acquiring cryptocurrencies easy and fast for everyone.
          </p>
          <p>
            Please sign in to view more about our company, mission, and values.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;

