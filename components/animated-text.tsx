import { motion } from "motion/react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
  hiddenX?: number;
  hiddenY?: number;
  hiddenBlur?: string;
}

export function AnimatedText({
  text,
  className = "",
  delayChildren = 0.025,
  staggerChildren = 0.0125,
  hiddenX = -8,
  hiddenY = 0,
  hiddenBlur = "blur(2px)",
}: AnimatedTextProps) {
  const words = text.split(" ");

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren,
            staggerChildren,
          },
        },
      }}
      className={className}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-pre">
          {word.split("").map((letter, letterIndex) => (
            <motion.span
              key={`${wordIndex}-${letterIndex}`}
              variants={{
                hidden: {
                  opacity: 0,
                  x: hiddenX,
                  y: hiddenY,
                  filter: hiddenBlur,
                },
                visible: {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  filter: "blur(0px)",
                },
              }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
          {wordIndex !== words.length - 1 && " "}
        </span>
      ))}
    </motion.div>
  );
}
