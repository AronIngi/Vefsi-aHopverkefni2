function createProductEl(product)
{
	const parentElement = document.querySelector(".categoryContainer")
	const container = document.createElement("div")
	const image = document.createElement("img")
	const link = document.createElement("a")
	const title = document.createElement("p")
	const category = document.createElement("p")
	const price = document.createElement("p")
	
	image.src = product.image
	link.href = `product.html?${product.id}`
	title.textContent = product.title
	category.textContent = product.category_title
	price.textContent = product.price.toString()
	
	container.classList.add("product_item");
	
	link.appendChild(image)
	container.appendChild(link)
	container.appendChild(title)
	container.appendChild(category)
	container.appendChild(price)
	parentElement.appendChild(container)
}

async function fetchProductList(limit,category)
{
	try{
		const url = `https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/products?limit=${limit}&category=${category}`
		const response = await fetch(url)
		const products = await response.json()
		
		for(const product of products.items)
			createProductEl(product)
			
	} catch(error)
	{
		console.error("Error: ", error);
	}
}

const category = new URL(window.location.href).search
console.log(category)
fetchProductList(100, category.substring(1))