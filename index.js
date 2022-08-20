const imageDiv = document.querySelector('.small-images')
const imageDivZoom = document.querySelector('.small-images-zoom')
const nextBtn = document.querySelector('.next')
const previousBtn = document.querySelector('.previous')
const btnQuant = document.querySelectorAll('.btn-quant')
const quantitySpan = document.querySelector('.quantity-value')
const labels = document.querySelectorAll('.thumb-label')
const labelsZoom = document.querySelectorAll('.thumb-label-zoom')
const zoomContainer = document.querySelector('.master-zoom-container')
const zoomClose = document.querySelector('.close-zoom-btn')
const previousZoom = document.querySelector('.previous-zoom')
const nextZoom = document.querySelector('.next-zoom')
const addToCart = document.querySelector('.add-to-cart')
const circleOverCart = document.querySelector('.circle-over-cart')
const btnOpenCart = document.querySelector('.btn-open-cart')
const cartContent = document.querySelector('.cart-content')
const dumbster = document.querySelector('.btn-dumbster')
const checkout = document.querySelector('.checkout-btn')
const menuBtn = document.querySelector('.menu-btn')

let cartQuantity = 0;
let nQuantity = 0;
let slideTransform = 0;


nextBtn.addEventListener('click', changeSlide)
previousBtn.addEventListener('click', changeSlide)
btnQuant.forEach(btn => btn.addEventListener('click',changeQuant))
labels.forEach(label => label.addEventListener('click', changeBigSlide))
labelsZoom.forEach(label => label.addEventListener('click', changeBigSlideZoom))
imageDiv.addEventListener('click', zoomOn)
zoomClose.addEventListener('click', zoomOff)
previousZoom.addEventListener('click', zoomChangeByArrow)
nextZoom.addEventListener('click', zoomChangeByArrow)
addToCart.addEventListener('click', addItems)
btnOpenCart.addEventListener('click',openCart)
dumbster.addEventListener('click', deleteFromBasket)
menuBtn.addEventListener('click', () => {menuBtn.toggleAttribute('aria-expanded')})


function changeSlide(e) {
    let dir = e.currentTarget.value;
    switch(dir) {
        case('previous') :
        slideTransform = slideTransform > 0 ? slideTransform - 1 : 3;
        break;
        case('next') :
        slideTransform = slideTransform < 3 ? slideTransform + 1 : 0;
        break;
        default : slideTransform = slideTransform 
        break;
    }
    let transForm = 100 * slideTransform;
    imageDiv.style.transform = `translateX(-${transForm}%)`;
}

function changeBigSlide(e) {
    let val =  e.currentTarget.value;
    slideTransform = val == '1' ? 1 : val == '2' ? 2 : val == '3' ? 3 : val == '0' ? 0 : 2;
    console.log('val= === ' + val)
    let transForm = 100 * slideTransform;
    imageDiv.style.transform = `translateX(-${transForm}%)`;
    labels.forEach(button => button.removeAttribute('chosen'))
    e.currentTarget.setAttribute('chosen',true)
    imageDivZoom.setAttribute('slide',val)
    labelsZoom.forEach(btn => {
        if(btn.value == val){
            btn.setAttribute('chosen',true)
        }   else  {
            btn.removeAttribute('chosen')
        }
    })
}

function changeBigSlideZoom(e) {
    let val =  e.currentTarget.value;
    slideTransform = val == '1' ? 1 : val == '2' ? 2 : val == '3' ? 3 : val == '0' ? 0 : 2;
    let transForm = 100 * slideTransform;
    imageDivZoom.style.transform = `translateX(-${transForm}%)`;
    labelsZoom.forEach(button => button.removeAttribute('chosen'))
    e.currentTarget.setAttribute('chosen',true)
    imageDivZoom.setAttribute('slide',val)
}


function changeQuant(e) {
    let sign = e.currentTarget.value;
    sign == 'plus'? nQuantity ++ : sign == 'minus' && nQuantity > 0 ? nQuantity -- : nQuantity=nQuantity;
    quantitySpan.textContent = nQuantity
}

function zoomOn() {
    let slide = parseInt(imageDivZoom.getAttribute('slide'))
    slide=slide*100;
    imageDivZoom.style.transform = `translateX(-${slide}%)`
    zoomContainer.setAttribute('visibility', 'true')

}

function zoomOff() {
    zoomContainer.setAttribute('visibility', 'false')
}

function zoomChangeByArrow(e) {
    let slide = parseInt(imageDivZoom.getAttribute('slide'))
    let direct = e.currentTarget.value;
    switch (direct) {
        case ('next'):
            slide = slide >= 3 ? 0 : slide+1
            break;
        case ('previous'):
            slide = slide <= 0 ? 3 : slide-1
            break;
        default:
            slide = slide
            break;
    }
    let trans = slide * 100;
    imageDivZoom.setAttribute('slide',slide.toString())
    imageDivZoom.style.transform = `translateX(-${trans}%)`
    labelsZoom.forEach(btn => {
        if(btn.value == slide){
            btn.setAttribute('chosen',true)
        }   else  {
            btn.removeAttribute('chosen')
        }
    })
}

function addItems() {
    cartQuantity += nQuantity;
    nQuantity = 0;
    if(cartQuantity>0) {
        circleOverCart.setAttribute('anything',true)
        circleOverCart.textContent=cartQuantity
    }
    quantitySpan.textContent = nQuantity
}

function openCart() {
    let open = cartContent.getAttribute('visible')
    if(open == 'false'){
    cartContent.setAttribute('visible',true)
    if(cartQuantity > 0) {
        let price = cartQuantity*175
        document.querySelector('.cart-empty').setAttribute('visible',false)
        document.querySelector('.cart-filled').setAttribute('visible',true)
        document.querySelector('.cart-quantity').textContent=cartQuantity
        document.querySelector('.cart-total-price').textContent=`$${price} .00`        
    }   else  {
        document.querySelector('.cart-empty').setAttribute('visible',true)
        document.querySelector('.cart-filled').setAttribute('visible',false)
    }
        }   else   {
            cartContent.setAttribute('visible',false)
        }
}

function deleteFromBasket() {
    cartQuantity = 0
    document.querySelector('.cart-empty').setAttribute('visible',true)
    document.querySelector('.cart-filled').setAttribute('visible',false)
    circleOverCart.setAttribute('anything',false)
}