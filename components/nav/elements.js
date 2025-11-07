import { motion, AnimatePresence } from "framer-motion";
import Iconify from "@/components/icon";
import classNames from "classnames";

export const Description = ({ text }) => {
  return (
    <div className="relative h-5">
      <AnimatePresence mode="wait">
        <motion.p
          animate={{ opacity: 0.75, y: 0 }}
          transition={{ duration: 0.15 }}
          initial={{ opacity: 0, y: 5 }}
          exit={{ opacity: 0, y: -5 }}
          className="text-sm"
          key={text}
        >
          {text}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export const Icon = ({ icon, isStackHovered }) => {
  const isUrl = typeof icon === "string" && icon.startsWith("http");

  if (isUrl) {
    return (
      <div
        className="w-[52px] h-[52px] rounded-secondary bg-cover bg-center bg-no-repeat transition"
        style={{ backgroundImage: `url(${icon})` }}
      />
    );
  }

  return (
    <div
      className={classNames(
        "flex items-center justify-center size-[52px] rounded-secondary bg-base/5 transition",
        {
          "bg-primary text-white": isStackHovered,
        }
      )}
    >
      <span className="text-2xl">
        <Iconify size={30} icon={icon} />
      </span>
    </div>
  );
};

export const Title = ({ text }) => {
  return <h3 className="font-semibold text-base pr-4">{text}</h3>;
};
