const signOut = document.querySelector('#signOut')

signOut.addEventListener( 'click', (e) => {
	e.preventDefault()
	localStorage.removeItem('userAccount')
})


const profile = document.querySelector('#profile')
let profileData = JSON.parse( localStorage.getItem('userAccount') )

profile.innerHTML = `
	<p><strong>Email:</strong> ${profileData.email}</p>
	<p><strong>Password:</strong> ${profileData.password}</p>
`