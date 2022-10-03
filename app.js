function getElement(selection) {
    const element = document.querySelector(selection)
    if (element) {
        return element
    }
    throw new Error(`Please check "${selection}", no such element exists`)
}

class Gallery {
    constructor (element) {
        this.container = element
        this.list = [...element.querySelectorAll(".img")]

        // target
        this.modal = getElement(".modal")
        this.mainImg = getElement(".main-img")
        this.imageName = getElement(".image-name")
        this.modalImages = getElement(".modal-images")
        this.closeBtn = getElement(".close-btn")
        this.nextBtn = getElement(".next-btn")
        this.prevBtn = getElement(".prev-btn")

        // bind functions
        this.closeModal = this.closeModal.bind(this)
        this.nextImg = this.nextImg.bind(this)
        this.prevImg = this.prevImg.bind(this)
        this.choose = this.choose.bind(this)

        // container event
        this.container.addEventListener("click", function (e) {
        if (e.target.classList.contains("img")) {
            this.openModal(e.target, this.list)
        }
        }.bind(this))  
    }
    openModal(selectedImage, list) {
        this.setMainImage(selectedImage)
        this.modalImages.innerHTML = list.map(function (img) {
            return `
            <img
            src="${img.src}"
            title="${img.title}" 
            data-id="${img.dataset.id}"
            class="${selectedImage.dataset.id === img.dataset.id ? "modal-img selected" : "modal-img"}"
            />
            `
        }).join("")
        this.modal.classList.add("open")
        this.closeBtn.addEventListener("click", this.closeModal)
        this.nextBtn.addEventListener("click", this.nextImg)
        this.prevBtn.addEventListener("click", this.prevImg)
        this.modalImages.addEventListener("click", this.choose)

    }
    setMainImage(selectedImage) {
        this.mainImg.src = selectedImage.src
        this.imageName.textContent = selectedImage.title
    }
    closeModal() {
        this.modal.classList.remove("open")
        this.modal.classList.remove("open")
        this.closeBtn.removeEventListener("click", this.closeModal)
        this.nextBtn.removeEventListener("click", this.nextImg)
        this.prevBtn.removeEventListener("click", this.prevImg)
    }
    nextImg() {
        const selected = this.modalImages.querySelector(".selected")
        const next = selected.nextElementSibling || this.modalImages.firstElementChild
        selected.classList.remove("selected")
        next.classList.add("selected")
        this.setMainImage(next)
    }
    prevImg() {
        const selected = this.modalImages.querySelector(".selected")
        const prev = selected.previousElementSibling || this.modalImages.lastElementChild
        selected.classList.remove("selected")
        prev.classList.add("selected")
        this.setMainImage(prev)
    }
    choose(e) {
        const selected = this.modalImages.querySelector(".selected")
        const select = e.target.classList.contains("modal-img")
        if(select){
        selected.classList.remove("selected")
        e.target.classList.add("selected")
        this.setMainImage(e.target)
        }   
    }
}

const people = new Gallery(getElement(".people"))
const snacks = new Gallery(getElement(".snacks"))