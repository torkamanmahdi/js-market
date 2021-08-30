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
	products.forEach( (product) => {

		let getProducts = document.querySelector('#getProducts')
		let itemProuct = document.createElement('div')
	
		getProducts.append(itemProuct)
		itemProuct.classList.add('bg-white', 'rounded-xl', 'shadow-md', 'hover:shadow-lg', 'border-2', 'p-1')
		itemProuct.setAttribute('id', `${product.id}`)
		// thumbnail
		let thumbnailProduct = document.createElement('img')
		thumbnailProduct.src = `${product.thumbnail}`
		// class: p-4
		let classp4 = document.createElement('div')
		itemProuct.append(classp4)
		classp4.classList.add('p-4')
		// categpory
		let categoryProduct = document.createElement('small')
		categoryProduct.classList.add('text-gray-400')
		classp4.appendChild(categoryProduct).innerHTML = `${product.category}`
		// title product
		let titleProduct = document.createElement('h2')
		titleProduct.classList.add('font-bold', 'text-gray-600', 'text-xl')
		classp4.appendChild(titleProduct).innerHTML = `${product.title}`
		// class: text-purple-500 mt-2 text-sm
		let priceClass = document.createElement('strong')
		priceClass.classList.add('text-purple-500', 'mt-2', 'text-sm')
		classp4.appendChild(priceClass).innerHTML = `${product.price}`
		// add to cart
		let btnAdd = document.createElement('button')
		btnAdd.classList.add('buy-this', 'w-full', 'py-1', 'px-3', 'bg-green-400', 'mt-4', 'rounded-md')
		classp4.appendChild(btnAdd).innerHTML = 'Buy This'
	
		itemProuct.append(thumbnailProduct, classp4)

	} )
}

document.addEventListener( 'DOMContentLoaded', () => {
	getProducts().then( (data) => displayPorudtcs(data) )
} )