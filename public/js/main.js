$(document).ready(function(){
  $("input[type='checkbox']").on("click", function() {
  	alert("holla");
  	if ($(this).checked === false) {
  		$(this).attr("checked", "checked");
  		$(this).checked === true;
  	} else {
  		$(this).removeAttr("checked");
  		$(this).checked === false;
  	}
  });
})
