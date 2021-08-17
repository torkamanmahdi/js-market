const registerSubmit = document.querySelector('#registerSubmit')
const registerName = document.querySelector('#name')
const registerFamily = document.querySelector('#family')
const registerEmail = document.querySelector('#userEmail')
const registerPassword = document.querySelector('#userPassword')

async function regUser(url, data) { await fetch(url, {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify(data),
	})
	.then(response => {
		if(response.status == 200) {
			return response.json()
		} else if(response.status == 400) {
			console.log(response)
		} else {
			console.log(response)
		}
	} )
	.then(data => {
		console.log('Success:', data)
	})
	.catch(error => console.log())
}

registerSubmit.addEventListener('click', async (e) => {
	e.preventDefault()
	let data = {
		"firstname": registerName.value,
		"lastname": registerFamily.value,
		"email": registerEmail.value,
		"password": registerPassword.value,
		"address": {
			"street": "Torget 33",
			"city": "Botkyrka",
			"zipcode": "14555"
		},
		"number": "+98021",
		"status": 0,
		"accountType": 0
	}
	const currentUser = await regUser('https://hakims-webshop.herokuapp.com/user/add', data)
	console.log(currentUser)
})

document.addEventListener( 'DOMContentLoaded', () => {
	if(localStorage.getItem('userAccount')) {
		location.replace('/public/')
	}
})