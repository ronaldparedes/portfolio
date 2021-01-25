export default class LazyLoader {
  lazyMedia: [];
  constructor() {
    this.lazyMedia = [].slice.call(document.querySelectorAll(".lazy"));
    document.addEventListener("DOMContentLoaded", () =>
      this.lazyLoadPortfolio()
    );
  }
  lazyLoadPortfolio() {
    require("../assets/vcard.mp4");
    require("../assets/tangram.mp4");
    require("../assets/vcard.png");
    require("../assets/tangram.png");
    require("../assets/cacho.jpg");
    require("../assets/cacho.mp4");
    require("../assets/website.jpg");
    require("../assets/website.mp4");
    require("../assets/optimal1.jpg");
    require("../assets/optimal.mp4");
    require("../assets/d3-projects.png");
    require("../assets/d3-projects.mp4");

    if ("IntersectionObserver" in window) {
      const lazyMediaObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((mediaItem) => {
            if (mediaItem.isIntersecting) {
              (mediaItem.target as HTMLVideoElement).src = require(`../assets/${
                (mediaItem.target as HTMLVideoElement).dataset.src
              }`);
              mediaItem.target.classList.remove("lazy");
              lazyMediaObserver.unobserve(mediaItem.target);
            }
          });
        }
      );
      this.lazyMedia.forEach((lazyItem) => {
        lazyMediaObserver.observe(lazyItem);
      });
    } else {
      console.log("Browser Does Not support IntersectionObserver");
    }
  }
}
