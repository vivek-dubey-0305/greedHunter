import React from "react";
import { useNavigate } from "react-router-dom";
import { randomCode, randomUniqueCode } from "../utils/securedRoutes";
import Footer from "../components/Footer";

const CancellationRefund = () => {
  const navigate = useNavigate();
    return (
      <>
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-3xl mx-auto bg-gradient-to-b from-purple-900 to-black p-8 rounded-2xl shadow-lg border border-purple-500">
        <h1 className="text-3xl font-bold text-yellow-400 text-center mb-6">
          Cancellation & Refund Policy
        </h1>

        <p className="text-gray-300 text-lg mb-4">
          At <span className="text-yellow-400 font-semibold">GreedHunter</span>,
          we strive to provide the best experience possible. However, we
          understand that circumstances may require cancellations and refunds.
          Below are the terms of our policy:
        </p>

        <div className="space-y-6">
          <div className="p-4 bg-purple-950 bg-opacity-50 rounded-lg border border-purple-700">
            <h2 className="text-xl font-semibold text-yellow-400">
              Event & Quiz Cancellations
            </h2>
            <p className="text-gray-300 mt-2">
              - If an event or quiz is canceled by GreedHunter, registered users
              will receive a full refund within 7 business days.
            </p>
            <p className="text-gray-300 mt-1">
              - Users can request cancellations up to 24 hours before an event
              starts for a 50% refund.
            </p>
          </div>

          <div className="p-4 bg-purple-950 bg-opacity-50 rounded-lg border border-purple-700">
            <h2 className="text-xl font-semibold text-yellow-400">
              Refund Eligibility
            </h2>
            <p className="text-gray-300 mt-2">
              - Refunds are only applicable to paid events and quizzes.
            </p>
            <p className="text-gray-300 mt-1">
              - No refunds will be issued for digital goods, such as
              downloadable content.
            </p>
          </div>

          <div className="p-4 bg-purple-950 bg-opacity-50 rounded-lg border border-purple-700">
            <h2 className="text-xl font-semibold text-yellow-400">
              How to Request a Refund?
            </h2>
            <p className="text-gray-300 mt-2">
              - Submit a refund request through your{" "}
              <span
                className="text-yellow-400 cursor-pointer"
                onClick={() =>
                  navigate(
                    `/hunter/hunter dashboard/${randomUniqueCode + randomCode}`
                  )
                }
              >
                dashboard
              </span>{" "}
              within the eligible period.
            </p>
            <p className="text-gray-300 mt-1">
              - Refunds will be processed within 5-10 business days.
            </p>
          </div>
        </div>

        <p className="text-gray-400 text-sm mt-6 text-center">
          If you have any concerns, contact us at{" "}
          <a className="text-yellow-400 cursor-pointer" href="mailto:hunter@greedhunter.com">hunter@greedhunter.com</a>
        </p>
      </div>
      </div>
      <Footer />
      </>
  );
};

export default CancellationRefund;
