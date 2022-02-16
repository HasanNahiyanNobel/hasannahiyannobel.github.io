startMain();

function startMain() {
  // Define pseudo-constants
  let jsRequiredDivName = `js-disabled`;

  // Get document elements
  let images = document.getElementsByTagName(`img`);
  let spinner = document.getElementById(`ms`);
  let mainDiv = document.getElementById(`md`);
  let noJsDiv = document.getElementById(`mnjd`);
  let jsRequiredDivs = document.getElementsByClassName(jsRequiredDivName);

  // Well, we are upto this point because JS is enabled,
  // so remove the no-js div first, and then display the JS-required ones
  noJsDiv.classList.add(`d-none`);
  Array.from(jsRequiredDivs).forEach(item => {
    item.classList.remove(jsRequiredDivName);
  });

  // Function to check whether all the images has been loaded
  function hasAllTheImagesBeenLoaded() {
    for (let image of images) {
      if (!image.complete) return false;
    }
    return true;
  }

  // Schedule the interval to check whether all the images has been loaded
  let interval = setInterval(() => {
    if (hasAllTheImagesBeenLoaded()) {
      spinner.classList.add(`d-none`);
      mainDiv.classList.remove(`d-none`);
      clearInterval(interval);
    }
  }, 100);

  // As the interval works, make all the images disabled :3
  for (let image of images) {
    image.style.pointerEvents = `none`;
    image.classList.add(`noselect`);
  }
}
