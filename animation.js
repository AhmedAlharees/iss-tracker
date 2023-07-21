
// anmation for the hero text & the arrow
const headerText = new SplitType('.page__header', {types: 'chars'});
const paragraphText = new SplitType('.page__para', {types: 'chars'});

const tl = gsap.timeline();

tl.to('.char', {
    y: 0,
    duration: 0.4,
    opacity: 1,
    stagger: 0.019
}).to('.downward-arrow', {
    opacity: 1,
}).to('.downward-arrow', {
    opacity: 0.1,
    y: 150,
    duration: 1,
    repeat: -1,
    yoyo: true,
    ease: 'power2.inOut'
})