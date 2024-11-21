/**
 * Adds a typewriter effect to all elements with the class 'typewriter'.
 *
 * This function hides all elements with the 'typewriter' class initially,
 * then displays and types out their text content one character at a time,
 * simulating a typewriter effect. The typing speed varies randomly between
 * a minimum and maximum speed for a more natural effect.
 */
function addTypeEffect() {
  const typeWriters = document.querySelectorAll('.typewriter');
  let i = 0;
  const minSpeed = 30;
  const maxSpeed = 150;
  const caret = '_';

  function typeElement(element, text, callback) {
    let j = 0;

    function type() {
      if (j < text.length) {
        element.textContent = text.substring(0, j + 1) + caret;
        j++;
        const randomSpeed = Math.floor(
            Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed;
        setTimeout(type, randomSpeed);
      } else {
        element.textContent = text; // Remove caret after typing is done
        if (callback) {
          callback();
        }
      }
    }

    type();
  }

  function typeNextElement() {
    if (i < typeWriters.length) {
      const element = typeWriters[i];
      const text = element.textContent;
      element.textContent = '';
      element.style.display = 'block'; // Ensure the element is visible
      typeElement(element, text, typeNextElement);
      i++;
    }
  }

  // Initially hide all elements
  typeWriters.forEach(el => el.style.display = 'none');
  typeNextElement();
}

addTypeEffect();
