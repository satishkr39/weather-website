console.log('client side js file laoded')


// fetch() : is a method which calls a url and then stored the response in response variable. 
// fetch takes callback function as paramter. 
// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch to get the weather forecast
// http://localhost:3000/weather?address=Bihar

// binding the form from index.hbs here 
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')  // points to input text field
const messageOne = document.querySelector('#message-1') // points to our message-1 field. # is used when we have multiple 
// elements with same tag. then we can use id to differntiate between two <p>
const messageTwo = document.querySelector('#message-2') // points to our message-1 field

// event listner to performm some action when the button is clicked.
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()  // doesn't allow to act in default behaviour. doens't let the page refresh every time the 
    // user click on submit 
    const location = search.value // gets the value entered in text field
    messageOne.textContent = 'loading temperature...' // set default value when page is loading 
    messageTwo.textContent = ''
    //console.log('User Entered: ', location)
    var queryString = 'http://localhost:3000/weather?address='+location
    fetch(queryString).then((response) => {
        response.json().then((data) => {
            if (data.errorMessage){
                console.log('Error: Unable to get data')
                messageTwo.textContent = data.errorMessage
            }
            else{
                console.log(data.temperature)
                messageOne.textContent = data.temperature
            }
        })
    })
})