const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

function toggleButton() {
    button.disabled = !button.disabled;
}

function tellMe(joke) {
    VoiceRSS.speech({
        key: '564916b232e44efba0a70f7805ca3121',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get jokes from Joke API

async function getJokes() {
    let joke = '';
    const apiURL = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&idRange=0-319';
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Text-to-Speech
        tellMe(joke);
        // Disable Button
        toggleButton();
    } catch (error) {
        console.log('no jokes available', error);
    }
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);

 getJokes();
