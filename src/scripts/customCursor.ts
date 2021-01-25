import { gsap } from "gsap";

const customCursor = () => {
  if (window.orientation !== undefined) {
    document.querySelector(".custom-cursor").classList.add("mobile");
  }
  window.addEventListener("mousemove", (e) => {
    if (e.pageY < window.innerHeight) {
      gsap.to(".custom-cursor", {
        duration: 0.5,
        ease: "ease-in-out",
        x: e.pageX,
        y: e.pageY,
      });
    }
  });
};

export default customCursor;
