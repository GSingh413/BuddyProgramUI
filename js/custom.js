(function($) {

  new WOW().init();

  jQuery(window).load(function() {
    jQuery("#preloader").delay(100).fadeOut("slow");
    jQuery("#load").delay(100).fadeOut("slow");
  });


  //jQuery to collapse the navbar on scroll
  $(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
      $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
      $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
  });

  //jQuery for page scrolling feature - requires jQuery Easing plugin
  $(function() {

    $('.navbar-nav li a').on('click', function(event) {

      if ($(this).is('a:not([href^="#"])') || $(this).attr("href") == '#') {
        return;
      }
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top
      }, 1500, 'easeInOutExpo');
      event.preventDefault();
    });

    $('.page-scroll a').on('click', function(event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top
      }, 1500, 'easeInOutExpo');
      event.preventDefault();
    });

  });
	
	var navMain = $(".navbar-collapse");
	navMain.on("click", "a:not([data-toggle])", null, function () {
	   navMain.collapse('hide');
	});

})(jQuery);


jQuery(document).ready(function($) {
	updateValidUserUI($);
});

	function updateValidUserUI($) {
		if (!isEmpty(sessionStorage.getItem("email"))) { 
			$("#signupsection").removeClass("show");		
			$("#signupsectiondropdown1").removeClass("show");
			$("#signupsectiondropdown2").removeClass("show");
			$("#about").removeClass("show");
			$("#aboutsectiondropdown").removeClass("show");
			$("#intro").removeClass("show");
			$("#aboutPageScroll").removeClass("show");
			$("#homesectiondropdown").removeClass("show");
			$("#myprofilesection").removeClass("hidden");
			$("#myprofiledropdown").removeClass("hidden");
			$("#logoutdropdown").removeClass("hidden");
			
			
			//update ui
			$.ajax({
                type: "GET",
                url: "https://904xhviqh5.execute-api.us-east-2.amazonaws.com/MyBuddyPOC/profile/" + sessionStorage.getItem("userId"),
                success: function(msg){
                    if (msg.messageFromServer == "Success") {
						var fullName;
						if (msg.user.firstName != undefined && msg.user.firstName != "") {
							fullName = msg.user.firstName;							
						}
						if (msg.user.lastName != undefined && msg.user.lastName != "") {
							fullName = fullName + " " + msg.user.lastName;
						}
						if (msg.user.aboutMe != undefined && msg.user.aboutMe != "") {
							document.getElementById('aboutMeEditModalAboutMe').innerHTML = msg.user.aboutMe;
							document.getElementById('loggedInUserAboutMe').innerHTML = msg.user.aboutMe;
						}
						if (fullName != undefined && fullName != "") {
							document.getElementById('loggedInUserName').innerHTML = fullName;
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
			
			$("#signupsection").addClass("hidden");		
			$("#signupsectiondropdown1").addClass("hidden");
			$("#signupsectiondropdown2").addClass("hidden");
			$("#about").addClass("hidden");
			$("#aboutsectiondropdown").addClass("hidden");
			$("#intro").addClass("show");
			$("#aboutPageScroll").addClass("hidden");
			$("#homesectiondropdown").addClass("hidden");
			$("#myprofilesection").addClass("show");
			$("#myprofiledropdown").addClass("show");
			$("#logoutdropdown").addClass("show");
			
		} else {
			$("#signupsection").removeClass("hidden");		
			$("#signupsectiondropdown1").removeClass("hidden");
			$("#signupsectiondropdown2").removeClass("hidden");
			$("#about").removeClass("hidden");
			$("#aboutsectiondropdown").removeClass("hidden");
			$("#intro").removeClass("hidden");
			$("#aboutPageScroll").removeClass("hidden");
			$("#homesectiondropdown").removeClass("hidden");
			$("#myprofilesection").removeClass("show");
			$("#myprofiledropdown").removeClass("show");
			$("#logoutdropdown").removeClass("show");
			
			
			$("#signupsection").addClass("show");		
			$("#signupsectiondropdown1").addClass("show");
			$("#signupsectiondropdown2").addClass("show");
			$("#about").addClass("show");
			$("#aboutsectiondropdown").addClass("show");
			$("#intro").addClass("show");
			$("#aboutPageScroll").addClass("show");
			$("#homesectiondropdown").addClass("show");
			$("#myprofilesection").addClass("hidden");
			$("#myprofiledropdown").addClass("hidden");
			$("#logoutdropdown").addClass("hidden");
		}
	}
	
	function isEmpty(str) {
		return (!str || 0 === str.length);
	}
	
	function logOut() {
		sessionStorage.removeItem("email");
		updateValidUserUI($);
	}
	
	var proxyURL = 'https://cors-anywhere.herokuapp.com/';