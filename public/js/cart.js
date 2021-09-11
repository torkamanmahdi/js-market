const getItem = document.querySelector('#getProducts')
const cartList = document.querySelector('#cartList')
const ifEmpty = document.querySelector('#ifEmpty')
const emptyCart = document.querySelector('#removeCart')
const totalPrice = document.querySelector('#totalPrice')

function cartLoader() {
	getItem.addEventListener('click', (e) => {
		getProductItem(e)
		itemLS()
		totalCart()
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
			totalCart(inCart)
		} else {
			ifEmpty.innerHTML = 'cart is empty'
			totalPrice.innerHTML = 'total price: 0$'
		}
	})
	emptyCart.addEventListener('click', (e) => {
		removeLS()
		cartList.innerHTML = ''
		ifEmpty.innerHTML = 'cart is empty'
		totalPrice.innerHTML = 'total price: 0$'
	})
}
cartLoader()

function getProductItem(e) {
	if(e.target.getElementsByClassName('buy-this')) {
		const itemProduct = e.target.parentElement.parentElement
		const itemInfo = {
			id: itemProduct.id,
			title: itemProduct.querySelector('#title').innerText,
			price: itemProduct.querySelector('.price-tag strong').innerText,
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
	items.push
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

function totalCart(inCart) {
	let priceArray = []
	inCart.forEach(element => {
		priceArray.push(parseInt(element.price))
	})
	const reducer = (previousPrice, currentPrice) => previousPrice + currentPrice
	let fullPrice = priceArray.reduce(reducer)
	localStorage.setItem('totalPrice', JSON.stringify(fullPrice))
	let lastP = localStorage.getItem('totalPrice')
	totalPrice.innerHTML = `Total Price: <strong>${lastP}</strong> $`

	console.log(priceArray)
	console.log(fullPrice)
	console.log(lastP)
}