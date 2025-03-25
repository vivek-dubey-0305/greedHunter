// import { motion, useAnimation } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import { useEffect } from "react";

// const AboutUs = () => {
//   const controls = useAnimation();
//   const [ref, inView] = useInView();

//   const sectionVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
//   };

//   const cardHoverVariants = {
//     hover: { y: -10, scale: 1.02 },
//     tap: { scale: 0.98 },
//   };

//   const staggerChildren = {
//     visible: { transition: { staggerChildren: 0.2 } },
//   };

//   const item = {
//     hidden: { y: 20, opacity: 0 },
//     visible: { y: 0, opacity: 1 },
//   };

//   useEffect(() => {
//     if (inView) {
//       controls.start("visible");
//     }
//   }, [controls, inView]);

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-12">
//       {/* Hero Section */}
//       <motion.section
//         initial="hidden"
//         animate={controls}
//         variants={staggerChildren}
//         ref={ref}
//         className="mb-20 text-center"
//       >
//         <motion.h1
//           variants={item}
//           className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
//         >
//           Who We Are
//         </motion.h1>
//         <motion.p
//           variants={item}
//           className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
//         >
//           Welcome to GreedHunter – The ultimate battleground where knowledge meets competition. We bring students together to learn, compete, and win exciting prizes!
//         </motion.p>
//       </motion.section>

//       {/* Mission & Vision Sections */}
//       <div className="grid md:grid-cols-2 gap-12 mb-20">
//         {[['Our Mission', 'To revolutionize the way students engage...'], ['Our Vision', 'To become the #1 platform...']].map(([title, text], index) => (
//           <motion.div
//             key={title}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-100px" }}
//             variants={sectionVariants}
//             className="p-8 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
//           >
//             <h2 className="text-3xl font-bold mb-4 text-gray-800">{title}</h2>
//             <p className="text-gray-600 leading-relaxed">{text}</p>
//           </motion.div>
//         ))}
//       </div>

//       {/* How It Works */}
//       <motion.section
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         variants={staggerChildren}
//         className="mb-20"
//       >
//         <motion.h2
//           variants={item}
//           className="text-4xl font-bold text-center mb-16 text-gray-800"
//         >
//           How It Works
//         </motion.h2>
//         <div className="grid md:grid-cols-3 gap-8">
//           {[
//             { title: "1. Register & Explore", desc: "Sign up and discover a world of quizzes and challenges." },
//             { title: "2. Compete & Win", desc: "Participate in quizzes, compete with peers, and earn rewards." },
//             { title: "3. Cash Out & Level Up", desc: "Redeem your prizes and level up your skills!" },
//           ].map((item, index) => (
//             <motion.div
//               key={item.title}
//             //   variants={item}
//               whileHover="hover"
//               whileTap="tap"
//               variants={cardHoverVariants}
//               className="p-8 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
//             >
//               <h3 className="text-xl font-bold mb-4 text-blue-600">{item.title}</h3>
//               <p className="text-gray-600">{item.desc}</p>
//             </motion.div>
//           ))}
//         </div>
//       </motion.section>

//       {/* CTA Section */}
//       <motion.section
//         initial={{ opacity: 0, scale: 0.95 }}
//         whileInView={{ opacity: 1, scale: 1 }}
//         viewport={{ once: true }}
//         className="text-center py-16 bg-blue-600 rounded-2xl shadow-xl"
//       >
//         <h2 className="text-4xl font-bold text-white mb-6">Join the Hunt Now!</h2>
//         <p className="text-xl text-blue-100 mb-8">Ready to compete? Sign up and start winning today!</p>
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
//         >
//           Get Started
//         </motion.button>
//       </motion.section>
//     </div>
//   );
// };

// export default AboutUs;

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { randomCode, randomUniqueCode } from "../utils/securedRoutes";
import Footer from "../components/Footer";

const AboutUs = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const { user } = useUserContext();
  const navigate = useNavigate();

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const cardHoverVariants = {
    hover: { y: -10, scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.98 },
  };

  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  // Particle animation for background
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 8 + 2,
    duration: Math.random() * 20 + 10,
  }));

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-black text-white">
        {/* Animated background particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-purple-500 opacity-20"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-black/80 z-0"></div>

        {/* Main content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
          {/* Hero Section */}
          <motion.section
            initial="hidden"
            animate={controls}
            variants={staggerChildren}
            ref={ref}
            className="mb-24 text-center"
          >
            <motion.h1
              variants={item}
              className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-yellow-300 to-purple-500 bg-clip-text text-transparent"
            >
              Who We Are
            </motion.h1>
            <motion.p
              variants={item}
              className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
            >
              Welcome to GreedHunter – The ultimate battleground where knowledge
              meets competition. We bring students together to learn, compete,
              and win exciting prizes!
            </motion.p>
          </motion.section>

          {/* Mission & Vision Sections */}
          <div className="grid md:grid-cols-2 gap-12 mb-24">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={sectionVariants}
              className="p-8 rounded-xl bg-gray-900/80 shadow-lg hover:shadow-purple-600/20 transition-all duration-300 border border-purple-500/20"
            >
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold mb-6 text-yellow-300">
                  Our Mission
                </h2>
                <ul className="space-y-4">
                  {[
                    "Empowering Learning Through Gamification – Making education exciting by integrating quizzes, games, and challenges.",
                    "Providing Real-World Rewards – Students can earn prizes, certificates, and recognition for their knowledge and skills.",
                    "Encouraging Healthy Competition – A platform where students compete against peers to improve their abilities.",
                    "Building a Knowledge-Driven Community – Connecting students from different backgrounds to share and grow together.",
                    "Enhancing Skill Development – Covering diverse topics to help students sharpen their analytical and problem-solving skills.",
                  ].map((text, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="flex items-start"
                    >
                      <span className="text-purple-400 mr-2">•</span>
                      <span className="text-gray-300">{text}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={sectionVariants}
              className="p-8 rounded-xl bg-gray-900/80 shadow-lg hover:shadow-purple-600/20 transition-all duration-300 border border-purple-500/20"
            >
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold mb-6 text-yellow-300">
                  Our Vision
                </h2>
                <ul className="space-y-4">
                  {[
                    "Creating a Global Hub for Intellectual Growth – A place where students worldwide can challenge themselves.",
                    "Bridging Education and Entertainment – Making learning fun, interactive, and rewarding.",
                    "Fostering Leadership and Critical Thinking – Encouraging students to think strategically and make informed decisions.",
                    "Recognizing and Rewarding Talent – Ensuring that hard work and dedication get acknowledged through leaderboards, certificates, and prizes.",
                    "Expanding Career Opportunities – Helping students develop skills that can be useful in academics and future careers.",
                  ].map((text, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="flex items-start"
                    >
                      <span className="text-purple-400 mr-2">•</span>
                      <span className="text-gray-300">{text}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>

          {/* How It Works */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="mb-24"
          >
            <motion.h2
              variants={item}
              className="text-4xl font-bold text-center mb-16 text-yellow-300"
            >
              How It Works
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "1. Register & Explore",
                  desc: "Sign up and discover a world of quizzes and challenges.",
                  icon: "🔍",
                },
                {
                  title: "2. Compete & Win",
                  desc: "Participate in quizzes, compete with peers, and earn rewards.",
                  icon: "🏆",
                },
                {
                  title: "3. Cash Out & Level Up",
                  desc: "Redeem your prizes and level up your skills!",
                  icon: "⬆️",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  whileHover="hover"
                  whileTap="tap"
                  variants={cardHoverVariants}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="p-8 rounded-xl bg-gray-900/80 shadow-lg hover:shadow-purple-500/30 transition-all duration-300 border border-purple-500/20 group"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.2 + 0.2 }}
                    className="flex justify-center mb-6"
                  >
                    <span className="text-4xl bg-purple-700 p-4 rounded-full group-hover:bg-yellow-300 group-hover:text-black transition-colors duration-300">
                      {item.icon}
                    </span>
                  </motion.div>
                  <h3 className="text-xl font-bold mb-4 text-purple-400 group-hover:text-yellow-300 transition-colors duration-300 text-center">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-center">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center py-16 bg-gradient-to-r from-purple-900 to-black rounded-2xl shadow-xl border border-purple-500/30 overflow-hidden relative"
          >
            {/* <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
              backgroundSize: ["100% 100%", "150% 150%", "100% 100%"],
            }}
            transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
            style={{
              backgroundImage: "radial-gradient(circle, #9333ea 0%, transparent 60%)",
            }}
          /> */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-4xl font-bold text-yellow-300 mb-6">
                Join the Hunt Now!
              </h2>
              <p className="text-xl text-purple-200 mb-8">
                Ready to compete? Sign up and start winning today!
              </p>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(147, 51, 234, 0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-300 text-black px-8 py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all"
                onClick={
                  user
                    ? () =>
                        navigate(
                          `/hunter/hunter dashboard/${
                            randomUniqueCode + randomCode
                          }`
                        )
                    : () =>
                        navigate(
                          `/greed userform/hunter creation/${randomUniqueCode}`
                        )
                }
              >
                Get Started
              </motion.button>
            </motion.div>
          </motion.section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
