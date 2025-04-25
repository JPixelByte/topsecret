//Start of: GSAP Pattern Lock

gsap.to("pattern", {attr:{
	patternTransform:"scale(8) rotate(360) translate(25,0)"
}, ease:"none", duration:8, repeat:10, yoyo:true
})

//Start of: Touch Screen Evenhandlers for web and mobile
//window.addEventListener("touchstart", enterHere, false);
window.addEventListener("touchstart", enterHere, true);


window.addEventListener("click", enterHere);

function enterHere(){
    window.open('topsecret.html' ,'_self');
}