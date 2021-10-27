const loginSubmit = document.querySelector('#loginSubmit')
const loginEmail = document.querySelector('#loginEmail')
const loginPassword = document.querySelector('#loginPassword')
const loginApi = 'https://hakims-webshop.herokuapp.com/user/authentication'
// https://randomuser.me/api/

loginEmail.addEventListener('focusout', (e) => {
	e.preventDefault()
	function emailValid() {
		if(loginEmail.value == '') {
			loginEmail.classList.add('border-red-500')
		} else {
			loginEmail.classList.remove('border-red-500')
		}
	}
	emailValid()
})

loginPassword.addEventListener('focusout', (e) => {
	e.preventDefault()
	function passwordValid() {
		if(loginPassword.value == '') {
			loginPassword.classList.add('border-red-500')
		} else {
			loginPassword.classList.remove('border-red-500')
		}
	}
	passwordValid()
})

async function loggedInUser() {
	const dataValue = {
		email: loginEmail.value,
		password: loginPassword.value
	}
	await fetch(loginApi, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(dataValue)
	})
	.then( (data) => {
		if(data.status == 200) {
			return data.json()
		} else if(data.status == 400) {
			errorLogin()
			return data.text()
		}
	} ).then((data) => {
		if(data != 'Incorrect USER or PASSWORD') {
			localStorage.setItem('userAccount', JSON.stringify(data))
			location.replace('/public/')
		} else {
			alert(data)
		}
	})
}

const message = document.querySelector('#message')
function errorLogin() {
	message.innerHTML = 'email/password wrong! try again.'
}

addEventListener( 'submit', (e) => {
	e.preventDefault()
	loggedInUser()
})

addEventListener( 'DOMContentLoaded', () => {
	if( localStorage.getItem('userAccount') ) {
		location.replace('/public/')
	} 
})

const errr = document.querySelector('.error')
loginEmail.addEventListener('input', (e) => {
	const target = e.target
	if(target.validity.tooShort) {
		target.setCustomValidity('lol')
	}
	errr.hidden = true
	if(target.validity.typeMismatch) {
		errr.hidden = false
	}
})