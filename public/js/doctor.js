function addmargin(){
  document.querySelector("#content").classList.add("marginn");
}

function removemargin(){
  document.querySelector("#content").classList.remove("marginn");
}
function logout(){
  $.get("/logout");
  window.location = "http://localhost:3000/login"
}

function getPaitients(){
  $.get("/docDash/getPaitients",(data)=>{
      document.querySelector("#content").classList.remove('issue_form');
    document.querySelector("#content").innerHTML =''
    if(data.length != 0){
      data.forEach(paitient =>{
        document.querySelector("#content").innerHTML +=
        `
        <div class="issue_form">
        <p>Username : ${paitient}</p>
        <button type="button" class=" btn btn-primary" name="button" onclick="moredet('${paitient}')">More Info</button>
        </div>
        `
      })
    }
    else{
        document.querySelector("#content").innerHTML +=`
        <p>No Paitients to take care Currently</p>
        `
    }
  })
}

let pdet;
function moredet(username){
  $.post("/docDash/moredet" , { username }, (data)=>{
    //console.log(data);
    pdet = data.user
    const user = data.user;
      document.querySelector("#content").classList.add('issue_form');
    document.querySelector("#content").innerHTML= `
      <p> Name : ${user.name} </p>
      <p> Address : ${user.add} </p>
      <p> Doctor : ${user.doc} </p>
      <p> Age : ${user.age} </p>
      <p> Email : ${user.email} </p>
      <p> Phone : ${user.phone} </p>
      <p> Room : ${user.room} </p>
      <p> Wardboy : ${user.wardboy} </p>
      <p> Problem : ${user.prob} </p>
      <button type="button" class="btn btn-warning" name="button" onclick="viewMeds('${username}')">View Meds</button>
    `

  })
}


function viewMeds(username){
  $.post("/docDash/moredet" , { username }, (data)=>{
  pdet =  data.user
  document.querySelector("#content").classList.add('issue_form');
  document.querySelector("#content").innerHTML = `
  <p> Name : ${pdet.name} </p>
  <p> List of meds : </p>
  `
  let count = 0
  pdet.meds.forEach(med =>{
    document.querySelector('#content').innerHTML +=`
    <p>${med}  <button type="button" class="btn btn-danger mx-3" name="button" onclick="deleteMed('${count}')">Delete</button></p>
    `
    count+=1;
  })
  document.querySelector("#content").innerHTML +=`
  <p>Add medicene :</p>
  <input id="med" type="text" name="med" placeholder="Medicene" required>
  <button type="button" class="btn btn-primary" name="button" onclick="addMed()">Add Meds</button>
  `
  })
}

function addMed(){
  $.post("/docDash/addMed",{username : pdet.username , med : document.querySelector("#med").value}, (data)=>{
    viewMeds(pdet.username);
  })
}


function deleteMed(index){
  $.post("/docDash/delMed" , { username : pdet.username, index : index }, (data) =>{
    viewMeds(pdet.username);
  } )
}
