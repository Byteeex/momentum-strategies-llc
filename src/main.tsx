import { createRoot } from "react-dom/client";
import { InteractiveHoverLinks, type InteractiveLink } from "@/components/ui/interactive-hover-links";
import "./hover-links.css";

const links: InteractiveLink[] = [
  { heading: "Services", imgSrc: "assets/hover/services-v2.webp", href: "#services" },
  { heading: "Our approach", imgSrc: "assets/hover/approach-v2.webp", href: "#approach" },
  { heading: "About", imgSrc: "assets/hover/about-v2.webp", href: "#about" },
  { heading: "Start a conversation", imgSrc: "assets/hover/contact-v2.webp", href: "#contact" },
];

const mount = document.getElementById("interactive-hover-links-root");
if (mount) {
  createRoot(mount).render(<InteractiveHoverLinks links={links} />);
}
