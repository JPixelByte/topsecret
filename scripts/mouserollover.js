/*jshint esversion: 6 */
const invert = document.querySelector(".invert")
const secretkey = document.querySelector(".secret-key")
const secretkey2 = document.querySelector(".secret-key2")
const alphabetsoup = document.querySelector(".alphabetsoup")

//Multiple Tweens
const rotateTween = gsap.to(invert,{rotation:360, repeat:-1, yoyo:true, paused:true});
const scaleTween = gsap.to(secretkey, {scale:1.5, repeat:-1, yoyo:true, paused:true});
/*const distortTween = gsap.to(secretkey2,{skewX:140, skewY:40, repeat:-1, yoyo:true, paused:true});*/
const alphaRotateTween = gsap.to(secretkey2,{opacity:0,rotation:-720, repeat:-1, yoyo:true, paused:true});
const alphabetSoupScaleTween = gsap.to(alphabetsoup,{scale:1.5, repeat:-1, yoyo:true, paused:true});
// const alphabetSoupRotateTween = gsap.to(alphabetsoup,{rotation:360, repeat:-1, yoyo:true, paused:true});

//Invert Rotational Event Listeners
invert.addEventListener("mouseenter", ()=> rotateTween.restart())
invert.addEventListener("mouseleave", ()=> {
	rotateTween.pause()
	//create a new tween to return to normal size smoothly
	gsap.to(invert,{rotation:360})

})

//Secret Key Scale  Event Listeners
secretkey.addEventListener("mouseenter", ()=> scaleTween.restart())
secretkey.addEventListener("mouseleave", ()=> {
	scaleTween.pause()
	//create a new tween to return to normal size smoothly
	gsap.to(secretkey, {scale:1})
})

//Secret Key2 Alpha Rotate  Event Listeners
secretkey2.addEventListener("mouseenter", ()=> alphaRotateTween.restart())
secretkey2.addEventListener("mouseleave", ()=> {
	alphaRotateTween.pause()

	gsap.to(secretkey2, {alpha:1, rotation:360})
})

//AlphaBet Soup Rotate  Event Listeners
alphabetsoup.addEventListener("mouseenter", ()=> alphabetSoupScaleTween.restart())
alphabetsoup.addEventListener("mouseleave", ()=> {
	alphabetSoupScaleTween.pause()
	//create a new tween to return to normal size smoothly
	gsap.to(alphabetsoup, {alpha:1, scale:1})
})
