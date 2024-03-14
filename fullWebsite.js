function dragCarousel() {
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

      if (parseInt(innerContainer.style.left) > 250) {
        // innerContainer.style.left = "0px";
        innerContainer.style.left = "250px";
      }

      if (inner.right < outer.right - 250) {
        // innerContainer.style.left = `-${inner.width - outer.width}px`;
        innerContainer.style.left = inner.width - outer.width - 550 + "px";
      }
    };
    container.addEventListener("mousemove", (e) => {
      if (!pressed) return;
      e.preventDefault();

      x = e.offsetX;
      innerContainer.style.left = `${x - startX}px`;
      boundItems();
    });
  });
}
function swipeContainerLeft(e) {
  e.currentTarget.style.transition = "none";
  e.currentTarget.style.transform = "translateX(100px)";
  e.currentTarget.style.left = (Number(e.currentTarget.style.left.replace('px', '')) - 100) + "px";
}
function swipeContainerRight(e) {
  e.currentTarget.style.transition = "none";
  e.currentTarget.style.transform = "translateX(0)";
  e.currentTarget.style.left = (Number(e.currentTarget.style.left.replace('px', '')) + 100) + "px";
}
function swipeContainerLeftElement(el) {
  el.style.transition = "none";
  el.style.transform = "translateX(0)";
  el.style.left = (Number(el.style.left.replace('px', '')) - 100) + "px";
}
function swipeContainerRightElement(el) {
  el.style.transition = "none";
  el.style.transform = "translateX(0)";
  el.style.left = (Number(el.style.left.replace('px', '')) + 100) + "px";
}
function navigateCarousel() {
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
      if (inner.right <= outer.right - 250) {
        // innerContainer.style.left = `-${inner.width - outer.width}px`;
        innerContainer.style.left = inner.width - outer.width - 550 + "px";
        return;
      }
      innerContainer.style.transition = "transform 0.5s ease-in-out";
      innerContainer.style.transform = "translateX(-100px)";
      const timeOutID = setTimeout(function(){swipeContainerLeftElement(innerContainer)},500);
    });

    // rightArrow.parentElement.children[0].children[1].addEventListener("transitionend", swipeContainerRight);
    rightArrow.addEventListener("click", (e) => {
      e.stopPropagation();
      const innerContainer = e.currentTarget.parentElement.children[0].children[1];
      if (parseInt(innerContainer.style.left) >= 250) {
        innerContainer.style.left = "250px";
          return;
      }
    
      innerContainer.style.transition = "transform 0.5s ease-in-out";
      innerContainer.style.transform = "translateX(100px)";
      const timeOutID = setTimeout(function(){swipeContainerRightElement(innerContainer)},500);
    });
  });

}
dragCarousel();
navigateCarousel();