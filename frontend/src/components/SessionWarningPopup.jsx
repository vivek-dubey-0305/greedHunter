import React from "react";
import { motion } from "framer-motion";

const SessionWarningPopup = () => {
//   if (remainingTime > 30 || remainingTime <= 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed bottom-5 right-5 bg-red-600 text-white px-5 py-3 rounded-lg shadow-lg text-sm"
    >
      ⚠️ Your session will expire in <b>xxx</b> seconds! <br />
      Please refresh the page.
    </motion.div>
  );
};

export default SessionWarningPopup;
