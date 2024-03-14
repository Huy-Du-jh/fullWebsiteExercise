
function swipeContainerLeft(el) {
  el.style.transition = "none";
  el.style.transform = "translateX(0)";
  el.style.left = (Number(el.style.left.replace('px', '')) - 100) + "px";
}
function swipeContainerRight(el) {
  el.style.transition = "none";
  el.style.transform = "translateX(0)";
  el.style.left = (Number(el.style.left.replace('px', '')) + 100) + "px";
}
function handleMediaQueryChange(e) {
  if (e.matches) {
    e.parallaxImage2Offset = 400;
  }
}
function addEventListenersOnLoad() {
  window.addEventListener("load", (e) => {
    const containerArr = document.querySelectorAll(".carouselContainer");
    containerArr.forEach(container => {
      const innerContainer = container.children[1];
      let pressed = false;
      let startX;
      let x;
      container.addEventListener("mousedown", (e) => {
        pressed = true;
        startX = e.offsetX - innerContainer.offsetLeft;
        container.style.cursor = "grabbing";
      });

      container.addEventListener("mouseenter", () => {
        container.style.cursor = "grab";
      });

      container.addEventListener("mouseup", () => {
        container.style.cursor = "grab";
        pressed = false;
      });

      let boundItems = () => {
        let outer = container.getBoundingClientRect();
        let inner = innerContainer.getBoundingClientRect();

        // if (parseInt(innerContainer.style.left) > 250) {
        //   // innerContainer.style.left = "0px";
        //   innerContainer.style.left = "250px";
        // }

        // if (inner.right < outer.right - 250) {
        //   // innerContainer.style.left = `-${inner.width - outer.width}px`;
        //   innerContainer.style.left = inner.width - outer.width - 550 + "px";
        // }
      };
      container.addEventListener("mousemove", (e) => {
        if (!pressed) return;
        e.preventDefault();

        x = e.offsetX;
        innerContainer.style.left = `${x - startX}px`;
        boundItems();
      });
    });

    const leftArrowArr = document.querySelectorAll(".leftNavigate");
    leftArrowArr.forEach(leftArrow => {
      const rightArrow = leftArrow.parentElement.getElementsByClassName("rightNavigate")[0];
      // leftArrow.parentElement.children[0].children[1].addEventListener("transitionend", swipeContainerLeft);
      leftArrow.addEventListener("click", (e) => {
        e.stopPropagation();
        const innerContainer = e.currentTarget.parentElement.children[0].children[1];
        const container = innerContainer.parentElement;
        const outer = container.getBoundingClientRect();
        const inner = innerContainer.getBoundingClientRect();
        // if (inner.right <= outer.right - 250) {
        //   // innerContainer.style.left = `-${inner.width - outer.width}px`;
        //   innerContainer.style.left = inner.width - outer.width - 550 + "px";
        //   return;
        // }
        innerContainer.style.transition = "transform 0.5s ease-in-out";
        innerContainer.style.transform = "translateX(100px)";
        const timeOutID = setTimeout(function () { swipeContainerRight(innerContainer) }, 500);
      });

      // rightArrow.parentElement.children[0].children[1].addEventListener("transitionend", swipeContainerRight);
      rightArrow.addEventListener("click", (e) => {
        e.stopPropagation();
        const innerContainer = e.currentTarget.parentElement.children[0].children[1];
        // if (parseInt(innerContainer.style.left) >= 250) {
        //   innerContainer.style.left = "250px";
        //     return;
        // }

        innerContainer.style.transition = "transform 0.5s ease-in-out";
        innerContainer.style.transform = "translateX(-100px)";
        const timeOutID = setTimeout(function () { swipeContainerLeft(innerContainer) }, 500);
      });
    });

    const nav = document.getElementById("hamburgerMenuAndEmailIcon");
    const parallaxImage1 = document.getElementById("parallaxImage1");
    const parallaxImage2 = document.getElementById("parallaxImage2");
    const mediaQuery = window.matchMedia('(max-width:900px)');
    mediaQuery.parallaxImage2Offset = 250;
    mediaQuery.addEventListener("change", function () { handleMediaQueryChange(mediaQuery) });
    handleMediaQueryChange(mediaQuery);
    window.addEventListener("scroll", () => {
      let windowY = window.scrollY;
      parallaxImage1.style.top = 0.2 * windowY - 20 + "px";
      parallaxImage2.style.top = 0.2 * windowY - mediaQuery.parallaxImage2Offset + "px";
      if (windowY > 300) {

        nav.style.backgroundColor = "#18062D";
        nav.style.boxShadow = "0 2px 10px -1px black";
      }
      else {
        nav.style.backgroundColor = "transparent";
        nav.style.boxShadow = "none";
      }
    })
  })
}
addEventListenersOnLoad();