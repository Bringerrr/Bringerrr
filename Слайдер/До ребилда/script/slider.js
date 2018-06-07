var Slider = function(){
    var self = this

    self.container = document.getElementsByClassName("slider-container")[0];
    self.slidesCont = document.getElementsByClassName("slides-container")[0];

    self.slidesCont.style.paddingLeft = "20%"
    self.slidesCont.style.paddingRight = "20%"

    self.buttonLeft = document.getElementsByClassName('left-button')[0];
    self.buttonRight = document.getElementsByClassName('right-button')[0];

    self.currPos = -50;
    self.nextPos = self.currPos -15;
    self.prevPos = self.currPos +15;
    self.slidesCont.style.transform = "translateX("+self.currPos+"%) translateY(-50%) translateZ(0)";

    self.slides = [];
    self.currSlides = [];
    self.slideClassName = "slide"

    self.addSlides = function (s){
        s.forEach(e => self.slides.push(e) )
    }

    self.viewSlides = function(c,side){
        size = self.containerW * 0.199;
        function drawSlide(elem){
            var div = document.createElement("div");
            div.className = self.slideClassName;
            div.innerHTML = elem;
            div.style.width = size + "px";
            div.style.height = size + "px";
            div.style.float = side;
            self.slidesCont.appendChild(div);
            self.currSlides.push([div,self.getPos(div),self.getSize(div)]);

        }
        if(self.currSlides.length==0 && c=="all"){
            self.slides.forEach(drawSlide);
        }
        else if( isFinite(c) ) {drawSlide(self.slides[c])}
    };

    self.adapt = function(){
        window.onresize = function(EO){
            EO = EO || window.event;
            self.containerW = self.getSize(self.container).w 
            console.log(self.containerW)
            self.currSlides.forEach(
                elem=>{
                    elem[0].style.width = self.containerW*0.199 + "px";
                    elem[0].style.height = self.containerW*0.199 + "px";
                    elem[1]=self.getPos(elem[0]);
                }
            )
        }
    }

    self.getSize = function(e){
        return {
            w: e.offsetWidth,
            h: e.offsetHeight,
        }
    }

    self.update = function(){
        self.currSlides.forEach(
            elem=>{
                elem[0].style.width = self.containerW*0.199 + "px";
                elem[0].style.height = self.containerW*0.199 + "px";
                elem[1]=self.getPos(elem[0]);
            }
        )
    }

    self.moveLeft = function(){
            requestAnimationFrame(movement);
            function movement(){
                self.currPos -=0.1; 
                self.slidesCont.style.transform = "translateX("+self.currPos+"%) translateY(-50%) translateZ(0)";
                self.update();
                if (self.currSlides[0][1].left <=0 && self.slides.length<=5){
                    console.log("ASda");
                    self.addSlides([self.slides[0]]);
                    slider.viewSlides(0,"right");
                    self.slidesCont.style.paddingRight = "0%"
                }
                if (self.currPos>=self.nextPos)requestAnimationFrame(movement);

                if(self.currPos<=self.nextPos){
                    self.slidesCont.removeChild(self.currSlides[0][0])
                    console.log(self.currSlides)
                    console.log(self.slides)
                    self.currSlides.shift();
                    self.slides.shift();
                    console.log(self.currSlides)
                    console.log(self.slides)
                    self.currPos = -50;
                    self.slidesCont.style.transform = "translateX("+self.currPos+"%) translateY(-50%) translateZ(0)";
                    self.slidesCont.style.paddingRight = "20%"
                    
                };
            }
        };

        self.moveRight = function(){
            requestAnimationFrame(movement);
            function movement(){
                self.currPos +=0.1; 
                self.slidesCont.style.transform = "translateX("+self.currPos+"%) translateY(-50%) translateZ(0)";
                self.update();
                if (self.currSlides[self.currSlides.length-1][1].left
                    +self.currSlides[self.currSlides.length-1][0].offsetWidth>self.containerW 
                    && self.slides.length<=5){
                    self.slidesCont.style.paddingLeft = "0%"
                    self.addSlides([self.slides[self.slides.length-1]]); /// ZDECIA
                    slider.viewSlides(self.slides.length-1,"left");
                }
                if (self.currPos<=self.prevPos)requestAnimationFrame(movement);

                if(self.currPos>=self.prevPos){
                    self.slidesCont.removeChild(self.currSlides[self.currSlides.length-1][0])
                    self.currSlides.pop();
                    self.slides.pop();
                    self.currPos = -50;
                    self.slidesCont.style.transform = "translateX("+self.currPos+"%) translateY(-50%) translateZ(0)";
                    self.slidesCont.style.paddingLeft = "20%"
                };
            }
        };


    self.buttonLeft.addEventListener("click", self.moveLeft, false)
    self.buttonRight.addEventListener("click", self.moveRight, false)

    self.getPos = function (e) {
        var bbox=e.getBoundingClientRect();
        var parent=e.parentNode.parentNode.getBoundingClientRect();
        return {
            left: bbox.left-parent.left+window.pageXOffset,
            top: bbox.top+window.pageYOffset
        };
    }
    
    self.containerW = self.getSize(self.container).w
}