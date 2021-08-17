const productsDOM = document.querySelector('#products')

async function getProducts() {
	const result = await fetch('api/products.json')
	const data = await result.json()
	let products = data.products
	products = products.map( (product) => {
		const {id} = products
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
	let filteredProduct = arrayProducts.filter(function(item) {
		return item.title.toLowerCase().includes(filters.searchItem.toLowerCase())
	})
	document.querySelector('#products').innerHTML = ''
	filteredProduct.forEach(function(item) {
		const productSearch = document.createElement('div')
		productSearch.innerHTML = `
			<div class="bg-white rounded-xl shadow-md hover:shadow-lg border-2 p-1" id-product="${item.id}">
				<img src="${item.thumbnail}" alt="${item.title}" class="w-64">
				<div class="p-4">
					<small class="text-gray-400">${item.category}</small>
					<h2 class="font-bold text-gray-600 text-xl">${item.title}</h2>
					<div class="text-purple-500 mt-2 text-sm">
						<strong class="font-bold">$</strong> ${item.price}
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