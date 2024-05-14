startEkhon()

function startEkhon() {
    // Add the custom CSS file
    document.head.innerHTML += `<link rel="stylesheet" href="css/ekhon.min.css">`

    // Get viewport height and width
    const vw = Math.max(document.documentElement.clientWidth || 0,
        window.innerWidth || 0); // Taken from: https://stackoverflow.com/a/8876069
    const vh = Math.max(document.documentElement.clientHeight || 0,
        window.innerHeight || 0); // Also from: https://stackoverflow.com/a/8876069

    // Get the document elements
    const mainDivBase = document.getElementById(`md`)
    const mainNavbar = document.getElementById(`mn`);
    const btnOkay = document.getElementById(`ekhon-accha`);
    const introVideoDiv = document.getElementById(`ekhon-intro`);
    const introVideo = document.getElementById(`ekhon-intro-vid`);
    const mainDivs = [
        document.getElementById(`ekhon-md-1`),
        document.getElementById(`ekhon-md-2`),
        document.getElementById(`ekhon-md-3`),
    ]
    const midVideo = document.getElementById(`ekhon-mid-vid`);
    const midVideoDiv = mainDivs[1];
    const entranceLines = Array.from(document.getElementsByClassName(`ekhon-entrance`));
    const playButton = document.querySelector(`.play-button`);

    // Define the constant values
    const transitionTimeInMS = 2000;
    const transitionSpeedCurve = `linear`;
    const entranceLineAppearanceIntervalInMS = 100; // TODO: Make this 1000

    // Calculate the derived values
    const mainNavbarHeight = mainNavbar.offsetHeight;

    // Set dimensions of the intro video
    introVideo.style.width = `100%`;
    introVideo.style.height = `${vh - mainNavbarHeight - 6}px`; // Somehow there's a 6 pixel gap—don't know why
    introVideo.style.objectFit = `cover`;

    // Make the entrance lines invisible and add transitions
    entranceLines.forEach(line => {
        line.style.opacity = `0`;
        line.style.transition = `opacity ${transitionTimeInMS}ms ${transitionSpeedCurve}`;
    });

    // Trigger the modal which requests reader to use headphones
    window.onload = function () {
        document.getElementById(`ekhon-mt`).click();
    };

    // Remove navbar padding while playing the video
    mainNavbar.classList.remove(`mb-3`);
    // Remove main div padding while playing the video
    mainDivBase.classList.remove(`mb-4`);

    // Play the video when user clicked `accha`
    btnOkay.addEventListener(`click`, function () {
        // introVideoDiv.classList.remove(`d-none`);
        // introVideo.play();
        // introVideo.addEventListener(`ended`, postIntroVideoRoutine);
        postIntroVideoRoutine();
    })

    function postIntroVideoRoutine() {
        // Make the video invisible
        introVideoDiv.classList.add(`d-none`);
        // Add navbar padding while playing the video
        mainNavbar.classList.add(`mb-3`);
        // Add main div padding while playing the video
        mainDivBase.classList.add(`mb-4`);
        // Make the story visible
        mainDivs.forEach(mainDiv => {
            mainDiv.classList.remove(`d-none`);
        });
        // Fade in the entrance lines
        fadeInEntranceLines();
        // Play "Koto Gai" by Shaanta when the user clicks
        let isListening = true;
        midVideoDiv.addEventListener(`click`, playAndPauseVideo);
        // Stop the option to replay "Koto Gai" by Shaanta once the video ends
        midVideo.addEventListener(`ended`, function () {
            if (isListening) {
                midVideoDiv.removeEventListener(`click`, playAndPauseVideo);
                isListening = false;
            }
        });
    }

    function fadeInEntranceLines() {
        entranceLines.forEach((line, index) => {
            let lineWillAppearAfterMS = entranceLineAppearanceIntervalInMS * (index + 1);
            setTimeout(() => {
                line.style.opacity = `1`;
            }, lineWillAppearAfterMS);
        });
    }

    function playAndPauseVideo() {
        if (midVideo.paused) {
            midVideo.play();
            playButton.textContent = ``;
        } else {
            midVideo.pause();
            playButton.innerHTML += `<i class="bi bi-play-circle"></i>`;
        }
    }
}