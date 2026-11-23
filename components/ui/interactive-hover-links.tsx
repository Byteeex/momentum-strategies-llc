import { useMotionValue, motion, useSpring, useTransform } from "motion/react";
import React, { useRef } from "react";
import { ArrowRight } from "lucide-react";

export interface InteractiveLink {
  heading: string;
  imgSrc: string;
  href: string;
}

interface InteractiveHoverLinksProps {
  links?: InteractiveLink[];
}

export function InteractiveHoverLinks({
  links = INTERACTIVE_LINKS,
}: InteractiveHoverLinksProps) {
  return (
    <section className="bg-background w-full p-4 md:px-8 md:py-16" aria-label="Explore Momentum Strategies">
      <div className="mx-auto max-w-5xl">
        {links.map((link) => (
          <Link key={link.heading} {...link} />
        ))}
      </div>
    </section>
  );
}

function Link({ heading, imgSrc, href }: InteractiveLink) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "40%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  return (
    <motion.a
      href={href}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      initial="initial"
      whileHover="whileHover"
      className="group relative flex items-center justify-between border-b-2 border-muted py-4 transition-colors duration-500 hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground md:py-8"
    >
      <div>
        <motion.span
          variants={{ initial: { x: 0 }, whileHover: { x: -16 } }}
          transition={{ type: "spring", staggerChildren: 0.075, delayChildren: 0.25 }}
          className="relative z-10 block text-4xl font-bold text-muted-foreground transition-colors duration-500 group-hover:text-foreground md:text-6xl"
          aria-label={heading}
        >
          {heading.split("").map((letter, index) => (
            <motion.span
              variants={{ initial: { x: 0 }, whileHover: { x: 16 } }}
              transition={{ type: "spring" }}
              className="inline-block"
              key={index}
              aria-hidden="true"
            >
              {letter === " " ? "\u00a0" : letter}
            </motion.span>
          ))}
        </motion.span>
      </div>

      <motion.img
        style={{ top, left, translateX: "-10%", translateY: "-50%" }}
        variants={{ initial: { scale: 0, rotate: "-12.5deg" }, whileHover: { scale: 1, rotate: "12.5deg" } }}
        transition={{ type: "spring" }}
        src={imgSrc}
        className="pointer-events-none absolute z-0 h-24 w-32 rounded-lg object-cover shadow-lg md:h-48 md:w-64"
        alt=""
        aria-hidden="true"
        loading="lazy"
      />
      <div className="overflow-hidden">
        <motion.div
          variants={{ initial: { x: "100%", opacity: 0 }, whileHover: { x: "0%", opacity: 1 } }}
          transition={{ type: "spring" }}
          className="relative z-10 p-4"
        >
          <ArrowRight className="size-8 text-foreground md:size-12" aria-hidden="true" />
        </motion.div>
      </div>
    </motion.a>
  );
}

export const INTERACTIVE_LINKS: InteractiveLink[] = [
  { heading: "Services", imgSrc: "assets/blueprint-meeting.webp", href: "#services" },
  { heading: "Our approach", imgSrc: "assets/la-construction.webp", href: "#approach" },
  { heading: "About", imgSrc: "assets/houston-construction.webp", href: "#about" },
  { heading: "Start a conversation", imgSrc: "assets/contact-handshake.webp", href: "#contact" },
];
