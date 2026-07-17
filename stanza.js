/* ==========================================
   Nigeria National Anthem Presentation
   Professional LED Version
========================================== */

const slides = [
    {
        start: 0.0,
        end: 9.2,
        line1: "O God of all creation,",
        line2: "Grant this our one request,"
    },
    {
        start: 9.2,
        end: 18.5,
        line1: "Help us to build a nation,",
        line2: "Where no man is oppressed,"
    },
    {
        start: 18.5,
        end: 28.0,
        line1: "And so with peace and plenty,",
        line2: "Nigeria may be blessed."
    }
];



const audio = document.getElementById("anthem");
const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");
const lyrics = document.getElementById("lyrics");
const endScreen = document.getElementById("endScreen");
const help = document.getElementById("help");

let currentSlide = -1;


/* ==========================================
      Show Slide
========================================== */

function showSlide(index){

    if(currentSlide === index) return;

    currentSlide = index;

    lyrics.classList.add("fade-out");

    setTimeout(()=>{

        line1.textContent = slides[index].line1;
        line2.textContent = slides[index].line2;

        lyrics.classList.remove("fade-out");
        lyrics.classList.add("fade-in");

    },250);

}


/* ==========================================
      Highlight Current Line
========================================== */
function highlightLine(t) {

    line1.classList.remove("active");
    line2.classList.remove("active");

    if (t < 4.6)
        line1.classList.add("active");
    else if (t < 9.2)
        line2.classList.add("active");
    else if (t < 13.8)
        line1.classList.add("active");
    else if (t < 18.5)
        line2.classList.add("active");
    else if (t < 23.2)
        line1.classList.add("active");
    else
        line2.classList.add("active");
}

/* ==========================================
      Sync Lyrics
========================================== */

audio.addEventListener("timeupdate",()=>{

    const t = audio.currentTime;

    highlightLine(t);

    for(let i=0;i<slides.length;i++){

        if(t>=slides[i].start && t<slides[i].end){

            showSlide(i);

            break;

        }

    }

});


/* ==========================================
      End Screen
========================================== */

audio.addEventListener("ended",()=>{

    lyrics.style.display="none";

    endScreen.classList.add("show");

});


/* ==========================================
      Start
========================================== */
async function startPresentation() {

    help.style.display = "none";

    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    }

    // Show first slide immediately
    currentSlide = -1;
    showSlide(0);

    // Highlight first line immediately
    line1.classList.add("active");
    line2.classList.remove("active");

    // Small delay so the text appears before the audio
    setTimeout(async () => {
        await audio.play();
    }, 300);
}

/* ==========================================
      Keyboard
========================================== */

document.addEventListener("keydown",(e)=>{

    switch(e.code){

        case "Space":

            e.preventDefault();

            if(audio.paused){

                startPresentation();

            }

            break;

        case "KeyF":

            if(!document.fullscreenElement){

                document.documentElement.requestFullscreen();

            }else{

                document.exitFullscreen();

            }

            break;

    }

});


/* ==========================================
      Initial Text
========================================== */

line1.textContent="Press SPACE to Begin";
line2.textContent="Federal Republic of Nigeria";