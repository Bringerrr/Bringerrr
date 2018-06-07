var slider = new Slider();

console.log(slider)


slider.addSlides([1,2]);
slider.addSlides([3,4]);
slider.addSlides([5]);

slider.viewSlides("all","left");
slider.adapt();
