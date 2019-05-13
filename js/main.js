
var TypeWritter = function(txtElement, words, wait = 3000){
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.typeFunc();
    this.isDeleting = false;
}

TypeWritter.prototype.typeFunc = function(){
    
    let currentInd = this.wordIndex % this.words.length;
    const fullTxt = this.words[currentInd];
    if(!this.isDeleting){
        this.txt = fullTxt.slice(0, this.txt.length + 1);
    }else{
        this.txt = fullTxt.slice(0, this.txt.length - 1);
    }

    var typeSpeed = 500;
    if(this.isDeleting){
        typeSpeed /= 2;
    }
    if(!this.isDeleting && this.txt === fullTxt){
        typeSpeed = 6000;
        this.isDeleting = true;
        
    }else if(this.isDeleting && this.txt.length === 0){
        this.isDeleting = false;
        this.wordIndex++;
    }
    
    // Insert html in the textElement DOM
    this.txtElement.innerHTML = `<span class = "txt">${this.txt}</span>`
    
    setTimeout(() => this.typeFunc(), typeSpeed);
}

document.addEventListener('DOMContentLoaded', init);

function init(){
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    
    new TypeWritter(txtElement, words, wait);
}