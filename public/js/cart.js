const getItem = document.querySelector('#getProducts')
const cartList = document.querySelector('#cartList')
const ifEmpty = document.querySelector('#ifEmpty')
const emptyCart = document.querySelector('#removeCart')

function cartLoader() {
	getItem.addEventListener('click', (e) => {
		getProductItem(e)
		itemLS()
		ifEmpty.innerHTML = ''
	})
	document.addEventListener('DOMContentLoaded', (e) => {
		if(localStorage.getItem('cart')) {
			let inCart = JSON.parse(localStorage.getItem('cart'))
			inCart.forEach(element => {
				cartList.innerHTML += `
					<div class="bg-white flex items-center p-2 border-b-2 border-gray-300">
						<img src="${element.thumbnail}" class="w-16">
						<div>
							<div class="font-bold">${element.title}</div>
							<div>price: ${element.price}</div>
						</div>
					</div>
				`
			})
		} else {
			ifEmpty.innerHTML = 'cart is empty'
		}
	})
	emptyCart.addEventListener('click', (e) => {
		removeLS()
		cartList.innerHTML = ''
		ifEmpty.innerHTML = 'cart is empty'
	})
}
cartLoader()

function getProductItem(e) {
	if(e.target.getElementsByClassName('buy-this')) {
		const itemProduct = e.target.parentElement.parentElement
		const itemInfo = {
			id: itemProduct.id,
			title: itemProduct.querySelector('#title').innerText,
			price: itemProduct.querySelector('strong').innerText,
			thumbnail: itemProduct.querySelector('img').src
		}
		addToCart(itemInfo)
	}
}

function addToCart(itemInfo) {
	let row = document.createElement('div')
	row.innerHTML = `
		<div class="bg-white flex items-center p-2 border-b-2 border-gray-300">
			<img src="${itemInfo.thumbnail}" class="w-16">
			<div>
				<div class="font-bold">${itemInfo.title}</div>
				<div>price: ${itemInfo.price}</div>
			</div>
		</div>
	`
	cartList.appendChild(row)
	cartToLS(itemInfo)
}

function cartToLS(item) {
	let items = cartLS()
	items.push(item)
	localStorage.setItem('cart', JSON.stringify(items))
}

function cartLS() {
	let items
	if(localStorage.getItem('cart')) {
		items = JSON.parse(localStorage.getItem('cart'))
	} else {
		items = []
	}
	return items
}

function itemLS() {
	let LSitems = localStorage.getItem('cart')
}

function removeLS() {
	if(localStorage.getItem('cart')) {
		localStorage.removeItem('cart')
	}
}



// const emptyMessage = document.querySelector('#nullMessage')
// const getRemove = document.querySelector('#removeCart')

// const result = await fetch('api/products.json')
// const data = await result.json()
// let products = data.products
// products = products.map( (product) => {
// 	const {id} = product
// 	const {title, description, category, price} = product.fields
// 	const {thumbnail} = product.fields.images
// 	return {id, title, description, category, price, thumbnail}
// } )

// let cartItem = {
// 	id: 0,
// 	title: '',
// 	price: 2,
// 	thumbnail: '',
// 	qty: 1
// }
// const getAdd = Array.from(document.getElementsByClassName('buy-this'))
// getAdd.forEach(products => products.addEventListener('click', (e) => {
// 	cartItem.id = e.target.parentElement.parentNode.id
// 	cartItem.title = e.target.parentElement.parentElement.querySelector('#title').innerText
// 	cartItem.price = e.target.parentElement.parentElement.querySelector('strong').innerText
// 	cartItem.thumbnail = e.target.parentElement.parentElement.querySelector('img').src
// 	localStorage.setItem('cart', JSON.stringify(cartItem))

// 	let getCartItem = JSON.parse(localStorage.getItem('cart'))
// 	emptyMessage.innerHTML = `<div>${getCartItem.title}, price: ${getCartItem.price}</div>`
// }))

// if(localStorage.getItem('cart')) {
// 	let getCartItem = JSON.parse(localStorage.getItem('cart'))
// 	emptyMessage.innerHTML = `<div>${getCartItem.title}, price: ${getCartItem.price}</div>`
// } else {
// 	emptyMessage.innerHTML = 'empty cart'
// }

// getRemove.addEventListener('click', () => {
// 	localStorage.removeItem('cart')
// 	emptyMessage.innerHTML = 'empty cart'
// })