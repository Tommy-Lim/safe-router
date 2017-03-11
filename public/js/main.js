function gm_authFailure() { /* Code */ };

$(document).ready(function(){
  console.log("Welcome to Beacon!");

  $("input[type='checkbox']").on("click", function() {
  	if ($(this).checked === false) {
  		$(this).attr("checked", "checked");
  		$(this).checked === true;
  	} else {
  		$(this).removeAttr("checked");
  		$(this).checked === false;
  	}
  });

})
