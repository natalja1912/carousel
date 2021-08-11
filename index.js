const leftButton = document.querySelector('.carousel__btn_left');
const rightButton = document.querySelector('.carousel__btn_right');
const images = document.querySelectorAll('.carousel__image');
const imagesList = document.querySelector('.carousel__list');
const imagesListItems = document.querySelectorAll('.carousel__item');
const navDots = document.querySelectorAll('.carousel__nav-btn');

//расположение картинок друг за другом
const locatePicture = (slide, index) => {
    slide.style.left = slide.offsetWidth * index + 'px';
}

images.forEach((slide, index) => locatePicture(slide, index));

//показ и скрытие левой и правой кнопок навигации 
const navButtonsManagement = (targetSlideIndex) => {
    const imagesAmount = Array.from(images).length;
    if (targetSlideIndex === (imagesAmount - 1)) {
        rightButton.classList.add('is-hidden');
        leftButton.classList.remove('is-hidden');
    }
    else if (targetSlideIndex === 0) {
        leftButton.classList.add('is-hidden');
        rightButton.classList.remove('is-hidden');
    }
    else {
        leftButton.classList.remove('is-hidden');
        rightButton.classList.remove('is-hidden');
    }
}

//передвижение списка с фото при клике на кнопки навигации
const imagesListTransform = (currentSlide, targetSlide) => {
    imagesList.style.transform = `translateX(-${targetSlide.firstElementChild.style.left})`;
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
    const targetSlideIndex = Array.from(images).findIndex(item => item === targetSlide.firstElementChild);
    const currentSlideIndex = Array.from(images).findIndex(item => item === currentSlide.firstElementChild);
    navDots[targetSlideIndex].classList.add('carousel__nav-btn_black');
    navDots[currentSlideIndex].classList.remove('carousel__nav-btn_black');
    navButtonsManagement(targetSlideIndex);
}

//скролл слайдов при клике на левую и правую кнопки навигации
rightButton.addEventListener('click', () => {
    const currentSlide = document.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    imagesListTransform(currentSlide, nextSlide);
})

leftButton.addEventListener('click', () => {
    const currentSlide = document.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    imagesListTransform(currentSlide, prevSlide);
})

//скролл слайдов при нажатии на кнопки нижней навигации (dots)
navDots.forEach(dot => {
    dot.addEventListener('click', e => {
        const targetDotIndex = Array.from(navDots).findIndex(item => item === e.target);
        const currentDot = document.querySelector('.carousel__nav-btn_black');
        const currentDotIndex = Array.from(navDots).findIndex(item => item === currentDot);
        currentDot.classList.remove('carousel__nav-btn_black');
        dot.classList.add('carousel__nav-btn_black');
        imagesListTransform(imagesListItems[currentDotIndex], imagesListItems[targetDotIndex]);
    })
})