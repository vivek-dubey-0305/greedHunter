import { Ghost, ArrowRight, Sparkles, Palette } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated 404 Number */}
          <div className="relative mb-12">
            <div className="text-[20rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 opacity-20 absolute -top-24 left-1/2 -translate-x-1/2">
              404
            </div>
            <div className="relative group">
              <div className="text-9xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-8 animate-pulse">
                404
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-600 blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
            </div>
          </div>

          {/* Animated Ghost */}
          <div className="flex justify-center mb-12">
            <div className="relative animate-float">
              <Ghost className="h-32 w-32 text-purple-300" />
              <div className="absolute inset-0 bg-purple-300 rounded-full blur-xl opacity-30" />
            </div>
          </div>

          {/* Content */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Lost in the Digital Void?
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            The page you're seeking has vanished into the cosmic static. Don't
            worry - our spectral navigator is here to guide you back to familiar
            dimensions.
          </p>

          {/* Return Button */}
          <button
            onClick={() => navigate("/")}
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full font-semibold text-white hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-900/30"
          >
            <span className="mr-3">Return to Safety</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-full" />
          </button>

          {/* Decorative Elements */}
          <div className="mt-16 flex justify-center space-x-6 opacity-50">
            <Sparkles className="h-8 w-8 text-yellow-400 animate-spin-slow" />
            <Palette className="h-8 w-8 text-cyan-400 animate-spin-slow-reverse" />
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          @keyframes spin-slow {
            to { transform: rotate(360deg); }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
          }
          .animate-spin-slow-reverse {
            animation: spin-slow 25s linear infinite reverse;
          }
        `}
      </style>
    </div>
  );
};

export default PageNotFound;
