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
			if( loginEmail.value == Response.email & loginPassword.value == Response.password ) {
				localStorage.setItem('user', JSON.stringify(Response))
				return Response.json()
			}
		} else if(Response.status == 400) {
			return Response.text()
		}
	} )
}
loginSubmit.addEventListener( 'click', (e) => {
	e.preventDefault()
	loggedInUser()
})