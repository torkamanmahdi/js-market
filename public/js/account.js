const signOut = document.querySelector('#signOut')
const loginApi = 'https://hakims-webshop.herokuapp.com/user/authentication'

signOut.addEventListener( 'click', (e) => {
	e.preventDefault()
	localStorage.removeItem('userAccount')
})


const profile = document.querySelector('#profile')
// let profileData = JSON.parse( localStorage.getItem('userAccount') )
const dataValue = {
	email: this.email,
}
let profileData = fetch(loginApi, {
	body: JSON.stringify(dataValue)
})

profile.innerHTML = `
	<p><strong>Email:</strong> ${profileData.email}</p>
	<p><strong>Password:</strong> ${profileData.password}</p>
	<p><strong>Password:</strong> ${profileData.firstName}</p>
	<p><strong>Password:</strong> ${profileData.password}</p>
	<p><strong>Password:</strong> ${profileData.password}</p>
	<p><strong>Password:</strong> ${profileData.password}</p>
	<p><strong>Password:</strong> ${profileData.password}</p>
`