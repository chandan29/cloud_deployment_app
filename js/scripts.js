var API_ENDPOINT = "https://ka8fpd4c34.execute-api.us-east-1.amazonaws.com/dev"

document.getElementById("sayButton").onclick = function(){

	var date = new Date()
	
	var inputData = {
		"author": $('#voiceSelected option:selected').val(),
		"note" : $('#postText').val(),
		"timestamp" : new Date(date.getTime() + (date.getTimezoneOffset() * 3600)).toJSON()
	};

	$.ajax({
	      url: API_ENDPOINT,
	      type: 'POST',
	      data:  JSON.stringify(inputData)  ,
	      contentType: 'application/json; charset=utf-8',
	      success: function (response) {
					document.getElementById("postIDreturned").textContent="Post ID: " + response;
	      },
	      error: function () {
	          alert("error");
	      }
	  });
	  document.getElementById("postText").value="";
	  length=0;
	  document.getElementById("charCounter").textContent="Characters: " + length;
}


document.getElementById("searchButton").onclick = function(){

	//var postId = $('#postId').val();
	
	var postId = "*"


	$.ajax({
				url: API_ENDPOINT + '?postId='+postId,
				type: 'GET',
				success: function (response) {

					$('#posts tr').slice(1).remove();

	        jQuery.each(response, function(i,data) {

						var player = "<audio controls><source src='" + data['url'] + "' type='audio/mpeg'></audio>"

						if (typeof data['url'] === "undefined") {
	    				var player = ""
						}

						$("#posts").append("<tr> \
								<td>" + data['author'] + "</td> \
								<td>" + data['note'] + "</td> \
								<td>" + data['hashtags'] + "</td> \
								<td>" + data['timestamp'] + "</td> \
								</tr>");
	        });
				},
				error: function () {
						alert("error");
				}
		});
		
		document.getElementById("myInput").style.visibility = "visible";
}

function myFunction() {
  // Declare variables 
  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("posts");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
}

document.getElementById("postText").onkeyup = function(){
	var length = $(postText).val().length;
	document.getElementById("charCounter").textContent="Characters: " + length;
}
