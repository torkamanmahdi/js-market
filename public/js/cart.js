const getAdd = document.querySelector('.buy-this')
const emptyMessage = document.querySelector('#nullMessage')
const getRemove = document.querySelector('#removeCart')
console.log(getAdd)

getAdd.addEventListener('click', () => {
	localStorage.setItem('cart', 'added')
	emptyMessage.innerHTML = 'added'
})

getRemove.addEventListener('click', () => {
	localStorage.removeItem('cart')
	emptyMessage.innerHTML = 'your cart is empty again'
})