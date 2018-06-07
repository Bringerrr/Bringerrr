var slider = new Slider();

console.log(slider)


slider.addSlides(["img/1.jpg","img/2.jpg"],"left");
slider.addSlides(["img/3.jpg","img/4.jpg"],"left");
slider.addSlides(["img/5.jpg"],"left");

slider.viewSlides("all","left","left");
slider.adapt();


var arr = [1,2,3,2,1]



console.log(arr.unshift(arr[arr.length-1]))
console.log(arr.pop())  

console.log(arr.unshift(arr[arr.length-1]))
console.log(arr.pop())  

console.log(arr.unshift(arr[arr.length-1]))
console.log(arr.pop())  

// console.log(arr.unshift(5))
// console.log(arr.pop()) 


console.log("arr = "+arr)