import {
  Instagram,
  Mail,
  Phone,
  Mountain,
  Linkedin,
  HelpCircle,
  Users,
  FileText,
  Heart,
} from "lucide-react";
import deviImage from "/Complete-hands.png";

const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-t-yellow-500">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* About Section */}
          <div className="space-y-4 flex flex-col items-center justify-center text-center">
            {/* Profile Image - Fixed to maintain aspect ratio */}
            <img
              src={deviImage}
              alt="Image"
              className="w-16 h-16 rounded-full bg-transparent border-l-4 border-l-purple-500 shadow-lg object-cover object-center hover:animate-bounce transition-all ease-linear"
            />

            {/* Quote Section */}
            <p className="text-purple-500 font-bold text-sm leading-relaxed ">
              <span>
                गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः । <br />
                गुरुः साक्षात् परब्रह्म तस्मै श्री गुरवे नमः ॥
              </span>
            </p>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-300 mb-4">
              Get in Touch
            </h3>
            <div className="space-y-3">
              <a
                href="mailto:hunter@greedhunter.com"
                className="flex items-center gap-3 group"
              >
                <span className="p-3 bg-gray-800 rounded-full group-hover:bg-blue-500 transition-colors">
                  <Mail className="h-6 w-6 text-white" />
                </span>
                <span className="text-gray-300 group-hover:text-blue-500 transition-colors">
                  hunter@greedhunter.com
                </span>
              </a>
              <div className="flex items-center gap-3 group">
                <span className="p-3 bg-gray-800 rounded-full group-hover:bg-green-500 transition-colors">
                  <Phone className="h-6 w-6 text-white" />
                </span>
                <span className="text-gray-300 group-hover:text-green-300 transition-colors">
                  +91 975-436-9306
                </span>
              </div>
            </div>
          </div>

          {/* Socials Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-300 mb-4">
              Social Connect
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://instagram.com/mrityunjay.elite"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <span className="p-3 bg-gray-800 rounded-full group-hover:bg-gradient-to-tr from-pink-500 to-purple-600 transition-colors">
                  <Instagram className="h-6 w-6 text-white" />
                </span>
                <span className="text-gray-300 group-hover:text-fuchsia-500 transition-colors">
                  mrityunjay.elite
                </span>
              </a>
              {/* <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <span className="p-3 bg-gray-800 rounded-full group-hover:bg-gradient-to-tr from-blue-500 to-cyan-600 transition-colors">
                  <Linkedin className="h-6 w-6 text-white" />
                </span>
                <span className="text-gray-300 group-hover:text-blue-500 transition-colors">
                  GreedHunter
                </span>
              </a> */}
            </div>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <a href="/platform/faq" className="flex items-center gap-2 group">
            <span className="p-2 bg-gray-800 rounded-full group-hover:bg-yellow-500 transition-colors">
              <HelpCircle className="h-4 w-4 text-white" />
            </span>
            <span className="text-gray-300 group-hover:text-yellow-300 transition-colors">
              FAQ
            </span>
          </a>

          <a
            href="/platform/contact-us"
            className="flex items-center gap-2 group"
          >
            <span className="p-2 bg-gray-800 rounded-full group-hover:bg-blue-500 transition-colors">
              <Phone className="h-4 w-4 text-white" />
            </span>
            <span className="text-gray-300 group-hover:text-blue-300 transition-colors">
              Contact Us
            </span>
          </a>

          <a
            href="/platform/about-us"
            className="flex items-center gap-2 group"
          >
            <span className="p-2 bg-gray-800 rounded-full group-hover:bg-purple-500 transition-colors">
              <Users className="h-4 w-4 text-white" />
            </span>
            <span className="text-gray-300 group-hover:text-purple-300 transition-colors">
              About Us
            </span>
          </a>

          <a
            href="/platform/privacy-policy"
            className="flex items-center gap-2 group"
          >
            <span className="p-2 bg-gray-800 rounded-full group-hover:bg-green-500 transition-colors">
              <FileText className="h-4 w-4 text-white" />
            </span>
            <span className="text-gray-300 group-hover:text-green-300 transition-colors">
              Privacy Policy
            </span>
          </a>

          <a
            href="/platform/about-refund-policy"
            className="flex items-center gap-2 group"
          >
            <span className="p-2 bg-gray-800 rounded-full group-hover:bg-red-700 transition-colors">
              <FileText className="h-4 w-4 text-white" />
            </span>
            <span className="text-gray-300 group-hover:text-red-400 transition-colors">
              Refund Policy
            </span>
          </a>

          <a
            href="/platform/Terms-and-conditions"
            className="flex items-center gap-2 group"
          >
            <span className="p-2 bg-gray-800 rounded-full group-hover:bg-red-700 transition-colors">
              <FileText className="h-4 w-4 text-white" />
            </span>
            <span className="text-gray-300 group-hover:text-red-400 transition-colors">
              T&C
            </span>
          </a>

          <a
            href="/platform/support-us"
            className="flex items-center gap-2 group px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full hover:from-pink-500 hover:to-purple-600 transition-all"
          >
            <Heart className="h-4 w-4 text-white" />
            <span className="text-white font-medium">Support Us</span>
          </a>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mb-8"></div>

        {/* Name & Copyright */}
        <div className="text-center space-y-4">
          <p className="text-2xl font-semibold text-yellow-300 animate-glow">
            ༄✽GreedHunter✽࿐
          </p>

          <p className="text-sm text-gray-500">
            © 2025 All rights reserved. Crafted with ❤️ and 🧠.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes glow {
          0%,
          100% {
            text-shadow: 0 0 10px rgba(255, 215, 0, 0.6),
              0 0 20px rgba(255, 165, 0, 0.4), 0 0 30px rgba(255, 69, 0, 0.2);
          }
          50% {
            text-shadow: 0 0 20px rgba(255, 215, 0, 0.8),
              0 0 30px rgba(255, 165, 0, 0.6), 0 0 40px rgba(255, 69, 0, 0.4);
          }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
