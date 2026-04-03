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
async function loadWordDetails(id) //using async-await;
{
    const url=`https://openapi.programming-hero.com/api/word/${id}`;
    // console.log(url);
    // fetch(url).then(res=>res.json()).then(data=>console.log(data));
    const res= await fetch(url);
    const data= await res.json();
    displayWordDetails(data.data);
}
function synonymDiv(synonym)
{
    return synonym.map(el=>`<span class="btn">${el}</span>`).join(" ");
}
function displayWordDetails(details)
{
    console.log(details);
    const modal=document.getElementById("my_modal_5");
    modal.showModal();
    document.getElementById("detail_modal").innerHTML=`
                    <div>
                        <h4 class="text-lg font-bold">${details.word}(<i class="fa-solid fa-microphone-lines"></i> :<span class="hind-siliguri">${details.pronunciation}</span>)</h4>
                    </div>
                    <div>
                        <h5 class="text-lg font-bold">Meaning</h5>
                        <p class="py-4 hind-siliguri">${details.meaning}</p>
                    </div>
                    <div>
                        <h5 class="text-lg font-bold">Example</h5>
                        <p class="py-4">${details.sentence}</p>
                    </div>
                    <div>
                        <h5 class="text-lg font-bold hind-siliguri">সমার্থক শব্দ গুলো</h5>
                        <!-- <span class="btn">${details.synonyms[0]}</span>
                        <span class="btn">${details.synonyms[1]}</span> -->
                        <div>${synonymDiv(details.synonyms)}</div>
                    </div>
                    <div class="modal-action">
                    <form method="dialog">
                        <!-- if there is a button in form, it will close the modal -->
                        <button class="btn">Close</button>
                    </form>
                    </div>`;
}
function removeButton()
{
    const removeButton=document.querySelectorAll(".rmvBtn");
    removeButton.forEach(btn=>btn.classList.remove("active"))
}

function loadLevelWords(id)
{
    const url=`https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url).then(res=>res.json()).then(data=>{
        const buttonNo=document.getElementById(`buttonNo-${id}`);
        // console.log(buttonNo);
        removeButton();
        buttonNo.classList.add("active");
        displayCard(data.data);
    });
}
function displayCard(words)
{   
    // console.log(words);
    const wordContainer=document.getElementById("word-container");
    wordContainer.innerHTML="";
    if(words.length===0)
    {
        wordContainer.innerHTML=`<div id="noContentMessage" class="text-center col-span-full">
                                    <img src="assets/alert-error.png" alt="" class="mx-auto">
                                    <p class="hind-siliguri text-xl">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                                    <p class="hind-siliguri font-medium text-6xl">নেক্সট Lesson এ যান</p>
                                </div>`;
    }
    words.forEach(word=>{
        const card=document.createElement("div");
        card.innerHTML=`<div class="bg-white rounded-xl text-center py-10 shadow-lg">
                            <h5 class="font-bold text-2xl">${word.word?word.word:"শব্দ পাওয়া যায় নি"}</h5>
                            <p class="font-light text-sm my-2">Meaning/pronounciation</p>
                            <p class="hind-siliguri font-semibold text-lg">"${word.meaning?word.meaning:"শব্দ পাওয়া যায় নি"} /${word.pronunciation?word.pronunciation:"শব্দ পাওয়া যায় নি"}"</p>
                            <div class="flex justify-around">
                                <button onclick="loadWordDetails(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50]"><i class="fa-solid fa-circle-info"></i></button>
                                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50]"><i class="fa-solid fa-volume-high"></i></button>
                            </div>
                        </div>`
        wordContainer.appendChild(card);
    })
}
function displayLesson(lessons)
{
    const lessonContainer=document.getElementById("level-container");
    lessonContainer.innerHTML="";
    for(let lesson of lessons) //this could be done by using forEach() method.
    {   
        const btnDiv=document.createElement("div");
        btnDiv.innerHTML=`<button id="buttonNo-${lesson.level_no}" onclick="loadLevelWords(${lesson.level_no})" class="border-2 rounded-xl font-semibold px-2 py-1 text-center text-blue-800 items-center hover:bg-sky-600 hover:text-white hover:border-white active:shadow-lg rmvBtn"><i class="fa-solid fa-book-open"></i> Lesson-${lesson.level_no}</button>`;
        lessonContainer.appendChild(btnDiv);
    }
}
function loadLessons()
{
    fetch("https://openapi.programming-hero.com/api/levels/all") //gives a promise of responce
    .then(res=>res.json())// gives a promise to return json data
    .then(jsonData=>displayLesson(jsonData.data));//finally the data returns and this .then handles the last promise
}

loadLessons();
