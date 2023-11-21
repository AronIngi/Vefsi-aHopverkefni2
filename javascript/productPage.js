function createSimilarSection(product)
{
	const parentElement = document.querySelector(".more")
	const parent = parentElement.closest("section")
	const container = document.createElement("div")
	const header = document.createElement("h2")
	const image = document.createElement("img")
	const link = document.createElement("a")
	const title = document.createElement("h4")
	const category = document.createElement("p")
	const price = document.createElement("p")

	image.src = product.image
	link.href = `product.html?${product.id}`
	title.textContent = product.title
	category.textContent = product.category_title
	price.textContent = product.price.toString()
	
	image.classList.add("more_image")
	
	container.appendChild(header)
	link.appendChild(image)
	container.appendChild(link)
	container.appendChild(title)
	container.appendChild(category)
	container.appendChild(price)
	parentElement.appendChild(container)
	parent.appendChild(parentElement)
}

function createProductPage(product)
{
	const container = document.querySelector(".main")
	const parent = container.closest("section")
	const image_cont = document.createElement("div");
	const image = document.createElement("img")
	const text_cont = document.createElement("div");
	const title = document.createElement("h3")
	const category = document.createElement("p")
	const price = document.createElement("p")
	const description = document.createElement("p")
	
	image.src = product.image
	title.textContent = product.title
	category.textContent = `Flokkur: ${product.category_title}`
	price.textContent = `Verð: ${product.price.toString()}`
	description.textContent = product.description
	
	text_cont.classList.add("text_cont")
	image_cont.classList.add("image_cont")
	
	image_cont.appendChild(image)
	container.appendChild(image_cont);
	text_cont.appendChild(title)
	text_cont.appendChild(category)
	text_cont.appendChild(price)
	text_cont.appendChild(description)
	container.appendChild(text_cont)
	parent.appendChild(container)
}

async function fetchCategoryList(limit, category)
{
	try{
		const url = `https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/products?limit=${limit}&category=${category}`
		const response = await fetch(url)
		const products = await response.json()
		
		for(const product of products.items)
			createSimilarSection(product)
			
	} catch(error)
	{
		console.error("Error: ", error);
	}
}

async function fetchProduct(id)
{
	try{
		const url = `https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/products/${id}`
		const response = await fetch(url)
		const product = await response.json()
		
		createProductPage(product)
		document.querySelector(".more_header").textContent = `Meira úr ${product.category_title}`
		fetchCategoryList(6,product.category_id)
			
	} catch(error)
	{
		console.error("Error: ", error);
	}
}

const id = new URL(window.location.href).search
fetchProduct(id.substring(1))