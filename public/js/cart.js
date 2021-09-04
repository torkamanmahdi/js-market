const emptyMessage = document.querySelector('#nullMessage')
const getRemove = document.querySelector('#removeCart')

const result = await fetch('api/products.json')
const data = await result.json()
let products = data.products
products = products.map( (product) => {
	const {id} = product
	const {title, description, category, price} = product.fields
	const {thumbnail} = product.fields.images
	return {id, title, description, category, price, thumbnail}
} )

let cartItem = {
	id: 0,
	title: '',
	price: 2,
	thumbnail: '',
	qty: 1
}
const getAdd = Array.from(document.getElementsByClassName('buy-this'))
getAdd.forEach(products => products.addEventListener('click', (e) => {
	cartItem.id = e.target.parentElement.parentNode.id
	cartItem.title = e.target.parentElement.parentElement.querySelector('#title').innerText
	cartItem.price = e.target.parentElement.parentElement.querySelector('strong').innerText
	cartItem.thumbnail = e.target.parentElement.parentElement.querySelector('img').src
	localStorage.setItem('cart', JSON.stringify(cartItem))

	let getCartItem = JSON.parse(localStorage.getItem('cart'))
	emptyMessage.innerHTML = `${getCartItem.title}, price: ${getCartItem.price}`
}))

if(localStorage.getItem('cart')) {
	let getCartItem = JSON.parse(localStorage.getItem('cart'))
	emptyMessage.innerHTML = `${getCartItem.title}, price: ${getCartItem.price}`
}

getRemove.addEventListener('click', () => {
	localStorage.removeItem('cart')
	emptyMessage.innerHTML = 'your cart is empty again'
})