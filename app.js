
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

    get getSalePrice() { //if product is in sale return the sale price
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

//selectors
let overlay = document.querySelector("#overlay");

let hamIcon = document.querySelector("#ham-icon");
let navMenu = document.querySelector(".nav-menu");
let closeIcon = document.querySelector("#close-icon");
let tabLabel = document.querySelector("hr");
let tabs = document.querySelectorAll(".nav-item");

let cartImg = document.querySelector("#cart-img");
let cartQnty = document.querySelector("#cart-qnty");
let cartContainer = document.querySelector(".cart-container");
let addCartBtn = document.querySelector("#add-cart-btn");
let productsContainerElem = document.querySelector(".products-container");
let checkoutBtn = document.querySelector("#checkout-btn");
let emptyCartText = document.querySelector(".empty-cart-text");

let galleryMainImage = document.querySelectorAll(".product-main-image")[0];
let boxMainImage = document.querySelectorAll(".product-main-image")[1];
let mainGalleryBtns = document.querySelectorAll(".main-gallery .gallery-btn");
let boxGalleryBtns = document.querySelectorAll(".lightbox-gallery .gallery-btn");
let lightBox = document.querySelector(".lightbox-gallery");
let lightBoxClose = document.querySelector("#lightbox-close");

let changeQntyBtns = document.querySelectorAll(".change-qnty");
let qntyCounterElem = document.querySelector("#qnty-counter");

let thumbnails = document.querySelectorAll(".thumbnail");
let thumbnailsContainer = document.querySelector(".thumbnails");

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
let activeMainThumb = thumbnails[0].children[0]; //the first thumb is the active thumb
let activeGalleryThumb = null;
let cart = [];

//the main gallery thumbnails are same with the lightbox so clone them
const item = thumbnailsContainer;
const clone = item.cloneNode(true);
lightBox.appendChild(clone);

//after cloning take the thumbs of lightbox and set the 
var boxThumbnails = document.querySelectorAll(".lightbox-gallery .thumbnail");

//set the main gallery thumb 
activeMainThumb.classList.toggle("active-thumb");

let productOne = new Product(productName,productCompany,productImages,250,50,info); //init the product
showProduct(productOne);

tabs.forEach(tab=>{ //for the tabs of nav
    tab.addEventListener("click",function() {
        moveTabLabel(this);
    })
});

overlay.addEventListener("click",function() { //if we click the lightbox overlay or the close button then remove the box
    offOverlay();
})

lightBoxClose.addEventListener("click",function() {
    offOverlay();
});

hamIcon.addEventListener("click", function() { //for the navmenu
    navMenu.classList.toggle("active-menu");
});

closeIcon.addEventListener("click",function() { //for the nav menu close icon
    navMenu.classList.toggle("active-menu");
});

cartImg.addEventListener("click",function() { //to show the cart
    cartContainer.classList.toggle("active-cart");
});

mainGalleryBtns.forEach(btn => { //for the main gallery images in mobile version
    btn.addEventListener("click",function() {
        var data = this.dataset.gallery;
        showImage(data,galleryMainImage);
    })
});

boxGalleryBtns.forEach(btn=> { //for the gallery buttons in lightbox mode
    btn.addEventListener("click",function() {
        var data = this.dataset.gallery;
        showImage(data,boxMainImage);
        updateBoxThumb(boxThumbnails[galleryCounter].children[0]);
    })
})

changeQntyBtns.forEach(btn => { //to change the product quantity
    btn.addEventListener("click",function() {
        var data = this.dataset.value;
        updateQntyCounter(data);
    })
});

addCartBtn.addEventListener("click",function() { //update the cart when we press the add button
    updateCart(productOne);
});

boxThumbnails.forEach(thumb => { //for the thumbnails and images of the lightbox 
    thumb.addEventListener("click",function() {
        updateBoxThumb(this.children[0]);
        galleryImage(boxMainImage,activeGalleryThumb);

        galleryCounter = findThumb(boxThumbnails,activeGalleryThumb);
        
    })
});

thumbnails.forEach(thumb => { //for the main gallery thumbs and images
    thumb.addEventListener("click",function() {
        updateMainThumb(this.children[0]);

        galleryCounter = findThumb(thumbnails,activeMainThumb);

        galleryImage(galleryMainImage,activeMainThumb);
    })
});

galleryMainImage.addEventListener("click",function() { //in desktop when we click the main image open the lightbox and show first the selected image
    if(window.innerWidth>=1000) {
        boxMainImage.src = galleryMainImage.src;

        activeGalleryThumb = Array.from(boxThumbnails).find(t=>t.children[0].src===activeMainThumb.src).children[0]; //to find the selected the thumbnail
        activeGalleryThumb.classList.toggle("active-thumb");
    
        onOverlay();
    }
});

/*functions*/
function moveTabLabel(tab) { //for the tab label
    var label = tab.dataset.label;
    tabLabel.style.marginLeft = (label*15+label*6.25)+"%";
}

function findThumb(thumbnails,target) { //to find the index of the thumb we are
    for(var i=0; i<thumbnails.length; i++) {
        if(target === thumbnails[i].children[0]) return i;
    }
}

function updateMainThumb(target) { //toggle the thumb we clicked
    if(activeMainThumb) activeMainThumb.classList.toggle("active-thumb");
        
    activeMainThumb = target;
    activeMainThumb.classList.toggle("active-thumb");
}

function updateBoxThumb(target) { //same for the box thumbs
    if(activeGalleryThumb) activeGalleryThumb.classList.toggle("active-thumb");
        
    activeGalleryThumb = target;
    activeGalleryThumb.classList.toggle("active-thumb");
}

function onOverlay() { //show overlay and lightbox
    overlay.style.display="block";
    lightBox.style.display="flex";
}

function offOverlay() { //remove overlay and lightbox
    overlay.style.display="none";
    activeGalleryThumb.classList.toggle("active-thumb");
    activeGalleryThumb = null;
    lightBox.style.display="none";
}

function showImage(val,image) { //for the navigation of images when pressing the gallery buttons
    if(val==="previous") {
        galleryCounter--;
        if(galleryCounter<0) galleryCounter = productOne.getImages.length-1;
    }
    else if(val==="next") {
        if(galleryCounter===productOne.getImages.length-1) galleryCounter = 0;
        else galleryCounter++;  
    }
    else {
        return;
    }
   image.src = productOne.getImage(galleryCounter);
}

function updateQntyCounter(val) {
    if(val==="plus") {
        qntyCounter++;
    }
    else if(val==="minus") {
        qntyCounter--;
        if(qntyCounter<0) qntyCounter = 0;
    }
    else {
        return;
    }
    qntyCounterElem.textContent = qntyCounter; 
}

function showProduct(product) { //init the product when we load the page
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

function updateCart(product) { //when we click the add button update
    if(qntyCounter>0 && productsContainerElem.children.length===2) { //if cart is empty (productsContainer contains the empty text and the checkout button)
        emptyCartText.style.display = "none";
        productsContainerElem.insertBefore(createProdContainer(product),checkoutBtn);
        checkoutBtn.style.display = "block";

        showCartQnty();
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

            showCartQnty();
        }
    }
}

function showCartQnty() {
    cartQnty.style.display = "block";
    cartQnty.textContent = qntyCounter;
}

function createProdContainer(product) { //create the product container in cart

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

    const binDiv = document.createElement("div");
    binDiv.classList.add("bin-icon");
    const binImage = document.createElement("img");
    binImage.src = "images/icon-delete.svg";
    binImage.alt = "bin icon"
    binImage.addEventListener("click",deleteProduct);

    binDiv.appendChild(binImage);

    productContainer.appendChild(binDiv);

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

    cartQnty.textContent = "";
    cartQnty.style.display="none";
}


function galleryImage(image,thumb) { //when we click the thumbnail change the mainImage
    var src = thumb.src.replace("-thumbnail","");
    image.src = src;
}