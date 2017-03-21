function gm_authFailure() { /* Code */ };

$(document).ready(function(){
  console.log("Welcome to Beacon!");

  $("input[type='checkbox']").on("click", function() {
    console.log($($(this)[0]));
    console.log($($(this)[0]).checked);
  	if ($(this).checked === false) {
  		$(this).attr("checked", "checked");
  		$(this).checked === true;
  	} else {
  		$(this).removeAttr("checked");
  		$(this).checked === false;
  	}
  });

})
