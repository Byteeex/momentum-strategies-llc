import { createRoot } from "react-dom/client";
import { InteractiveHoverLinks, type InteractiveLink } from "@/components/ui/interactive-hover-links";
import "./hover-links.css";

const links: InteractiveLink[] = [
  { heading: "Services", subheading: "Every phase of the federal lifecycle", imgSrc: "assets/hover/services.jpg", href: "#services" },
  { heading: "Our approach", subheading: "A connected operating model", imgSrc: "assets/hover/approach.jpg", href: "#approach" },
  { heading: "About", subheading: "Get to know Momentum Strategies", imgSrc: "assets/hover/about.jpg", href: "#about" },
  { heading: "Start a conversation", subheading: "Tell us what you are building", imgSrc: "assets/hover/contact.jpg", href: "#contact" },
];

const mount = document.getElementById("interactive-hover-links-root");
if (mount) {
  createRoot(mount).render(
    <>
      <div className="hover-links-intro"><div className="hover-links-intro-inner"><p>EXPLORE MOMENTUM</p><h2>Find your <span>next move.</span></h2></div></div>
      <InteractiveHoverLinks links={links} />
    </>
  );
}
