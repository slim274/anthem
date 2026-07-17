/* ==========================================
   Nigeria National Anthem Presentation
   Professional LED Version
========================================== */

const slides = [
    {
        start: 0,
        end: 9.8,
        line1: "Nigeria, we hail thee,",
        line2: "Our own dear native land,"
    },

    {
        start: 9.8,
        end: 19.6,
        line1: "Though tribe and tongue may differ,",
        line2: "In brotherhood, we stand,"
    },

    {
        start: 19.6,
        end: 29.5,
        line1: "Nigerians all, and proud to serve",
        line2: "Our sovereign Motherland."
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

function highlightLine(t){

    line1.classList.remove("active");
    line2.classList.remove("active");


    /* Slide 1 */

    if(t>=0 && t<5){

        line1.classList.add("active");

    }

    else if(t>=5 && t<9.8){

        line2.classList.add("active");

    }


    /* Slide 2 */

    else if(t>=9.8 && t<14.7){

        line1.classList.add("active");

    }

    else if(t>=14.7 && t<19.6){

        line2.classList.add("active");

    }


    /* Slide 3 */

    else if(t>=19.6 && t<24.6){

        line1.classList.add("active");

    }

    else{

        line2.classList.add("active");

    }

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

async function startPresentation(){

    help.style.display="none";

    if(document.documentElement.requestFullscreen){

        document.documentElement.requestFullscreen();

    }

    showSlide(0);

    try{

        await audio.play();

    }

    catch(err){

        console.log(err);

    }

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