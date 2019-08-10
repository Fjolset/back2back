const questions = document.querySelector("#question-list");
const form = document.querySelector("#add-question-form")

let hej = 1;

// Create elements and render questions
function renderQuestions(doc)
{
  let li = document.createElement("li");
  let question = document.createElement("span");
  let cross = document.createElement("div");

  li.setAttribute("data-id", doc.id);
  question.textContent = doc.data().question;
  cross.textContent = "x";

  li.appendChild(question);
  li.appendChild(cross);

  questions.appendChild(li);

  question.setAttribute("id", "sporgsmaal");

  /////TEST AREA


  
  /////TEST AREA


//Deleting data
  cross.addEventListener("click", (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute("data-id");
    db.collection("questions").doc(id).delete();
  })
}

//Getting data
// db.collection("questions").get().then((snapshot) => {
//   snapshot.docs.forEach(doc => {
//     console.log(doc.data())
//       renderQuestions(doc);
//   })
// });

//Add question
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if(form.question.value == "")
  {
    return
  }
  else
  {
    db.collection("questions").add({
      question: form.question.value
    });
    form.question.value = "";
  }
  
})

//Real-time listener
db.collection("questions").onSnapshot(snapshot => {
  let changes = snapshot.docChanges();
  changes.forEach(change => {
    if(change.type == "added")
    {
      renderQuestions(change.doc);
      
    } else if (change.type == "removed")
    {
      let li = questions.querySelector("[data-id=" + change.doc.id + "");
      questions.removeChild(li);
    }
  })
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const score = document.querySelector("#point");
const questionText = document.querySelector("#question-text");

let counter = 0;

function givPoint()
{
    counter +=1;
    console.log(counter);
    score.innerHTML = counter;
    // console.log(getQuestions());

    var texts = [];

    $(function() {
        $('ul span').each(function(){
            texts.push($(this).text());
        });
    
        console.log(texts);

        var rand = texts[Math.floor(Math.random() * texts.length)];

        console.log(rand);

        questionText.innerHTML = rand;
    });
}

function nytSpil()
{
    counter = 0;
    score.innerHTML = counter;
    questionText.innerHTML = "";
}





//////////////////////////////////////////////

const spilArea = document.querySelector('.spil');
const SporgArea = document.querySelector('.sporg');

function spil()
{
  spilArea.style.display = "block";
  SporgArea.style.display = "none";

  document.querySelector('#spilNav').style.textDecoration = "underline";
  document.querySelector('#sporgNav').style.textDecoration = "none";
}

function sporgmaal()
{
  spilArea.style.display = "none";
  SporgArea.style.display = "block";

  document.querySelector('#spilNav').style.textDecoration = "none";
  document.querySelector('#sporgNav').style.textDecoration = "underline";
}




