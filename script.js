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

// Lesson section functionality
const loadLessons= ()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all") //gives a promise of responce
    .then(res=>res.json())// gives a promise to return json data
    .then(jsonData=>displayLesson(jsonData.data));//finally the data returns and this .then handles the last promise
}
function displayLesson(lessons)
{
    const lessonContainer=document.getElementById("level-container");
    lessonContainer.innerHTML="";
    for(let lesson of lessons)
    {   
        const btnDiv=document.createElement("div");
        btnDiv.innerHTML=`<button href="#" class="border-2 rounded-xl font-semibold px-2 py-1 text-center text-blue-800 items-center hover:bg-sky-600 hover:text-white hover:border-white"><i class="fa-solid fa-book-open"></i> Lesson-${lesson.level_no}</button>`;

        lessonContainer.appendChild(btnDiv);
    }
}
loadLessons();
