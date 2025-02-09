import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

function DisclaimerModal() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // Prevent scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-black rounded-lg p-6 max-w-2xl relative animate-fade-in">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition-colors"
        >
          <FiX size={24} />
        </button>
        
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Portfolio Disclaimer</h2>
        
        <div className="prose prose-invert">
          <p className="text-gray-300 leading-relaxed mb-4">
            This website is solely intended to showcase my skills and work as part of my professional portfolio. It serves as a platform to demonstrate my capabilities, creativity, and expertise across various projects and disciplines.
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            Please note that the content displayed here is meant to highlight my proficiency and is not for commercial or personal use beyond that context. It reflects my ongoing development and serves as a representation of my abilities for prospective clients or employers.
          </p>
        </div>

        <button
          onClick={() => setIsOpen(false)}
          className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors w-full"
        >
          I Understand
        </button>
      </div>
    </div>
  );
}

export default DisclaimerModal;