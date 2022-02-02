let hamIcon = document.querySelector("#ham-icon");
let navMenu = document.querySelector(".nav-menu");
let closeIcon = document.querySelector("#close-icon");
let cartImg = document.querySelector("#cart-img");
let cartContainer = document.querySelector(".cart-container");
let gallerymainImage = document.querySelectorAll(".product-main-image")[0];
let boxMainImage = document.querySelectorAll(".product-main-image")[1];
let galleryBtns = document.querySelectorAll(".gallery-btn");
let changeQntyBtns = document.querySelectorAll(".change-qnty");
let qntyCounterElem = document.querySelector("#qnty-counter");
let addCartBtn = document.querySelector("#add-cart-btn");
let productsContainerElem = document.querySelector(".products-container");
let checkoutBtn = document.querySelector("#checkout-btn");
let emptyCartText = document.querySelector(".empty-cart-text");


let productCompanyElem = document.querySelector("#product-company");
let productNameElem = document.querySelector("#product-name");
let productInfoElem = document.querySelector("#product-info");
let productPriceElem = document.querySelector("#product-price");
let productSaleElem = document.querySelector("#product-sale");
let productInitPriceElem = document.querySelector("#product-init-price");

var productImages = [
    "images\\image-product-1.jpg",
    "images\\image-product-2.jpg",
    "images\\image-product-3.jpg",
    "images\\image-product-4.jpg",
];

var productThumbnails = [
    "images\\image-product-1-thumbnail.jpg",
    "images\\image-product-2-thumbnail.jpg",
    "images\\image-product-3-thumbnail.jpg",
    "images\\image-product-4-thumbnail.jpg"
];
var info  = "These low-profile sneakers are your perfect casual wear companion.Featuring a durable rubber outer sole, they'll withstand everythingthe weather can offer."
var productName = "Fall Limited Edition Sneaker";
var productCompany ="sneaker company";

let qntyCounter = 0;
let galleryCounter = 0;

class Product {
    constructor(name,company,images,initPrice,sale,info) {
        this.name = name;
        this.company = company;
        this.images = images;
        this.initPrice = initPrice;
        this.sale = sale;
        this.info = info;
    }

    get getName() {
        return this.name;
    }

    get getCompany() {
        return this.company;
    }

    get getImages() {
        return this.images;
    }

    get getInitPrice() {
        return this.initPrice;
    }

    get getSalePerc() {
        return this.sale;
    }

    get getInfo() {
        return this.info;
    }

    get getSalePrice() {
        if(this.isInSale) {
            return this.initPrice - this.initPrice * (this.sale/100);
        }
        return this.initPrice;
    }

    getImage(i) {
        if(i>=0 && i<=this.images.length) return this.images[i];

        return null;   
    }

    isInSale() {
        if(this.sale===0) return false;
        return true;
    }
};

let productOne = new Product(productName,productCompany,productImages,250,50,info);
showProduct(productOne);

hamIcon.addEventListener("click", function() {
    navMenu.classList.toggle("active-menu");
});

closeIcon.addEventListener("click",function() {
    navMenu.classList.toggle("active-menu");
});

cartImg.addEventListener("click",function() {
    cartContainer.classList.toggle("active-cart");
});

galleryBtns.forEach(btn => {
    btn.addEventListener("click",function() {
        var data = this.dataset.gallery;
        showImage(data);
    })
});

changeQntyBtns.forEach(btn => {
    btn.addEventListener("click",function() {
        var data = this.dataset.value;
        updateQntyCounter(data);
    })
});


addCartBtn.addEventListener("click",function() {
    updateCart(productOne);
});


function showImage(d) {
    if(d==="previous") {
        galleryCounter--;
        if(galleryCounter<0) galleryCounter = productOne.getImages.length-1; 
    }
    else if(d==="next") {
        if(galleryCounter===productOne.getImages.length-1) galleryCounter = 0;
        else galleryCounter++;  
    }
    else {
        return;
    }
    boxMainImage.src = productOne.getImage(galleryCounter);
}

function updateQntyCounter(d) {
    if(d==="plus") {
        qntyCounter++;
        
    }
    else if(d==="minus") {
        qntyCounter--;
        if(qntyCounter<0) qntyCounter = 0;
    }

    qntyCounterElem.textContent = qntyCounter; 
}

function showProduct(product) {
    boxMainImage.src = product.getImage(0); 
    productCompanyElem.textContent  = product.getCompany;
    productNameElem.textContent = product.getName;
    productInfoElem.textContent = product.getInfo;
    

    if(product.isInSale()) {
        productPriceElem.textContent = `$${product.getSalePrice}`;
        productSaleElem.textContent = `${product.getSalePerc}%`;
        productInitPriceElem.textContent = `$${product.getInitPrice}`;
    }
    else {
        productPriceElem.textContent = `$${product.getInitPrice}`;
    }
}

function updateCart(product) {

    if(qntyCounter>0 && productsContainerElem.children.length===2) {
        emptyCartText.style.display = "none";
        productsContainerElem.insertBefore(createProdContainer(product),checkoutBtn);
        checkoutBtn.style.display = "block";
    }
    else {
        if(qntyCounter===0) {
            initCart();
        }
        else {
            var qntyElement = document.querySelector(".qnty");
            var finalPrice = document.querySelector(".final-price");

            
            qntyElement.textContent = qntyCounter;

            var price = product.isInSale()? product.getSalePrice : product.getInitPrice;
            finalPrice.textContent = `$${qntyCounter * price}`;
        }
    }
}

function createProdContainer(product) {

    const productContainer = document.createElement("div");
    productContainer.classList.add("product-container");

    const cartThumbnail = document.createElement("div");
    cartThumbnail.classList.add("cart-thumbnail");

    const thumbnail = document.createElement("img");
    thumbnail.src = productThumbnails[0];
    thumbnail.alt = "product one thumbnail";

    cartThumbnail.appendChild(thumbnail);
    productContainer.appendChild(cartThumbnail);


    const cartInfo = document.createElement("div");
    cartInfo.classList.add("cart-info");

    const info = document.createElement("div");
    const par = document.createElement("p");
    par.textContent = product.getName;
    //.slice(0,product.getName.length-9)+"...";

    info.appendChild(par);
    cartInfo.appendChild(info);

    const priceInfo = document.createElement("div");
    const priceSpan = document.createElement("span");
    priceSpan.classList.add("price");

    var price = product.isInSale()? product.getSalePrice : product.getInitPrice;
    priceSpan.textContent = `$${price}.00`;

    const xSpan = document.createElement("span");
    xSpan.textContent = "x";

    const qntySpan = document.createElement("span");
    qntySpan.classList.add("qnty");
    qntySpan.textContent = qntyCounter;

    const finalPriceSpan = document.createElement("span");
    finalPriceSpan.classList.add("final-price");

    var price = product.isInSale()? product.getSalePrice : product.getInitPrice;

    finalPriceSpan.textContent = `$${qntyCounter * price}`;
    
    priceInfo.appendChild(priceSpan);
    priceInfo.appendChild(xSpan);
    priceInfo.appendChild(qntySpan);
    priceInfo.appendChild(finalPriceSpan);
    cartInfo.appendChild(priceInfo);

    productContainer.appendChild(cartInfo);

    const trashDiv = document.createElement("div");
    trashDiv.classList.add("trash-bin");
    const trashImage = document.createElement("img");
    trashImage.src = "images/icon-delete.svg";
    trashImage.addEventListener("click",deleteProduct);

    trashDiv.appendChild(trashImage);

    productContainer.appendChild(trashDiv);

    return productContainer;
}

function deleteProduct() {
    initCart();
}

function initCart() {
    if(productsContainerElem.children.length===2) return;
    document.querySelector(".product-container").remove();
    productsContainerElem.children[0].style.display="block";  
    checkoutBtn.style.display ="none";
}