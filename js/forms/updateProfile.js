jQuery(document).ready(function($) {
"use strict";
	// Get the modal
	var modal = document.getElementById('aboutMeEditModal');

	// Get the button that opens the modal
	var btn = document.getElementById("aboutMeEditModalBtn");

	// Get the <span> element that closes the modal
	var span = document.getElementById("aboutMeEditModalClose");

	// When the user clicks the button, open the modal 
	btn.onclick = function() {
		modal.style.display = "block";
            $.ajax({
                type: "GET",
				method: "GET",
                url: "https://904xhviqh5.execute-api.us-east-2.amazonaws.com/MyBuddyPOC/profile/" + sessionStorage.getItem("userId"),
                success: function(msg){
                    if (msg.messageFromServer == "Success") {
						if (msg.user.firstName != undefined && msg.user.firstName != "") {
							document.getElementById('aboutMeEditModalFirstName').value = msg.user.firstName;
						}
						if (msg.user.lastName != undefined && msg.user.lastName != "") {
							document.getElementById('aboutMeEditModalLastName').value = msg.user.lastName;
						}
						if (msg.user.aboutMe != undefined && msg.user.aboutMe != "") {
							document.getElementById('aboutMeEditModalAboutMe').value = msg.user.aboutMe;
						}
						if (msg.user.mentor == true) {
							document.getElementById('aboutMeEditModalIsMentor').checked = true;
						} else {
							document.getElementById('aboutMeEditModalIsMentor').checked = false;
						}
                    } else {
						//do nothing
                    }
                },
				 error: function (jqXHR, textStatus, errorThrown) {
					console.log(jqXHR.responseText)
				}, 
				 complete: function (data) {
					console.log(data);	
				 }

            });		
	}

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}
	
	// Get the button that opens the modal
	var btnUpdate = document.getElementById("btnUpdateProfile");

	btnUpdate.onclick = function() {
		event.preventDefault();		      
           var jsonData;	
		   document.getElementById("btnUpdateProfile").disabled = true;
		   var firstName = document.getElementById('aboutMeEditModalFirstName').value;
		   var lastName = document.getElementById('aboutMeEditModalLastName').value;
		   var aboutMe = document.getElementById('aboutMeEditModalAboutMe').value;
		   var isMentor = document.getElementById('aboutMeEditModalIsMentor').checked;
			jsonData = "{\"userId\":\"" + sessionStorage.getItem('userId') + "\", \"firstName\":\"" + firstName + "\", \"lastName\":\"" + lastName + "\", \"aboutMe\":\"" + aboutMe + "\", \"mentor\":\"" + isMentor + "\"}";
            $.ajax({
                type: "POST",
                url: "https://904xhviqh5.execute-api.us-east-2.amazonaws.com/MyBuddyPOC/profile/" + sessionStorage.getItem("userId"),
                data: jsonData,
                success: function(msg){
                    if (msg.messageFromServer == "Success") {
						var fullName;
						if (msg.user.firstName != undefined && msg.user.firstName != "") {
							document.getElementById('aboutMeEditModalFirstName').value = msg.user.firstName;
							fullName = msg.user.firstName;
						}
						if (msg.user.lastName != undefined && msg.user.lastName != "") {
							document.getElementById('aboutMeEditModalLastName').value = msg.user.lastName;
							fullName = fullName + " " + msg.user.lastName;
						}
						if (msg.user.aboutMe != undefined && msg.user.aboutMe != "") {
							document.getElementById('aboutMeEditModalAboutMe').value = msg.user.aboutMe;
							document.getElementById('loggedInUserAboutMe').innerHTML = msg.user.aboutMe;
						}		
						if (fullName != undefined) {
							document.getElementById('loggedInUserName').innerHTML = fullName;
						}
						
						$('#updateProfileSuccessMessage').html("Updated profile successfully!");
						modal.style.display = "none";
                    }
                    else {
                        $('#updateProfileErrorMessage').html("Unable to update profile. Please try again later.");
						$("#updateProfileErrorMessage").delay(3200).fadeOut(300);
                    }
                },
				 error: function (jqXHR, textStatus, errorThrown) {
					console.log(jqXHR.responseText);			
				}, 
				 complete: function (data) {
						console.log(data);	
						document.getElementById("btnUpdateProfile").disabled = false;
				 }

            });
    };
});
