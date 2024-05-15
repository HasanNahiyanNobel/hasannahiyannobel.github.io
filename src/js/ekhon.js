startEkhon()

function startEkhon() {
    // Add the custom CSS file
    document.head.innerHTML += `<link rel="stylesheet" href="css/ekhon.min.css">`

    // Get viewport height
    const vh = Math.max(document.documentElement.clientHeight || 0,
        window.innerHeight || 0); // Also from: https://stackoverflow.com/a/8876069

    // Get the document elements
    const mainDivOfBase = document.getElementById(`md`)
    const mainNavbar = document.getElementById(`mn`);
    const btnModalOkay = document.getElementById(`ekhon-modal-okay`);
    const introVideoDiv = document.getElementById(`ekhon-intro`);
    const introVideo = document.getElementById(`ekhon-intro-vid`);
    const mainDiv = document.getElementById(`ekhon-main`);
    const midVideoDiv = document.getElementById(`ekhon-mid-vid-div`);
    const midVideo = document.getElementById(`ekhon-mid-vid`);
    const playButton = document.querySelector(`.play-btn`);
    const playButtonIconHTML = `<i class="bi bi-play-circle"></i>`;
    const creditsDiv = document.getElementById(`ekhon-credits`);

    // Define the constant values
    const transitionTimeInMS = 2000;
    const transitionSpeedCurve = `linear`;

    // Define the state variables
    let arePaddingsInBaseState = true;

    // Calculate the derived values
    const mainNavbarHeight = mainNavbar.offsetHeight;

    // Set dimensions of the intro video
    introVideo.style.width = `100%`;
    introVideo.style.height = `${vh - mainNavbarHeight - 6}px`; // Somehow there's a 6 pixel gap—don't know why
    introVideo.style.objectFit = `cover`;

    // Set the play button icon
    playButton.innerHTML += playButtonIconHTML;

    // Make the main and credits div invisible and add transitions
    mainDiv.style.opacity = `0`;
    mainDiv.style.transition = `opacity ${transitionTimeInMS}ms ${transitionSpeedCurve}`;
    creditsDiv.style.opacity = `0`;
    creditsDiv.style.transition = `opacity ${transitionTimeInMS}ms ${transitionSpeedCurve}`;

    // Trigger the modal which requests reader to use headphones
    window.onload = function () {
        // document.getElementById(`ekhon-mt`).click();
        postIntroVideoRoutine(); // TODO: Remove this debug call
    };

    // Remove navbar and base's main div padding while playing the video
    switchPaddings();

    // Play the intro video when the reader clicks `আচ্ছা`
    btnModalOkay.addEventListener(`click`, function () {
        // introVideoDiv.classList.remove(`d-none`);
        // introVideo.play();
        // introVideo.addEventListener(`ended`, postIntroVideoRoutine);
        postIntroVideoRoutine(); // TODO: Remove this debug call
    })

    function postIntroVideoRoutine() {
        // Make the intro video invisible
        introVideoDiv.classList.add(`d-none`);
        // Bring paddings to the base state
        switchPaddings();
        // Fade in the story
        mainDiv.classList.remove(`visually-hidden`);
        // mainDiv.style.opacity = `1`;
        setTimeout(() => {
            mainDiv.style.opacity = `1`;
        }, 101); // TODO: Remove this debug timeout
        // Play "Koto Gai" by Shaanta when the reader clicks
        let isMidVideoDivListening = true;
        midVideoDiv.addEventListener(`click`, playAndPauseVideo);
        // Stop the option to replay "Koto Gai" by Shaanta once the video ends; show and scroll down to the credits
        midVideo.addEventListener(`ended`, function () {
            if (isMidVideoDivListening) {
                midVideoDiv.removeEventListener(`click`, playAndPauseVideo);
                creditsDiv.classList.remove(`visually-hidden`);
                creditsDiv.style.opacity = `1`;
                isMidVideoDivListening = false;
            }
        });
    }

    function switchPaddings() {
        if (arePaddingsInBaseState) {
            // Remove the paddings
            mainNavbar.classList.remove(`mb-3`);
            mainDivOfBase.classList.remove(`mb-4`);
        } else {
            // Add the paddings
            mainNavbar.classList.add(`mb-3`);
            mainDivOfBase.classList.add(`mb-4`);
        }
        arePaddingsInBaseState = !arePaddingsInBaseState;
    }

    function playAndPauseVideo() {
        if (midVideo.paused) {
            midVideo.play();
            playButton.textContent = ``;
        } else {
            midVideo.pause();
            playButton.innerHTML += playButtonIconHTML;
        }
    }
}