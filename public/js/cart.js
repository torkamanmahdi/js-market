const emptyMessage = document.querySelector('#nullMessage')
const getRemove = document.querySelector('#removeCart')

let arrayCart = []
const result = await fetch('api/products.json')
const data = await result.json()
let products = data.products
products = products.map( (product) => {
	const {id} = product
	const {title, description, category, price} = product.fields
	const {thumbnail} = product.fields.images
	return {id, title, description, category, price, thumbnail}
} )
arrayCart = products

setTimeout(() => {
	const getAdd = Array.from(document.getElementsByClassName('buy-this'))
	getAdd.forEach(products => products.addEventListener('click', e => {
		arrayCart.filter( function(product) {
			if(product.id.includes(e.path[2].id)) {
				emptyMessage.innerHTML = e.path[2].id
			}
		} )
	}))
}, 3000)

getRemove.addEventListener('click', () => {
	localStorage.removeItem('cart')
	emptyMessage.innerHTML = 'your cart is empty again'
})