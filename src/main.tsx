import { createRoot } from "react-dom/client";
import { InteractiveHoverLinks, type InteractiveLink } from "@/components/ui/interactive-hover-links";
import "./hover-links.css";

const links: InteractiveLink[] = [
  { heading: "Services", imgSrc: "assets/blueprint-meeting.webp", href: "#services" },
  { heading: "Our approach", imgSrc: "assets/la-construction.webp", href: "#approach" },
  { heading: "About", imgSrc: "assets/houston-construction.webp", href: "#about" },
  { heading: "Start a conversation", imgSrc: "assets/contact-handshake.webp", href: "#contact" },
];

const mount = document.getElementById("interactive-hover-links-root");
if (mount) {
  createRoot(mount).render(<InteractiveHoverLinks links={links} />);
}
