// document.addEventListener("DOMContentLoaded", function() {});

const url = 'http://localhost:3000/books'
const list = document.querySelector('#list')
const div = document.querySelector('#show-panel')
const title = document.querySelector('#list-panel')

const h3 = document.createElement('h3')
h3.innerText = 'Click to View a Book'
title.prepend(h3)

const back = document.createElement('button')
back.innerText = 'Go Back'
title.append(back)

back.addEventListener('click', () => {
    div.innerHTML = ""
})

const currentUser = {
    "id": 1,
    "username": "pouros"
}

//! API
const getBooks = () =>
    fetch(url)
    .then(resp => resp.json())

const updateBook = book =>
    fetch(url + `/${book.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            users: book.users
        })
    }).then(resp => resp.json())

//! Code
const renderBook = book => {
    const li = document.createElement('li')
    li.innerText = `${book.title}`
    list.append(li)

    li.addEventListener('click', () => {
        refresh(book)
        checkUser(book)

        const read = div.querySelector('#read')
        const unlike = div.querySelector('#unlike')

        read.addEventListener('click', () => {
            const check = book.users.find(user => user.id == currentUser.id)
            if (check) {
                alert('You Already Read This Book')
            } else {
                checkUser(book)
            }
        })

        unlike.addEventListener('click', () => {
            const checking = book.users.find(user => user.id == 1)
            if (checking) {
                book.users = book.users.filter(user => user.id !== 1)
                const user_li = div.querySelector(`li[data-id='${currentUser.id}']`)
                user_li.remove()
                updateBook(book)

            }
        })
    })
}

const refresh = book => {
    book.users = book.users.filter(user => user.id !== 1)
    const usershtml = book.users.map(user => `<li>${user.username}</li>`).join('')
    div.innerHTML = `
        <h1>${book.title}</h1>
        <img src="${book.img_url}" alt="">
        <p>${book.description}</p>
        <button id=read >Read Book</button>
        <button id=unlike >UnLike Book</button>
        <h3>People that have read this book:</h3>
        <ul class'readers'>${usershtml}</ul>`
}

const checkUser = book => {
    const newLi = document.createElement('li')
    newLi.dataset.id = currentUser.id
    const ul = div.querySelector('ul')
    book.users.push(currentUser)
    updateBook(book)
    newLi.innerText = currentUser.username
    ul.append(newLi)
}

const renderBooks = books => {
    books.forEach(renderBook)
}

//! Initialise
const init = () => {
    getBooks()
        .then(renderBooks)
}

init()