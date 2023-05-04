import { motion } from "framer-motion";
import { IconType } from "./index";

interface ArrowType extends IconType {
  bordered?: boolean;
  animated?: boolean;
}

export const ArrowDownIcon = ({
  width,
  height,
  color,
  bordered = true,
  animated = true,
}: ArrowType) => (
  <motion.svg
    animate={animated && { y: [0, 0, 0, 0, -16, 0, -8, 0, 0, 0, 0] }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      repeatDelay: 1,
      ease: "easeInOut",
    }}
    width={width || "48"}
    height={height || "48"}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {bordered && (
      <rect
        x="0.5"
        y="0.5"
        width="47"
        height="47"
        rx="23.5"
        fill="white"
        fillOpacity="0.6"
        stroke={color || "#252223"}
      />
    )}

    <path
      d="M24 17V31"
      stroke={color || "#252223"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M31 24L24 31L17 24"
      stroke={color || "#252223"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.svg>
);
