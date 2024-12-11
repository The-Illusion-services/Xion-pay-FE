import { motion, AnimatePresence } from "framer-motion";

const ErrorToastMessage = ({
  error = true,
  message,
}: {
  error?: boolean;
  message: string;
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -20, opacity: 0.5 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0.2 }}
      >
        <div
          className={`flex w-[85%] m-auto mb-4 px-4 text-sm ${
            error ? "bg-red-200" : "bg-green-50"
          } rounded-full border border-1 ${
            error ? "border-red-500" : "border-green-500"
          }`}
        >
          <p
            className={`py-3 m-0 ${
              error ? "text-red-800" : "text-teal-800"
            } font-book`}
          >
            {message}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ErrorToastMessage;
