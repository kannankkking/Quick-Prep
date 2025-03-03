import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WritingAnimation = ({ lines }) => {
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine((prev) => (prev + 1) % lines.length); 
    }, 2000); 
    return () => clearInterval(interval);
  }, [lines]);

  return (
    <div className="text-center text-indigo-400 text-lg font-medium mt-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={lines[currentLine]}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="overflow-hidden">
          {lines[currentLine]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default WritingAnimation;
