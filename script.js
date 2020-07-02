
const button = document.getElementById('button')
const audioElement = document.getElementById('audio')


function tellMeAJoke(joke){
    VoiceRSS.speech({
        key: '0856431432b643d78f081f198fefcb65',
        src: joke,
        hl: 'en-us',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

async function getJokes(){
    let joke = ''
    const apiUrl= `https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist`
    try{
        const response= await fetch(apiUrl)
        const data = await response.json()
        data.setup ? joke = `${data.setup} ... ${data.delivery}` : joke = data.joke
        // if(data.setup){
        //  joke = `${data.setup} ... ${data.delivery}` 
        // }else
        //     joke = data.joke
        tellMeAJoke(joke)
        toggleButton()
    }catch(error){
        console.log(`Can't reach joke api`, error)
    }
}

const toggleButton = () => {
    button.disabled = !button.disabled
}

button.addEventListener('click', getJokes)
audioElement.addEventListener('ended', toggleButton)