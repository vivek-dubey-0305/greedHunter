import React, { useState } from "react";
import Footer from "../components/Footer";

const PrivacyPolicyPage = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (index) => {
    if (expandedSection === index) {
      setExpandedSection(null);
    } else {
      setExpandedSection(index);
    }
  };

  const sections = [
    {
      title: "1. Information We Collect",
      content: (
        <div>
          <p className="mb-4">
            We collect different types of information to provide and improve our
            services.
          </p>

          <h4 className="font-bold text-yellow-300 mb-2">
            1.1. Information You Provide to Us
          </h4>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>
              <span className="text-yellow-300">Account Information</span> –
              When you register, we collect your username, full name, email,
              phone number, password, and study level (school or college).
            </li>
            <li>
              <span className="text-yellow-300">Profile Details</span> – If you
              complete your profile, we may collect additional details like
              college name, course, semester, enrollment number, or school name
              and standard.
            </li>
            <li>
              <span className="text-yellow-300">Event Participation Data</span>{" "}
              – When you enroll in events or quizzes, we collect details about
              your participation, performance, and rewards.
            </li>
            <li>
              <span className="text-yellow-300">Payment Information</span> – If
              you make payments on our platform, we collect transaction details,
              but we do not store your payment card details. Payments are
              securely processed by Razorpay or other third-party payment
              gateways.
            </li>
            <li>
              <span className="text-yellow-300">Support & Feedback</span> – If
              you contact support or submit feedback, we collect your name,
              email, and message content.
            </li>
          </ul>

          <h4 className="font-bold text-yellow-300 mb-2">
            1.2. Information Collected Automatically
          </h4>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>
              <span className="text-yellow-300">Device & Usage Data</span> – We
              collect IP addresses, browser type, device type, operating system,
              and access time when you visit our website.
            </li>
            <li>
              <span className="text-yellow-300">
                Cookies & Tracking Technologies
              </span>{" "}
              – We use cookies, session storage, and tracking pixels to improve
              user experience, store login sessions, and analyze interactions.
            </li>
            <li>
              <span className="text-yellow-300">Game & Quiz Analytics</span> –
              We track scores, attempts, time spent, and activity logs to
              personalize user experience.
            </li>
          </ul>

          <h4 className="font-bold text-yellow-300 mb-2">
            1.3. Information from Third Parties
          </h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              If you log in via Google OAuth, we may receive your Google ID,
              email, and profile picture.
            </li>
            <li>
              Payment Partners (Razorpay, UPI, etc.) provide us with transaction
              details but not card information.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "2. How We Use Your Information",
      content: (
        <div>
          <p className="mb-4">We use the collected information to:</p>
          <ul className="list-none pl-6 mb-4 space-y-1">
            <li>✅ Provide access to quizzes, games, and events.</li>
            <li>✅ Verify user identity and eligibility for rewards.</li>
            <li>✅ Process payments and withdrawals securely.</li>
            <li>✅ Improve our platform, features, and user experience.</li>
            <li>
              ✅ Send important notifications (event reminders, updates,
              security alerts).
            </li>
            <li>✅ Prevent fraud, cheating, and ensure platform security.</li>
            <li>✅ Comply with legal obligations and enforce our terms.</li>
          </ul>
        </div>
      ),
    },
    {
      title: "3. Sharing Your Information",
      content: (
        <div>
          <p className="mb-4">
            We do not sell or rent your personal data. However, we may share
            information in the following cases:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <span className="text-yellow-300">With Event Organizers</span> –
              If you enroll in third-party-hosted events, relevant data like
              your name and email may be shared.
            </li>
            <li>
              <span className="text-yellow-300">With Payment Providers</span> –
              To process payments, we share transaction details with Razorpay,
              UPI, or banks.
            </li>
            <li>
              <span className="text-yellow-300">For Legal Reasons</span> – We
              may disclose information if required by law, court order, or to
              prevent fraud, hacking, or threats.
            </li>
            <li>
              <span className="text-yellow-300">With Service Providers</span> –
              We work with email services, analytics providers, and hosting
              services that may process data on our behalf.
            </li>
            <li>
              <span className="text-yellow-300">During Business Transfers</span>{" "}
              – In case of a merger, acquisition, or asset sale, user data may
              be transferred to the new entity.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "4. Data Security",
      content: (
        <div>
          <p className="mb-4">
            We take strong security measures to protect your data:
          </p>
          <ul className="list-none pl-6 mb-4 space-y-1">
            <li>
              ✅ <span className="text-yellow-300">Encryption</span> – All
              sensitive data is encrypted during transmission using SSL/TLS.
            </li>
            <li>
              ✅ <span className="text-yellow-300">Secure Login</span> –
              Passwords are hashed and never stored in plaintext.
            </li>
            <li>
              ✅ <span className="text-yellow-300">Access Controls</span> – Only
              authorized personnel can access user data.
            </li>
            <li>
              ✅{" "}
              <span className="text-yellow-300">Regular Security Audits</span> –
              We perform security checks to prevent data breaches.
            </li>
          </ul>
          <p>
            However, no system is 100% secure. We recommend using strong
            passwords and enabling two-factor authentication (2FA) for added
            security.
          </p>
        </div>
      ),
    },
    {
      title: "5. Your Rights & Choices",
      content: (
        <div>
          <p className="mb-4">You have control over your data:</p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>
              <span className="text-yellow-300">Access & Correction</span> – You
              can view and update your profile details from your dashboard
              settings.
            </li>
            <li>
              <span className="text-yellow-300">Account Deletion</span> – You
              can request account deletion by contacting support.
            </li>
            <li>
              <span className="text-yellow-300">Email Preferences</span> –
              Unsubscribe from marketing emails anytime.
            </li>
            <li>
              <span className="text-yellow-300">Cookies Management</span> – You
              can disable cookies in your browser settings.
            </li>
          </ul>
          <p>
            To request any of the above, contact us at{" "}
            <a
              href="mailto:hunter@greedhunter.com"
              className="text-purple-400 hover:text-yellow-300"
            >
              hunter@greedhunter.com
            </a>
            .
          </p>
        </div>
      ),
    },
    {
      title: "6. Data Retention Policy",
      content: (
        <div>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>
              <span className="text-yellow-300">Active Accounts</span> – We keep
              user data as long as the account is active.
            </li>
            <li>
              <span className="text-yellow-300">Inactive Accounts</span> – Data
              may be deleted after 24 months of inactivity.
            </li>
            <li>
              <span className="text-yellow-300">Event & Payment Records</span> –
              Retained for 5 years for compliance and security.
            </li>
          </ul>
          <p>
            If you delete your account, some records (like transactions) may be
            retained for legal reasons.
          </p>
        </div>
      ),
    },
    {
      title: "7. Cookies & Tracking Technologies",
      content: (
        <div>
          <p className="mb-4">We use cookies to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Remember login sessions.</li>
            <li>Store game progress and scores.</li>
            <li>Analyze site traffic and improve performance.</li>
          </ul>
          <p>
            You can disable cookies in your browser, but some features may not
            work properly.
          </p>
        </div>
      ),
    },
    {
      title: "8. Third-Party Links & Services",
      content: (
        <div>
          <p>
            Our platform may contain links to external websites, sponsors, or
            event organizers. We are not responsible for their privacy policies.
            Always read their policies before sharing data.
          </p>
        </div>
      ),
    },
    {
      title: "9. Children's Privacy (Under 13)",
      content: (
        <div>
          <p>
            GreedHunter is not intended for children under 13. If we discover
            that a minor has registered, we will delete the account immediately.
            Parents can contact{" "}
            <a
              href="mailto:hunter@greedhunter.com"
              className="text-purple-400 hover:text-yellow-300"
            >
              hunter@greedhunter.com
            </a>{" "}
            for concerns.
          </p>
        </div>
      ),
    },
    {
      title: "10. Changes to This Privacy Policy",
      content: (
        <div>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>
              We may update this Privacy Policy occasionally. The latest version
              will always be available on{" "}
              <a href="#" className="text-purple-400 hover:text-yellow-300">
                GreedHunter.com/privacy-policy
              </a>
              .
            </li>
            <li>If major changes occur, we will notify users via email.</li>
            <li>
              Your continued use of GreedHunter means you accept the updated
              policy.
            </li>
          </ul>
          <p>Last Updated: 21 March 2025</p>
        </div>
      ),
    },
    {
      title: "11. Contact Us",
      content: (
        <div>
          <p className="mb-4">
            For any privacy-related questions, contact us at:
          </p>
          <p>
            📧 Email:{" "}
            <a
              href="mailto:hunter@greedhunter.com"
              className="text-purple-400 hover:text-yellow-300"
            >
              hunter@greedhunter.com
            </a>
          </p>
          {/* <p>📍 Address: [Insert Company Address]</p> */}
          <p className="mt-4">
            This Privacy Policy ensures that GreedHunter.com follows
            transparency, security, and compliance best practices. 🚀
          </p>
        </div>
      ),
    },
  ];

  return (
    <>
    <div className="min-h-screen bg-gray-900 text-gray-200 pb-16">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">
              Privacy Policy
            </h2>
            <p className="text-lg mb-2">Last Updated: [21 March 2025]</p>
            <div className="h-1 w-32 bg-purple-600 rounded mb-6"></div>
            <p className="mb-6">
              Welcome to GreedHunter.com We respect your privacy and are
              committed to protecting your personal data. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you visit our website and participate in our
              quizzes, games, and events.
            </p>
            <p className="mb-6">
              By accessing or using GreedHunter, you agree to the terms outlined
              in this Privacy Policy. If you do not agree, please do not use our
              services.
            </p>
          </div>

          {/* Accordion-style sections */}
          <div className="space-y-4">
            {sections.map((section, index) => (
              <div
                key={index}
                className="border border-purple-800 rounded-lg overflow-hidden bg-gray-800"
              >
                <button
                  className="w-full text-left p-4 flex justify-between items-center hover:bg-gray-700 transition-colors"
                  onClick={() => toggleSection(index)}
                >
                  <h3 className="text-xl font-medium text-yellow-400">
                    {section.title}
                  </h3>
                  <span className="text-purple-400 text-2xl">
                    {expandedSection === index ? "−" : "+"}
                  </span>
                </button>
                {expandedSection === index && (
                  <div className="p-4 pt-0 border-t border-purple-800 text-gray-300">
                    {section.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
          <Footer />
          </>
  );
};

export default PrivacyPolicyPage;
