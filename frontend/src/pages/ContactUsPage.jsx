import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { Loader2 } from "lucide-react";
import Footer from "../components/Footer";

const ContactUs = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const { sendMailToHunter } = useUserContext();

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  // Form field animation
  const inputVariants = {
    focus: {
      scale: 1.02,
      borderColor: "#9333ea",
      boxShadow: "0 0 0 2px rgba(147, 51, 234, 0.3)",
    },
    blur: { scale: 1, borderColor: "#4b5563", boxShadow: "none" },
  };

  // Floating orbs animation for background
  const orbs = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 300 + 100,
    duration: Math.random() * 60 + 30,
    delay: Math.random() * 5,
  }));

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // ✅ Start loading

    // Here you would typically send the form data to your backend
    try {
      const response = await sendMailToHunter(formState);
      console.log(",ailREos", response);
      console.log("Form submitted:", formState);
      setIsSubmitted(true);

      // Reset form after submission
      setTimeout(() => {
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Unable to sned mail", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Animated background orbs */}
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full bg-gradient-to-br from-purple-900 to-purple-600 opacity-5 blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            zIndex: 0,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            opacity: [0.03, 0.07, 0.03],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-black/90 z-0"></div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        {/* Header Section */}
        <motion.section
          initial="hidden"
          animate={controls}
          variants={staggerChildren}
          ref={ref}
          className="mb-16 text-center"
        >
          <motion.h1
            variants={item}
            className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-yellow-300 to-purple-500 bg-clip-text text-transparent"
          >
            Contact Us
          </motion.h1>
          <motion.p
            variants={item}
            className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Have questions or feedback? We'd love to hear from you! Reach out to
            the GreedHunter team using the form below.
          </motion.p>
        </motion.section>

        {/* Contact Section */}
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="md:col-span-2 p-8 rounded-xl bg-gray-900/80 shadow-lg hover:shadow-purple-600/20 transition-all duration-300 border border-purple-500/20"
          >
            <h2 className="text-3xl font-bold mb-6 text-yellow-300">
              Send Us a Message
            </h2>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-purple-900/30 p-6 rounded-lg border border-purple-500/30 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-300 flex items-center justify-center"
                >
                  <span className="text-black text-2xl">✓</span>
                </motion.div>
                <h3 className="text-xl font-bold text-yellow-300 mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-300">
                  Thank you for reaching out. We'll get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-2"
                  >
                    <label htmlFor="name" className="block text-gray-300">
                      Your Name
                    </label>
                    <motion.input
                      whileFocus="focus"
                      animate="blur"
                      variants={inputVariants}
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none transition-all"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-2"
                  >
                    <label htmlFor="email" className="block text-gray-300">
                      Your Email
                    </label>
                    <motion.input
                      whileFocus="focus"
                      animate="blur"
                      variants={inputVariants}
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none transition-all"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2 mb-6"
                >
                  <label htmlFor="subject" className="block text-gray-300">
                    Subject
                  </label>
                  <motion.input
                    whileFocus="focus"
                    animate="blur"
                    variants={inputVariants}
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none transition-all"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2 mb-6"
                >
                  <label htmlFor="message" className="block text-gray-300">
                    Your Message
                  </label>
                  <motion.textarea
                    whileFocus="focus"
                    animate="blur"
                    variants={inputVariants}
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none transition-all"
                  ></motion.textarea>
                </motion.div>

                <motion.button
                  whileHover={{
                    scale: isLoading ? 1 : 1.05, // ✅ Prevent scaling when loading
                    boxShadow: isLoading
                      ? "none"
                      : "0 0 20px rgba(147, 51, 234, 0.6)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  type="submit"
                  disabled={isLoading} // ✅ Disable button while loading
                  className={`flex items-center justify-center gap-2 bg-yellow-300 text-black px-8 py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all ${
                    isLoading ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin w-5 h-5" /> Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="p-8 rounded-xl bg-gray-900/80 shadow-lg hover:shadow-purple-600/20 transition-all duration-300 border border-purple-500/20"
          >
            <h2 className="text-3xl font-bold mb-6 text-yellow-300">
              Reach Out
            </h2>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-start"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-700 flex items-center justify-center mr-4">
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-xl"
                  >
                    ✉️
                  </motion.span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-1">
                    Email Us
                  </h3>
                  <a
                    href="mailto:hunter@greedhunter.com"
                    className="text-gray-300 hover:text-yellow-300 transition-colors"
                  >
                    hunter@greedhunter.com
                  </a>
                  <p className="text-gray-400 text-sm mt-1">
                    We'll respond within 24 hours
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-start"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-700 flex items-center justify-center mr-4">
                  <motion.span
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-xl"
                  >
                    📱
                  </motion.span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-1">
                    Follow Us
                  </h3>
                  <div className="flex space-x-4 mt-2">
                    {["Twitter", "Instagram", "Discord"].map(
                      (platform, index) => (
                        <motion.a
                          key={platform}
                          whileHover={{ y: -3, color: "#EAB308" }}
                          href="#"
                          className="text-gray-300 hover:text-yellow-300 transition-all"
                        >
                          {platform}
                        </motion.a>
                      )
                    )}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-start"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-700 flex items-center justify-center mr-4">
                  <motion.span
                    animate={{ rotateY: [0, 180, 360] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-xl"
                  >
                    🕐
                  </motion.span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-1">
                    Support Hours
                  </h3>
                  <p className="text-gray-300">Monday - Friday</p>
                  <p className="text-gray-400">9:00 AM - 5:00 PM EST</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="mb-16"
        >
          <motion.h2
            variants={item}
            className="text-4xl font-bold text-center mb-12 text-yellow-300"
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: "How quickly will I receive a response?",
                a: "We aim to respond to all inquiries within 24 hours during business days.",
              },
              {
                q: "Can I request a specific challenge?",
                a: "Absolutely! We welcome suggestions for new challenges. Share your ideas through this form.",
              },
              {
                q: "How do I report a technical issue?",
                a: "Please use the contact form and select 'Technical Support' as the subject.",
              },
              {
                q: "Do you offer partnerships?",
                a: "Yes, we collaborate with educational institutions and organizations. Contact us for details.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-xl bg-gray-900/60 shadow-lg hover:shadow-purple-600/20 transition-all duration-300 border border-purple-500/20"
              >
                <h3 className="text-lg font-semibold text-purple-400 mb-2">
                  {faq.q}
                </h3>
                <p className="text-gray-300">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Newsletter CTA */}
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
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
            style={{
              backgroundImage: "radial-gradient(circle, #9333ea 0%, transparent 70%)",
            }}
          /> */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-yellow-300 mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-purple-200 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest challenges, rewards,
              and platform updates.
            </p>

            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4 sm:gap-0">
              <motion.input
                whileFocus="focus"
                animate="blur"
                variants={inputVariants}
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-lg sm:rounded-r-none bg-gray-800 border border-gray-700 text-white focus:outline-none flex-grow"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-300 text-black px-6 py-3 rounded-lg sm:rounded-l-none font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </motion.section>
      </div>
      </div>
            <Footer />
            </>
  );
};

export default ContactUs;
