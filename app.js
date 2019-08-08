const questions = document.querySelector("#question-list");
const form = document.querySelector("#add-question-form")

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


