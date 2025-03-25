import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";

const TermsAndConditionsPage = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sections = [
    {
      id: "definitions",
      title: "Definitions",
      content: [
        '"Platform" refers to the website GreedHunter.com and any associated applications or services.',
        '"User" / "You" refers to any individual who accesses or uses GreedHunter.',
        '"We" / "Us" / "Our" refers to GreedHunter, its owners, administrators, and affiliates.',
        '"Events" refer to quizzes, games, competitions, and other hosted activities.',
        '"Rewards" refer to any prizes, badges, or winnings distributed by GreedHunter.',
      ],
    },
    {
      id: "eligibility",
      title: "Eligibility",
      content: [
        "Be at least 13 years old (Parental consent required for users under 18).",
        "Be a student enrolled in a school, college, or university to participate in student-exclusive events.",
        "Provide accurate and complete registration information.",
        "Agree to comply with all applicable laws and regulations while using GreedHunter.",
      ],
    },
    {
      id: "account",
      title: "Account Registration & Security",
      content: [
        "Users must create an account with a valid email to participate in events.",
        "You are responsible for keeping your account credentials secure.",
        "Sharing accounts or impersonating others is strictly prohibited.",
        "If you suspect unauthorized access, report it immediately to hunter@greedHunter.com.",
        "We reserve the right to suspend or terminate accounts found violating these Terms.",
      ],
    },
    {
      id: "conduct",
      title: "User Conduct & Prohibited Activities",
      content: [
        "You agree NOT to:",
        "❌ Cheat, hack, or use unfair means to manipulate event results.",
        "❌ Use bots, scripts, or automated tools to interact with GreedHunter.",
        "❌ Post or share illegal, offensive, or misleading content.",
        "❌ Attempt to exploit bugs or security vulnerabilities in the platform.",
        "❌ Use GreedHunter for commercial activities without prior approval.",
        "⚠️ Violating these rules may result in permanent account suspension and forfeiture of rewards.",
      ],
    },
    {
      id: "events",
      title: "Event Participation & Rewards",
      content: [
        "Each event has its own set of rules that must be followed.",
        "Participation is voluntary and at the user's own discretion.",
        "Rewards may include cash prizes, badges, certificates, or other incentives.",
        "Winners are selected based on predefined criteria, and results are final.",
        "Any attempt to manipulate or falsely claim rewards will lead to disqualification.",
        "Cash prize withdrawals require identity verification and a valid payment method.",
      ],
    },
    {
      id: "payment",
      title: "Payment & Refund Policy",
      content: [
        "Certain events may require a registration fee, payable through Razorpay or other supported payment methods.",
        "Payments are processed securely, and we do not store sensitive payment details.",
        "No refunds will be issued once payment is made unless an event is canceled by us.",
        "If a refund is issued, it will be processed within 7-10 business days.",
      ],
    },
    {
      id: "intellectual",
      title: "Intellectual Property Rights",
      content: [
        "All quizzes, games, and content on GreedHunter are owned or licensed by us.",
        "Users do not have the right to copy, reproduce, or distribute any content from our platform.",
        "The GreedHunter™ brand, logo, and name are protected trademarks and cannot be used without written permission.",
      ],
    },
    {
      id: "privacy",
      title: "Data Privacy & Security",
      content: [
        "We collect and process user data as outlined in our Privacy Policy.",
        "User data is never sold to third parties.",
        "Cookies and tracking technologies are used to enhance user experience.",
        "Users can request data deletion by contacting hunter@greedHunter.com.",
        "🔹 For complete details, please refer to our Privacy Policy.",
      ],
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      content: [
        "GreedHunter is not responsible for any losses, damages, or disruptions caused by using the platform.",
        "We do not guarantee uninterrupted service, and we may modify, suspend, or discontinue events at any time.",
        "Users participate in events at their own risk, and we are not liable for disputes arising between users.",
      ],
    },
    {
      id: "termination",
      title: "Termination & Account Suspension",
      content: [
        "We reserve the right to suspend, restrict, or terminate your account under the following conditions:",
        "Violation of these Terms or any fraudulent activity.",
        "Misuse of the platform or engaging in harmful behavior.",
        "Inactivity for over 12 months, subject to prior notification.",
        "If your account is terminated, all rewards, winnings, and access to services will be revoked.",
      ],
    },
    {
      id: "updates",
      title: "Updates to These Terms",
      content: [
        "We may update these Terms & Conditions from time to time.",
        "Continued use of GreedHunter after changes means you accept the revised Terms.",
        "Users will be notified of significant changes via email or platform notifications.",
      ],
    },
    {
      id: "governing",
      title: "Governing Law & Dispute Resolution",
      content: [
        "These Terms are governed by the laws of India.",
        "Any disputes shall be resolved through negotiation. If unresolved, disputes may be taken to courts in India.",
        "Users agree to waive any collective legal action against GreedHunter.",
      ],
    },
    {
      id: "contact",
      title: "Contact Us",
      content: [
        "For any questions, concerns, or legal inquiries, contact us at:",
        "📧 Email: hunter@greedHunter.com",
        "🌍 Website: www.greedHunter.com",
      ],
    },
  ];

  // Custom CSS for animations
  const customCSS = `
    @keyframes pulse {
      0% { opacity: 0.6; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.05); }
      100% { opacity: 0.6; transform: scale(1); }
    }
    
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes glow {
      0% { text-shadow: 0 0 5px rgba(255, 220, 0, 0.5); }
      50% { text-shadow: 0 0 20px rgba(255, 220, 0, 0.8); }
      100% { text-shadow: 0 0 5px rgba(255, 220, 0, 0.5); }
    }
    
    @keyframes borderPulse {
      0% { border-color: rgba(169, 92, 232, 0.4); }
      50% { border-color: rgba(169, 92, 232, 1); }
      100% { border-color: rgba(169, 92, 232, 0.4); }
    }
  `;

  return (
    <>
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <style>{customCSS}</style>

      {/* Header */}
      <header
        className="bg-gray-900 border-b border-purple-700 top-0 shadow-lg"
        style={{
          boxShadow: "0 4px 20px rgba(169, 92, 232, 0.3)",
        }}
      >
        <div className="container mx-auto py-6 px-4">
          <div className="flex justify-center items-center mb-2">
            <h1
              className="text-3xl md:text-4xl font-bold text-center"
              style={{
                background: "linear-gradient(90deg, #a95ce8 0%, #ffdc00 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "glow 3s infinite",
              }}
            >
              GreedHunter
            </h1>
          </div>
          <h2 className="text-xl md:text-2xl text-center text-yellow-300 font-semibold">
            Terms & Conditions
          </h2>
        </div>
      </header>

      {/* Scroll indicator */}
      {showScrollIndicator && (
        <div
          className="fixed bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20"
          style={{
            animation: "pulse 2s infinite",
            transition: "opacity 0.5s ease-in-out",
          }}
        >
          <p className="text-yellow-300 mb-2">Scroll Down</p>
          <div className="w-6 h-10 rounded-full border-2 border-yellow-300 flex justify-center">
            <div
              className="w-2 h-2 bg-yellow-300 rounded-full mt-2"
              style={{
                animation: "fadeInUp 1.5s infinite",
              }}
            ></div>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div
          className="mb-8 p-6 bg-gray-800 rounded-lg border border-purple-700 shadow-md transition-all duration-300 hover:shadow-lg"
          style={{
            animation: "fadeInUp 0.5s ease-out",
          }}
        >
          <p className="text-lg">
            Welcome to GreedHunter! These Terms and Conditions ("Terms") govern
            your access and use of GreedHunter.com, including all related
            services, features, content, and applications. By using our
            platform, you agree to comply with these Terms. If you do not agree,
            please do not use GreedHunter.
          </p>
          <p className="mt-4 text-lg">
            For any questions or concerns regarding these Terms, you can contact
            us at{" "}
            <a
              href="mailto:hunter@greedHunter.com"
              className="text-yellow-300 hover:underline transition-colors duration-300"
            >
              hunter@greedHunter.com
            </a>
            .
          </p>
        </div>

        {/* Table of Contents */}
        <div
          className="mb-8 lg:top-24"
          style={{ animation: "fadeInUp 0.7s ease-out" }}
        >
          <h3 className="text-xl font-semibold mb-4 text-purple-400 pl-2 border-l-4 border-yellow-300">
            Table of Contents
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {sections.map((section, index) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-gray-300 hover:text-yellow-300 transition-colors duration-300 p-2 rounded-md hover:bg-gray-800"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById(section.id)
                    .scrollIntoView({ behavior: "smooth" });
                }}
                style={{ animation: `fadeInUp ${0.7 + index * 0.1}s ease-out` }}
              >
                {index + 1}. {section.title}
              </a>
            ))}
          </div>
        </div>

        {/* Sections */}
        {sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            className={`mb-10 p-6 rounded-lg transition-all duration-500 ${
              activeSection === section.id
                ? "bg-gray-800 border-2 border-purple-500"
                : "bg-gray-800/80 border border-purple-700/50 hover:border-purple-600"
            }`}
            style={{
              animation: `fadeInUp ${0.8 + index * 0.1}s ease-out`,
              boxShadow:
                activeSection === section.id
                  ? "0 0 20px rgba(168, 85, 247, 0.3)"
                  : "none",
            }}
            onMouseEnter={() => setActiveSection(section.id)}
            onMouseLeave={() => setActiveSection(null)}
          >
            <h2 className="text-2xl font-bold mb-4 text-yellow-300 flex items-center">
              <span className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center mr-3 text-lg">
                {index + 1}
              </span>
              {section.title}
            </h2>
            <div className="space-y-3 pl-4 border-l-2 border-purple-700">
              {section.content.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-gray-300 transition-all duration-300"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}

        {/* Acknowledgement */}
        <div
          className="mt-12 mb-16 text-center"
          style={{ animation: "fadeInUp 1.2s ease-out" }}
        >
          <p className="text-lg text-yellow-300">
            Thank you for being a part of GreedHunter! 🎯🚀
          </p>
        </div>
      </main>

      {/* Footer */}
      {/* <footer className="bg-gray-900 border-t border-purple-700 py-8" style={{ 
        boxShadow: '0 -4px 20px rgba(169, 92, 232, 0.3)' 
      }}>
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} GreedHunter. All Rights Reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <a href="#" className="text-gray-400 hover:text-yellow-300 transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-yellow-300 transition-colors duration-300">Support</a>
            <a href="#" className="text-gray-400 hover:text-yellow-300 transition-colors duration-300">Contact</a>
          </div>
        </div>
      </footer> */}

      {/* Back to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 bg-purple-700 hover:bg-purple-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-20 hover:scale-110"
        style={{
          opacity: showScrollIndicator ? 0 : 1,
          transform: showScrollIndicator ? "scale(0)" : "scale(1)",
          transition: "opacity 0.3s, transform 0.3s",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </div>
          <Footer />
          </>
  );
};

export default TermsAndConditionsPage;
