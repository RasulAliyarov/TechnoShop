const addBtn = document.getElementById("addBtn")
const addCartBtn = document.getElementById("addCartBtn")
const cartBody = document.getElementById("cartBody")
const cardsPlace = document.getElementsByClassName("cards")[0]
const nameInp = document.getElementById("nameInp")
const imgInp = document.getElementById("imgInp")
const priceInp = document.getElementById("priceInp")

const editNameInp = document.getElementById("editnameInp")
const editPriceInp = document.getElementById("editpriceInp")
const editImageInp = document.getElementById("editImageInp")

const editProductBtn = document.getElementById("editProductBtn")

console.log(priceInp.value)
let PRODUCTS = []
let CART = []



let index = 1

if (!localStorage.getItem("Products") && !localStorage.getItem("Cart")) {
    localStorage.setItem("Products", JSON.stringify(PRODUCTS))
    localStorage.setItem("Cart", JSON.stringify(CART))
}
else {
    PRODUCTS = JSON.parse(localStorage.getItem("Products"))
    CART = JSON.parse(localStorage.getItem("Cart"))

    if (PRODUCTS.length >= 1) {
        index = PRODUCTS.length + 1
    } else {
        index = 1
    }
}


let indexCart = 1

class Product {
    constructor(name, price, image) {
        this.id = index,
            this.name = name,
            this.price = price,
            this.image = image
    }
}

class Cart {
    constructor(name, price, image) {
        this.id = indexCart,
            this.name = name,
            this.price = price,
            this.image = image
    }
}

// Functions for Product
function addProduct() {
    let name = nameInp.value
    let image = imgInp.value
    let price = priceInp.value

    let product = new Product(name, price, image)
    index++
    PRODUCTS.push(product)

    localStorage.setItem("Products", JSON.stringify(PRODUCTS))

    RenderProductUI(PRODUCTS)

    nameInp.value = ""
    imgInp.value = ""
    priceInp.value = ""
    console.log(PRODUCTS)
}
function deleteProduct(id) {
    let delItem = PRODUCTS.find(item => item.id == id)
    let idndexItem = PRODUCTS.indexOf(delItem)

    PRODUCTS.splice(idndexItem, 1)
    localStorage.setItem("Products", JSON.stringify(PRODUCTS))

    RenderProductUI(PRODUCTS)
}
function editProduct(id) {
    let delItem = PRODUCTS.find(item => item.id == id)

    editNameInp.value = delItem.name
    editPriceInp.value = delItem.price
    editImageInp.value = delItem.image

    editProductBtn.addEventListener("click", () => {
        delItem.name = editNameInp.value
        delItem.price = editPriceInp.value
        delItem.image = editImageInp.value

        localStorage.setItem("Products", JSON.stringify(PRODUCTS))
        RenderProductUI(PRODUCTS)
        delItem = ""
    })
    console.log(delItem.id)
}

addCartBtn.addEventListener("click", () => {
    addProduct()
})



// Functions for Cart
function addToCart(id) {
    let item = PRODUCTS.find(item => item.id == id)
    let productInCart = new Cart(item.name, item.price, item.image)
    CART.push(productInCart)
    localStorage.setItem("Cart", JSON.stringify(CART))

    RenderCartUI(CART)
}

function deleteFromCart(id) {
    let delItem = PRODUCTS.find(item => item.id == id)
    let idndexItem = PRODUCTS.indexOf(delItem)

    CART.splice(idndexItem, 1)
    localStorage.setItem("Cart", JSON.stringify(CART))

    RenderCartUI(CART)
}

function editCart() {

}



// Render UI
function RenderProductUI(array) {
    let innerHTML = ""
    for (let i = 0; i < array.length; i++) {
        innerHTML += (
            `
            <div class="card col-3" style="width: 15rem;">
            <img class="card__img"
                src="${array[i].image}"
                class="card-img-top" alt="Iphone">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <h5 class="card-title">${array[i].name}</h5>
                    <h5>$ ${array[i].price}</h5>
                </div>
                <div class="d-flex justify-content-between">
                    <div class="btn btn-warning mt-3" onclick=addToCart(${array[i].id}) >Add</div>
                    <div class="btn btn-danger mt-3" onclick=deleteProduct(${array[i].id})>Delete </div>
                    <div class="btn btn-primary mt-3"  data-bs-toggle="modal" data-bs-target="#editModal" onclick=editProduct(${array[i].id})>Edit</div>
                </div>
            </div>
        </div>
            `)
    }
    cardsPlace.innerHTML = innerHTML
}

function RenderCartUI(array) {
    let innerHTML = ""
    for (let i = 0; i < array.length; i++) {
        innerHTML += (
            `
        <div class="cart__card col-3">
        <div class="card-body">
            <div class="d-flex justify-content-around align-items-center">
                <img class="card__img"
                    src="${array[i].image}"
                    class="card-img-top" alt="Iphone">
                <div class="">
                    <h5 class="card-title mb-2">${array[i].name}</h5>
                    <h5 class="">$ ${array[i].price}</h5>
                </div>
                <div class="d-flex flex-column">
                    <div class="btn btn-danger mt-3" onclick=deleteFromCart(${array[i].id})>Delete </div>
                </div>
            </div>
        </div>
    </div>
            `)
    }
    cartBody.innerHTML = innerHTML
}

RenderProductUI(PRODUCTS)
RenderCartUI(CART)
