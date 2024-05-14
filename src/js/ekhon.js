startEkhon()

function startEkhon() {
    // Get viewport height and width
    const vw = Math.max(document.documentElement.clientWidth || 0,
        window.innerWidth || 0); // Taken from: https://stackoverflow.com/a/8876069
    const vh = Math.max(document.documentElement.clientHeight || 0,
        window.innerHeight || 0); // Also from: https://stackoverflow.com/a/8876069

    // Get the document elements
    const mainDiv = document.getElementById(`md`)
    const mainNavbar = document.getElementById(`mn`);
    const btnOkay = document.getElementById(`ekhon-accha`);
    const introVideoDiv = document.getElementById(`ekhon-intro`);
    const introVideo = document.getElementById(`ekhon-intro-vid`);
    const mainDivOfThisStory = document.getElementById(`ekhon-md`);
    const entranceLines = Array.from(document.getElementsByClassName(`ekhon-entrance`));

    // Define the constant values
    const transitionTimeInMS = 2000;
    const transitionSpeedCurve = `linear`;
    const entranceLineAppearanceIntervalInMS = 1000;

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
    mainDiv.classList.remove(`mb-4`);

    // Play the video when user clicked `accha`
    btnOkay.addEventListener(`click`, function () {
        introVideoDiv.classList.remove(`d-none`);
        introVideo.play();
        introVideo.addEventListener(`ended`, postIntroVideoRoutine);
        // postIntroVideoRoutine();
    })

    function postIntroVideoRoutine() {
        // Make the video invisible
        introVideoDiv.classList.add(`d-none`);
        // Add navbar padding while playing the video
        mainNavbar.classList.add(`mb-3`);
        // Add main div padding while playing the video
        mainDiv.classList.add(`mb-4`);
        // Make the story visible
        mainDivOfThisStory.classList.remove(`d-none`);
        // Fade in the entrance lines
        fadeInEntranceLines();
    }

    function fadeInEntranceLines() {
        entranceLines.forEach((line, index) => {
            let lineWillAppearAfterMS = entranceLineAppearanceIntervalInMS * (index + 1);
            setTimeout(() => {
                line.style.opacity = `1`;
            }, lineWillAppearAfterMS);
        });
    }
}