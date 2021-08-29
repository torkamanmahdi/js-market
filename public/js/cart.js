function addToCart() {
	const getAdd = document.querySelector('.buy-this')
	const emptyMessage = document.querySelector('#nullMessage')
	getAdd.addEventListener('click', () => {
		localStorage.setItem('cart', 'added')
		emptyMessage.innerHTML = 'added'
	})
}
// addToCart()

function removeCart() {
	const getRemove = document.querySelector('#removeCart')
	getRemove.addEventListener('click', () => {
		localStorage.removeItem('cart')
		const emptyMessage = document.querySelector('#nullMessage')
		emptyMessage.innerHTML = 'your cart is empty again'
	})
}
removeCart()