startMain();

function startMain() {
  // Define pseudo-constants
  const jsRequiredDivName = `js-disabled`;

  // Get document elements
  const spinner = document.getElementById(`ms`);
  const mainDiv = document.getElementById(`md`);
  const noJsDiv = document.getElementById(`mnjd`);
  const jsRequiredDivs = document.getElementsByClassName(jsRequiredDivName);
  const images = document.getElementsByTagName(`img`);
  const videos = document.getElementsByTagName(`video`);

  // Well, we are upto this point because JS is enabled,
  // so remove the no-js div first, and then display the JS-required ones
  noJsDiv.classList.add(`d-none`);
  Array.from(jsRequiredDivs).forEach(item => {
    item.classList.remove(jsRequiredDivName);
  });

  // Schedule the interval to check whether all the images has been loaded
  let interval = setInterval(() => {
    if (hasAllTheImagesBeenLoaded()) {
      spinner.classList.add(`d-none`);
      mainDiv.classList.remove(`d-none`);
      clearInterval(interval);
    }
  }, 100);

  // As the interval works, make all the images non-selectable :3
  for (let image of images) {
    image.style.pointerEvents = `none`;
    image.classList.add(`noselect`);
  }

  // Also make all the videos non-selectable
  for (let video of videos) {
    video.style.pointerEvents = `none`;
    video.classList.add(`noselect`);
  }

  // Functions
  function hasAllTheImagesBeenLoaded() {
    /**
     * Returns true if all the images has been loaded.
     * Otherwise, returns false.
     */
    for (let image of images) {
      if (!image.complete) return false;
    }
    return true;
  }
}
