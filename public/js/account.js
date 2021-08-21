const signOut = document.querySelector('#signOut')
const loginApi = 'https://hakims-webshop.herokuapp.com/user/get'

fetch(loginApi).then( (data) => {
	localStorage.setItem('userInfo', JSON.stringify(data))
} )

signOut.addEventListener( 'click', (e) => {
	e.preventDefault()
	localStorage.removeItem('userAccount')
	localStorage.removeItem('userInfo')
})

const profile = document.querySelector('#profile')
let profileData = JSON.parse( localStorage.getItem('userAccount') )

profile.innerHTML = `
	<p><strong>Email:</strong> ${profileData.email}</p>
	<p><strong>Password:</strong> ${profileData.password}</p>
	<p><strong>Name:</strong> ${profileData.firstname}</p>
	<p><strong>City:</strong> ${profileData.address.city}</p>
`