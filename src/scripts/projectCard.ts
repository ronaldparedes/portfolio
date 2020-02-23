export default class ProjectCard {
  projectList: NodeList;
  constructor() {
    this.projectList = document.querySelectorAll(".project");
  }
  init() {
    this.projectList.forEach((projectCard: HTMLElement) => {
      const video = projectCard.querySelector("video");
      const poster = projectCard.querySelector(".poster");
      const infoBtn = projectCard.querySelector(".info");
      const popDesc = projectCard.querySelector(".pop-desc");
      projectCard.addEventListener("mouseover", () => {
        video && video.play();
        poster.classList.add("hide");
      });
      projectCard.addEventListener("mouseleave", () => {
        if (video) {
          video.pause();
          poster.classList.remove("hide");
        }
      });
      infoBtn.addEventListener("click", () => {
        if (!popDesc.classList.contains("show")) {
          popDesc.classList.add("show");
          setTimeout(() => {
            popDesc.classList.remove("show");
          }, 4000);
        }
      });
    });
  }
}
