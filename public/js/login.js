const loginSubmit = document.querySelector('#loginSubmit')
const loginEmail = document.querySelector('#loginEmail')
const loginPassword = document.querySelector('#loginPassword')
const loginApi = 'https://hakims-webshop.herokuapp.com/user/authentication'

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
			localStorage.setItem('userAccount', JSON.stringify(dataValue))
			return data.json()
		} else if(data.status == 400) {
			return data.text()
		}
	} )
}
addEventListener( 'submit', (e) => {
	e.preventDefault()
	loggedInUser()
})