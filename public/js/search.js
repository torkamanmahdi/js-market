const searchBar = document.querySelector('#search')
const searchResult = document.querySelector('#result')
let arrayProducts = []
const filters = {
	searchItem: ''
}
const productsJSON = localStorage.getItem('products')
if(productsJSON !== null) {
	const result = await fetch('api/products.json')
	const data = await result.json()
	let products = data.products
	products = products.map( (product) => {
		const {id} = product
		const {title, description, category, price} = product.fields
		const {thumbnail, image1, image2, image3} = product.fields.images
		return {id, title, description, category, price, thumbnail, image1, image2, image3}
	} )
	arrayProducts = products
}

const renderTodo = function(arrayProducts, filters) {
	let filteredProduct = arrayProducts.filter(function(product) {
		return product.title.toLowerCase().includes(filters.searchItem.toLowerCase())
	})
	searchResult.innerHTML = ''
	filteredProduct.forEach(function(product) {
		const productSearch = document.createElement('div')
		productSearch.innerHTML = `
			<div class="border-b-2 py-1 flex" id-product="${product.id}">
				<img src="${product.thumbnail}" alt="${product.title}" class="w-12 h-12">
				<div class="flex space-x-3 items-center">
					<small class="text-gray-400">${product.category}</small>
					<h2 class="font-bold text-gray-600 text-xl">${product.title}</h2>
					<div class="text-purple-500 text-sm">
						<strong class="font-bold">$</strong> ${product.price}
					</div>
				</div>
			</div>
		`
		searchResult.appendChild(productSearch)
	})
}

searchBar.addEventListener('input', function(e) {
	const inputValue = e.target.value

	filters.searchItem = e.target.value
	renderTodo(arrayProducts, filters)

	if(inputValue !== null) {
		searchResult.classList.remove('hidden')
	}
	if(inputValue === '') {
		searchResult.classList.add('hidden')
	}

})

searchBar.addEventListener(
	'DOMContentLoaded', searchResult.classList.add('hidden')
)