




/////////////////////////////////////////////////////////////////////////////

const score = document.querySelector("#point");
const questionText = document.querySelector("#question-text");

let counter = 0;


function givPoint()
{
    counter +=1;
    console.log(counter);
    score.innerHTML = counter;

    
    
}

function nytSpil()
{
    counter = 0;
    score.innerHTML = counter;
}

