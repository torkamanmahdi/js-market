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


let searchProduct = document.querySelector('#search')
let resultSearch = document.querySelector('#result')

function searchProducts(products) {
	let arrayProduct = []
	products.filter( (item) => {
		searchValue = searchProduct.value
		item.searchValue.includes(products.title)
	})
	resultSearch.innerHTML = arrayProduct
}
document.addEventListener( 'keyup', () => {
	getProducts().then( (data) => searchProducts(data) )
})