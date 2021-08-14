const loginSubmit = document.querySelector('#loginSubmit')
const loginEmail = document.querySelector('#loginEmail')
const loginPassword = document.querySelector('#loginPassword')
const loginApi = 'https://hakims-webshop.herokuapp.com/user/authentication'

async function loggedInUser() {
	await fetch(loginApi, {
		method: "POST",
		body: JSON.stringify(loginEmail.value,loginPassword.value),
		headers: {
			"Content-Type": "application/json",
		}
	})
	.then( (Response) => {
		if(Response.status == 200) {
			let result = Response.json()
			return result.users
		} else if(Response.status == 400) {
			return Response.text()
		}
	} )
	if (loginEmail.value == users.email && loginPassword.value == users.password) {
		localStorage.setItem('user', JSON.stringify(users))
		return users
	} else {
		console.log('error')
	}
}
loginSubmit.addEventListener( 'click', (e) => {
	e.preventDefault()
	loggedInUser()
})