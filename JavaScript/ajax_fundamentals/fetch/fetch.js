let buttonTwo = document.getElementById('two');
let divTwo = document.getElementsByTagName('div')[0];

buttonTwo.addEventListener('click', () => {
    fetch('https://icanhazdadjoke.com', {
        headers: {"Accept":"application/json"}
    })
        .then((response) => {
            return response.json()
        })
        // fetch is useful because you can chain on many things to do (e.g. changing content to all uppercase)
        .then(jokeObject => {
            return jokeObject.joke.toUpperCase();
        })
        .then(joke => {
            // finally lets insert the result into our div element
             divTwo.innerText = joke;
        })
        // remember, you can also catch errors
        .catch( e => {
            console.log('oh no man, there is an error', e);
        })   
})


