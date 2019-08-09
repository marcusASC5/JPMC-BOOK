const usernameElement = document.getElementById("username");
const messageElement = document.getElementById("message");
const button = document.getElementById("submitButton");
button.addEventListener("click",updateDB);
const target = document.querySelector(".allMessages");

//Set database object here
const db = firebase.firestore();

/**
 * Updates the database with the username and message.
 */
function updateDB(event){
    event.preventDefault();
    const username        = usernameElement.value;
    const message         = messageElement.value;

    usernameElement.value = "";
    messageElement.value  = "";

    console.log(username + " : " + message);
    
    const addText = document.createElement("p");
    addText.innerText += username + " : " + message;
    target.append(addText);
    

    //Update database here
    db.collection("messages").add(
        {
            username: username,
            message: message,
            created: firebase.firestore.FieldValue.serverTimestamp()
        }
    )
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}


// Set database "child_added" event listener here
db.collection("messages").orderBy("created", "asc").get().then(function(response){
    response.forEach(function(doc){
        console.log(doc.data());
        
    const newP = document.createElement("p");
    newP.innerText += doc.data().username + " : " + doc.data().message;
    target.append(newP);
    })
})