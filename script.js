// hamburger menu functionalilty responsive
let hamburger= document.getElementById("hamburger");
hamburger.addEventListener("click",()=>{
    console.log("Event Clicked!");
    document.getElementById("menu").classList.toggle("opacity-0");
    document.getElementById("bar1").classList.toggle("rotate-45");
    document.getElementById("bar1").classList.toggle("translate-y-2");
    document.getElementById("bar2").classList.toggle("hidden");
    document.getElementById("bar3").classList.toggle("-rotate-45");
    document.getElementById("bar3").classList.toggle("-translate-y-1");
})


