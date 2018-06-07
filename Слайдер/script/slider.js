var Slider = function(){
    var self = this

    self.container = document.getElementsByClassName("slider-container")[0];
    self.slidesCont = document.getElementsByClassName("slides-container")[0];

    self.slidesCont.style.paddingLeft = "20%"
    self.slidesCont.style.paddingRight = "20%"

    self.buttonLeft = document.getElementsByClassName('left-button')[0];
    self.buttonRight = document.getElementsByClassName('right-button')[0];

    self.currPos = -50;
    self.promezutok = 15;
    self.step = 0.1;
    self.nextPos = self.currPos - self.promezutok;
    self.prevPos = self.currPos + self.promezutok;
    self.slidesCont.style.transform = "translateX("+self.currPos+"%) translateY(-50%) translateZ(0)";

    self.slides = [];
    self.currSlides = [];
    self.slideClassName = "slide"

    self.addSlides = function (s,move){
        if(move=="left"){
        s.forEach(e => self.slides.push(e)) }
        if(move=="right"){
        s.forEach(e => self.slides.unshift(e))
        }
    }

    self.viewSlides = function(elem,side,move){
        size = self.containerW * 0.199;

        function drawSlide(elem){
            var div = document.createElement("div");
            var innerDiv = document.createElement("div");
            var img = new Image();
            div.className = self.slideClassName;
            // div.innerHTML = elem;
            div.style.width = size + "px";
            div.style.height = size + "px";
            div.style.float = side;

            img.src = elem;

            div.appendChild(innerDiv)
            innerDiv.appendChild(img)
            // self.slidesCont.style.transform = "scale(0.6)";
            if(move=="left"){
                self.slidesCont.appendChild(div); 
                self.currSlides.push([div,self.getPos(div),self.getSize(div)]);
            }

            if(move=="right"){
                console.log("asdas");
                self.slidesCont.insertBefore(div,self.slidesCont.firstChild);
                
                self.currSlides.push([div,self.getPos(div),self.getSize(div)]);
            }
                
        }

        if(self.currSlides.length==0 && elem=="all"){
            self.slides.forEach(drawSlide);
        }
        else if( isFinite(elem) ) {drawSlide(self.slides[elem])}
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

    // self.scaleImg = function(){
    //     var center = self.containerW/2
    //     self.currSlides.forEach(
    //         elem=>{
    //             if(elem[1].left<=center){
    //                 elem[0].getElementsByTagName("img")[0].style.transform = "scale(0.5)"
    //             }
    //            console.log()
    //         }
    //     )
    //     return center
    // }

    self.scaleTimer = 0;

    self.moveLeft = function(){
            requestAnimationFrame(movement);
            function movement(){
                self.currPos -= self.step;
                self.scaleTimer += self.promezutok/self.step

                var center = self.containerW/2

                self.currSlides.forEach(
                    elem=>{
                        elem[0].getElementsByTagName("div")[0].style.transform = "translateX(-50%) scale("+(elem[1].left / center)+ ")"
                    console.log(elem[1].left / center)
                    }
                )
                //  Идея скейла: есть таймер от 0 до 100. 
                //  Каждый элемент массива подстривается под него 
                //  прим таймер: (0  [0-19], 1[20-39],   2[40-59],   3[60-79],   4[80-99])
                //      скейл : (   .25        .50          1           .50         .25 )
                //      расстояние от центра рассчитать как разницу ежду текущей позией и 
                //      центром контейнера в модуле
                //
                //  scaleImg()
                self.slidesCont.style.transform = "translateX("+self.currPos+"%) translateY(-50%) translateZ(0)";
                self.update();
                // self.scaleImg();

                if (self.currSlides[0][1].left <=0 && self.slides.length<=5){
                    console.log("ASda");
                    self.addSlides([self.slides[0]],"left");
                    slider.viewSlides(0,"left","left");
                    self.slidesCont.style.paddingRight = "0%"
                }
                if (self.currPos>=self.nextPos)requestAnimationFrame(movement);

                if(self.currPos<=self.nextPos){
                    self.slidesCont.removeChild(self.currSlides[0][0])
                    self.currSlides.shift();
                    self.slides.shift();
                    self.currPos = -50;
                    self.slidesCont.style.transform = "translateX("+self.currPos+"%) translateY(-50%) translateZ(0)";
                    self.slidesCont.style.paddingRight = "20%"
                    
                };
            }
        };

        self.moveRight = function(){
            requestAnimationFrame(movement);
            function movement(){
                self.currPos +=0.04; 
                self.slidesCont.style.transform = "translateX("+self.currPos+"%) translateY(-50%) translateZ(0)";
                self.update();
                if (self.currSlides[self.currSlides.length-1][1].left
                    +self.currSlides[self.currSlides.length-1][0].offsetWidth>self.containerW 
                    && self.slides.length<=5){
                    self.slidesCont.style.paddingLeft = "0%"
                    console.log("curr : " + self.slides)
                    self.addSlides([self.slides[self.slides.length-1]],"right"); 
                    console.log("curr : " + self.slides)
                    slider.viewSlides(self.slides.length-1,"left","right");
                }
                if (self.currPos<=self.prevPos)requestAnimationFrame(movement);

                if(self.currPos>=self.prevPos){
                    self.slidesCont.removeChild(self.currSlides[self.currSlides.length-1][0]) // Правильно удалить и заработает ! 
                    console.log(self.currSlides)
                    console.log(self.slides)
                    self.currSlides.pop();
                    self.slides.pop();
                    
                    console.log(self.currSlides)
                    console.log(self.slides)
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