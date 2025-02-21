// import { Instagram, Mail, Phone } from "lucide-react";

// const Footer = () => {
//   return (
//     <>
//       <footer className="bg-gray-900 text-white py-6 mt-10">
//         <div className="container mx-auto flex flex-col items-center justify-center gap-4">
//           {/* Animated Name */}
//           <p className="text-lg font-semibold text-yellow-300 animate-glow">
//             ༄✽ȺẞℏᎥຮꫝⅇҟ 𝒟ʊƄℯყ✽࿐
//           </p>

//           {/* Social Links */}
//           <div className="flex gap-6">
//             {/* Instagram */}
//             <a
//               href="https://instagram.com/mrityunjay.elite"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center gap-2 text-gray-400 transition-transform transform hover:scale-110 group"
//             >
//               <Instagram className="text-pink-500 animate-glow-insta" size={24} />
//               <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-pink-500 font-semibold">
//                 Instagram
//               </span>
//             </a>

//             {/* Email */}
//             <a
//               href="mailto:mrityunjay.elite@gmail.com"
//               className="flex items-center gap-2 text-gray-400 transition-transform transform hover:scale-110 group"
//             >
//               <Mail className="text-blue-500 animate-glow-mail" size={24} />
//               <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-blue-500 font-semibold">
//                 Email
//               </span>
//             </a>

//             {/* Phone */}
//             <a className="flex items-center gap-2 text-gray-400 transition-transform transform hover:scale-110 group">
//               <Phone className="text-green-500 animate-glow-phone" size={24} />
//               <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-green-500 font-semibold">
//                 +91 975-436-9306
//               </span>
//             </a>
//           </div>
//         </div>
//       </footer>

//       {/* Style Section (Outside JSX) */}
//       <style>
//         {`
//           @keyframes glow {
//             0%, 100% { text-shadow: 0 0 5px rgba(255, 255, 255, 0.8); }
//             50% { text-shadow: 0 0 10px rgba(255, 255, 255, 1); }
//           }

//           .animate-glow-insta {
//             animation: glow 1.5s infinite alternate ease-in-out;
//             text-shadow: 0 0 5px #ff1493, 0 0 15px #ff69b4;
//           }

//           .animate-glow-mail {
//             animation: glow 1.5s infinite alternate ease-in-out;
//             text-shadow: 0 0 5px #1e90ff, 0 0 15px #4682b4;
//           }

//           .animate-glow-phone {
//             animation: glow 1.5s infinite alternate ease-in-out;
//             text-shadow: 0 0 5px #32cd32, 0 0 15px #00ff00;
//           }
//         `}
//       </style>
//     </>
//   );
// };

// export default Footer;

import { Instagram, Mail, Phone, Mountain, Linkedin } from "lucide-react";
import deviImage from "/Complete-hands.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
                href="mailto:mrityunjay.elite@gmail.com"
                className="flex items-center gap-3 group"
              >
                <span className="p-3 bg-gray-800 rounded-full group-hover:bg-blue-500 transition-colors">
                  <Mail className="h-6 w-6 text-white" />
                </span>
                <span className="text-gray-300 group-hover:text-blue-500 transition-colors">
                  mrityunjay.elite@gmail.com
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
            <div className="flex gap-4">
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
                href="https://instagram.com/mrityunjay.elite"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 rounded-full hover:bg-gradient-to-tr from-pink-500 to-purple-600 transition-all transform hover:scale-105"
              >
                <Instagram className="h-6 w-6 text-white" />
                <span className="inline-block">mrityunjay.elite</span>
              </a> */}
              {/* <a
                href="#"
                className="p-3 bg-gray-800 rounded-full hover:bg-gradient-to-tr from-blue-500 to-cyan-600 transition-all transform hover:scale-105"
              >
                <Linkedin className="h-6 w-6 text-white" />
              </a> */}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mb-8"></div>

        {/* Name & Copyright */}
        <div className="text-center space-y-4">
          <p className="text-2xl font-semibold text-yellow-300 animate-glow">
            ༄✽ȺẞℏᎥຮꫝⅇҟ 𝒟ʊƄℯყ✽࿐
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
