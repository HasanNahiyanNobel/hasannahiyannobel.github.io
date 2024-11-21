/**
 * Adds a typewriter effect to all elements with the class 'typewriter'.
 *
 * This function hides all elements with the 'typewriter' class initially,
 * then displays and types out their text content one character at a time,
 * simulating a typewriter effect. The typing speed varies randomly between
 * a minimum and maximum speed for a more natural effect.
 */
function addTypeEffect() {
  // Select all elements with the 'typewriter' class
  const typeWriters = document.querySelectorAll('.typewriter');
  let i = 0;
  const minSpeed = 30; // Minimum typing speed in milliseconds
  const maxSpeed = 150; // Maximum typing speed in milliseconds
  const caret = '_'; // Caret character

  /**
   * Types out the text content of an element one character at a time.
   *
   * @param {HTMLElement} element - The element to type into.
   * @param {string} text - The text content to type out.
   * @param {Function} callback - The callback function to call after typing is done.
   */
  function typeElement(element, text, callback) {
    let j = 0;
    // Create a hidden caret element and prepend it to the element
    const hiddenCaret = document.createElement('span');
    hiddenCaret.classList.add('visually-hidden');
    hiddenCaret.textContent = caret;
    element.prepend(hiddenCaret);

    /**
     * Types the next character of the text.
     */
    function type() {
      if (j < text.length) {
        // Add the next character and the caret to the element's text content
        element.textContent = text.substring(0, j + 1) + caret;
        j++;
        // Randomize the typing speed for a more natural effect
        const randomSpeed = Math.floor(
            Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed;
        setTimeout(type, randomSpeed);
      } else {
        // Remove the caret after typing is done
        element.textContent = text;
        hiddenCaret.remove(); // Remove the hidden caret
        if (callback) {
          callback();
        }
      }
    }

    type();
  }

  /**
   * Types out the text content of the next element in the list.
   */
  function typeNextElement() {
    if (i < typeWriters.length) {
      const element = typeWriters[i];
      const text = element.textContent;
      element.textContent = ''; // Clear the element's text content
      element.style.display = 'block'; // Ensure the element is visible
      typeElement(element, text, typeNextElement); // Type out the text content
      i++;
    }
  }

  // Initially hide all elements with the 'typewriter' class
  typeWriters.forEach(el => el.style.display = 'none');
  typeNextElement(); // Start typing the first element
}

// Call the function to add the typewriter effect
addTypeEffect();
