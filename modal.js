// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var title = document.getElementById("modalTitle");
var desc = document.getElementById("modalDesc");


// When the user clicks on the button, open the modal
function ShowModal(){
  modal.style.display = "block";
  OnFocus(true);
}

function ShowModal(id){
  SetContent(id);
  modal.style.display = "block";
  try{
  OnFocus(true);
  }
  catch(e){
    
  }

}


function SetContent(id){

	for (i in data.Modals) {
		if (data.Modals[i].id == id ){
			title.innerHTML = data.Modals[i].title;
			desc.innerHTML = data.Modals[i].desc;
		}
	}
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  OnFocus(false);
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  	OnFocus(false);
  }
}