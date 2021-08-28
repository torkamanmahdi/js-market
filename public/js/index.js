const productsDOM = document.querySelector('#products')

async function getProducts() {
	const result = await fetch('api/products.json')
	const data = await result.json()
	let products = data.products
	products = products.map( (product) => {
		const {id} = product
		const {title, description, category, price} = product.fields
		const {thumbnail, image1, image2, image3} = product.fields.images
		return {id, title, description, category, price, thumbnail, image1, image2, image3}
	} )
	localStorage.setItem('products', JSON.stringify(products))
	return products
}

function displayPorudtcs(products) {
	let result = ''
	products.forEach( (product) => {
		result += `
			<div class="bg-white rounded-xl shadow-md hover:shadow-lg border-2 p-1" id-product="${product.id}">
				<img src="${product.thumbnail}" alt="${product.title}" class="w-64">
				<div class="p-4">
					<small class="text-gray-400">${product.category}</small>
					<h2 class="font-bold text-gray-600 text-xl">${product.title}</h2>
					<div class="text-purple-500 mt-2 text-sm">
						<strong class="font-bold">$</strong> ${product.price}
					</div>
				</div>
			</div>
		`
	} )
	productsDOM.innerHTML = result
	return result
}

document.addEventListener( 'DOMContentLoaded', () => {
	getProducts().then( (data) => displayPorudtcs(data) )
} )



let arrayProducts = []
const filters = {
	searchItem: ''
}
const productsJSON = localStorage.getItem('products')
if(productsJSON !== null) {
	arrayProducts = JSON.parse(productsJSON)
}
const renderTodo = function(arrayProducts, filters) {
	let filteredProduct = arrayProducts.filter(function(product) {
		return product.title.toLowerCase().includes(filters.searchItem.toLowerCase())
	})
	document.querySelector('#products').innerHTML = ''
	filteredProduct.forEach(function(product) {
		const productSearch = document.createElement('div')
		productSearch.innerHTML = `
			<div class="bg-white rounded-xl shadow-md hover:shadow-lg border-2 p-1" id-product="${product.id}">
				<img src="${product.thumbnail}" alt="${product.title}" class="w-64">
				<div class="p-4">
					<small class="text-gray-400">${product.category}</small>
					<h2 class="font-bold text-gray-600 text-xl">${product.title}</h2>
					<div class="text-purple-500 mt-2 text-sm">
						<strong class="font-bold">$</strong> ${product.price}
					</div>
				</div>
			</div>
		`
		document.querySelector('#products').appendChild(productSearch)
	})
}
renderTodo(arrayProducts, filters)
document.querySelector('#search').addEventListener('input', function(e) {
	filters.searchItem = e.target.value
	renderTodo(arrayProducts, filters)
})



function DisplayItemProduct() {

	let getProducts = document.querySelector('#getProducts')
	let itemProuct = document.createElement('div')

	getProducts.append(itemProuct)
	itemProuct.classList.add('bg-white', 'rounded-xl', 'shadow-md', 'hover:shadow-lg', 'border-2', 'p-1')
	// thumbnail
	let thumbnailProduct = document.createElement('img')
	thumbnailProduct.src = 'thumbnails/pear.jpg'
	// class: p-4
	let classp4 = document.createElement('div')
	itemProuct.append(classp4)
	classp4.classList.add('p-4')
	// categpory
	let categoryProduct = document.createElement('small')
	categoryProduct.classList.add('text-gray-400')
	classp4.appendChild(categoryProduct).innerHTML = 'category'
	// title product
	let titleProduct = document.createElement('h2')
	titleProduct.classList.add('font-bold', 'text-gray-600', 'text-xl')
	classp4.appendChild(titleProduct).innerHTML = 'Title'
	// class: text-purple-500 mt-2 text-sm
	let priceClass = document.createElement('strong')
	priceClass.classList.add('text-purple-500', 'mt-2', 'text-sm')
	classp4.appendChild(priceClass).innerHTML = '10 dollar'
	// add to cart
	let btnAdd = document.createElement('button')
	btnAdd.classList.add('buy-this', 'w-full', 'py-1', 'px-3', 'bg-green-400', 'mt-4', 'rounded-md')
	btnAdd.setAttribute('id-product', '`${product.id}`') // ask
	classp4.appendChild(btnAdd).innerHTML = 'Buy'

	itemProuct.append(thumbnailProduct, classp4)

}


let newprod = JSON.parse(productsJSON)
newprod.forEach(item => {
	DisplayItemProduct(item)
})



function addToCart() {
	const getAdd = document.querySelector('.buy-this')
	const emptyMessage = document.querySelector('#nullMessage')
	getAdd.addEventListener('click', () => {
		localStorage.setItem('cart', 'added')
		emptyMessage.innerHTML = 'added'
	})
}
addToCart()



function removeCart() {
	const getRemove = document.querySelector('#removeCart')
	getRemove.addEventListener('click', () => {
		localStorage.removeItem('cart')
		const emptyMessage = document.querySelector('#nullMessage')
		emptyMessage.innerHTML = 'your cart is empty again'
	})
}
removeCart()