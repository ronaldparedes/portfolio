import "waypoints/lib/noframework.waypoints.min.js";
declare const Waypoint: any;

/**
 * Nav Items Hightlighting functionality
 */
export default class NavHighlighter {
  sections: NodeList;
  navLinks: HTMLElement;
  linkArr = [];
  sectWaypointsDown = [];
  sectWaypointsUp = [];
  constructor() {
    this.sections = document.querySelectorAll("section");
    this.navLinks = document.querySelector(".link-wrap");
    this.linkArr = Array.from(this.navLinks.children);
  }
  init() {
    this.sections.forEach((section: HTMLElement) => {
      const sectTitle = section.dataset.title;
      this.sectWaypointsDown.push(
        new Waypoint({
          element: section,
          offset: "60%",
          handler: (direction: string) =>
            this.handleHighlight(direction, sectTitle)
        })
      );
      this.sectWaypointsUp.push(
        new Waypoint({
          element: section,
          offset: "20%",
          handler: (direction: string) =>
            this.handleHighlight(direction, sectTitle)
        })
      );
    });
  }

  handleHighlight(direction: string, sectTitle: string) {
    const selectedNavLink = this.navLinks.querySelector(`.link--${sectTitle}`);
    this.linkArr.forEach(link => {
      link.classList.remove("link--selected");
    });
    if (direction === "down") {
      selectedNavLink.classList.add("link--selected");
    } else {
      selectedNavLink.previousElementSibling.classList.add("link--selected");
    }
  }
}
