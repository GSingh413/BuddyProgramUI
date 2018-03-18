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
	//testBuddy($);
});
	
	function loadMultiSelect($) {
			var interests = 'Big Data,Security,It,Leadership,Application Development,Financial Analysis,Investing,Marketing,Sales,Customer Relations'.split(',');
			var userInterests;
			$.ajax({
                type: "GET", 
				method: "GET",
                url: "https://904xhviqh5.execute-api.us-east-2.amazonaws.com/MyBuddyPOC/interest/" + + sessionStorage.getItem("userId"),
                success: function(msg){
                    if (msg.messageFromServer == "Success") {
						var userJsonInterests = msg.interests;
						userInterests = new Array(userJsonInterests.length);
						var multiSelectFrom = document.getElementById("multiselect");
						for(var i=0; i<userJsonInterests.length; i++) {
							var opt = document.createElement('option');
							opt.value = userJsonInterests[i].interestEnum;
							var innerHtmlForOption = userJsonInterests[i].interestEnum.replace('_', ' ');
							opt.innerHTML  = toTitleCase(innerHtmlForOption);
							userInterests[i] = opt.innerHTML;
							var multiSelectTo = document.getElementById("multiselect_to_1");	
							var alreadyExistsInSelectTo = false;
							for(var j=0; j<multiSelectTo.length; j++) {
								if(multiSelectTo.options[j].value === opt.value) {
									alreadyExistsInSelectTo = true;
									break;
								}
							}
							if (alreadyExistsInSelectTo === false) {
								multiSelectTo.appendChild(opt);
							}							
						}
						
						var differences = diff(interests, userInterests);
						for (var i=0; i<differences.length; i++) {
							var existsInSelectTo = false;				
								var opt = document.createElement('option');
								opt.innerHTML = differences[i];
								opt.value = differences[i].replace(' ', '_').toUpperCase();
								multiSelectFrom.appendChild(opt);							
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
	
	function diff(a1, a2) {
	  return a1.concat(a2).filter(function(val, index, arr){
		return arr.indexOf(val) === arr.lastIndexOf(val);
	  });
	}

	function toTitleCase(str)
	{
		return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}
	
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
			//$("#findmybuddy").removeClass("hidden");
			$("#findmybuddydropdown").removeClass("hidden");
			$("#logoutdropdown").removeClass("hidden");
			
			$('#multiselect').multiselect();
			loadMultiSelect($);
	//
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
			
			
			var jsonDataForRecommendations = "{\"userId\":\"" + sessionStorage.getItem("userId") + "\"}";
			$.ajax({
                type: "POST",
                url: "https://904xhviqh5.execute-api.us-east-2.amazonaws.com/MyBuddyPOC/recommendations/mentor",
				data: jsonDataForRecommendations,
                success: function(msg){
                    if (msg.messageFromServer == "Success") {
						alert(msg.mentorRecommendations);
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
			$("#about").addClass("hidden");0
			$("#aboutsectiondropdown").addClass("hidden");
			$("#intro").addClass("show");
			$("#aboutPageScroll").addClass("hidden");
			$("#homesectiondropdown").addClass("hidden");
			$("#myprofilesection").addClass("show");
			$("#myprofiledropdown").addClass("show");
			//$("#findmybuddy").addClass("show");
			$("#findmybuddydropdown").addClass("show");
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
			$("#findmybuddy").removeClass("show");
			$("#findmybuddydropdown").removeClass("show");
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
			$("#findmybuddy").addClass("hidden");
			$("#findmybuddydropdown").addClass("hidden");
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
	
	function findMyBuddy() {
		$("#myprofilesection").addClass("hidden");
		$("#findmybuddy").removeClass("hidden");
		//REPLACE WITH CALL TO AJAX
		var recommendationsOfBuddies = {

						"messageFromServer": "Success",

						"mentorRecommendations": [

							{

								"userId": 31,

								"firstName": "Mia",

								"lastName": "Harkins",

								"aboutMe": "Test out Leap",

								"interests": [

									{

										"interestEnum": "IT"

									}

								]

							},

							{

								"userId": 3,

								"firstName": "Raj",

								"lastName": "Singh",

								"aboutMe": "The cow jumped over the moon and thats why it is made out of cheese!!! On a serious note, why is the sky blue?",

								"interests": [

									{

										"interestEnum": "APPLICATION_DEVELOPMENT"

									}

								]

							},
							{

								"userId": 34,

								"firstName": "Ryan",

								"lastName": "Swanson",

								"aboutMe": "Love to cook",

								"interests": [

									{

										"interestEnum": "APPLICATION_DEVELOPMENT"

									}

								]

							}

						]

					}
		
		buildBuddyCarousel(recommendationsOfBuddies.mentorRecommendations, 2);
	}
	
	function buildBuddyCarousel(mentorRecommendations, maxItemsInItemList){
		var carouselItemList, carouselItemList, carouselListItemCounter, carouselItemRowCounter, buddyListLength, buddyCounter, indicatorCounter;
		
		carouselListItemCounter = 0;
		carouselItemRowCouter = -1;
		buddyCounter = 0;
		buddyListLength = mentorRecommendations.length;
		carouselItemList = [];
		
		while((buddyCounter < buddyListLength) && (buddyCounter < 9)) {
			var buddy = mentorRecommendations[buddyCounter];
			
			carouselItemList.push(buddy);
			carouselListItemCounter++;
			
			if((carouselListItemCounter == maxItemsInItemList) || (buddyCounter == buddyListLength)){
				carouselItemRowCounter++;
				indicatorCounter++;
				buildItem(carouselItemList, carouselItemRowCounter, maxItemsInItemList, indicatorCounter);
				carouselListItemCounter = 0;
				carouselItemList = [];
			}
			buddyCounter++;
		}
		
	}
	
	function buildItem (carouselItemList, carouselItemRowCounter, maxItemsInItemList, indicatorCounter) {
		var carouselContainer, dotIndicatorContainer, itemDiv, indicator, indicatorID;
		
		carouselContainer = document.getElementById("buddyContainer");
		
		dotIndicatorContainer = document.getElementById("dotIndicators");
		
		itemDiv = document.createElement("DIV");
		
		if(carouselItemRowCounter === 1){
			itemDiv.setAttribute("class", "item active");
		}else{
			itemDiv.setAttribute("class", "item");
		}
		
		itemDiv = buildItemContent(itemDiv, carouselItemList, maxItemsInItemList);
		
		carouselContainer.appendChild(itemDiv);
		
		if(maxItemsInItemList > 1){
			indicator = document.createElement("LI");
			indicator.setAttribute("data-target", "#carousel-content-option1");
			indicator.setAttribute("data-slide-to", indicatorCounter);
			//dotIndicatorContainer.appendChild(indicator);
		}
	}
	
	function buildItemContent(itemDiv, carouselItemList, maxItemsInItemList){
		var listItemCounter, carouselItemContent, startDiv, endDiv, carouselItemListLength, buddy;
		carouselItemListLength = carouselItemList.length;
		
		//startDiv = document.createElement("DIV");
		//startDiv.setAttribute("class", "col-lg-1");
		//itemDiv.appendChild(startDiv);
		
		listItemCounter = 0;
		
		while(listItemCounter < carouselItemListLength) {
			buddy = carouselItemList[listItemCounter];
			carouselItemContent = buildCarouselContent(buddy, maxItemsInItemList, listItemCounter, "IMG");
			itemDiv.appendChild(carouselItemContent);
			carouselItemContent = buildCarouselContent(buddy, maxItemsInItemList, listItemCounter, "PARA");
			itemDiv.appendChild(carouselItemContent);
			listItemCounter++;
		}
	
		//endDiv = document.createElement("DIV");
		//endDiv.setAttribute("class", "col-lg-1");
		//itemDiv.appendChild(endDiv);
		
		return itemDiv;
	
	}
	
	function buildCarouselContent(buddy, maxItemsInItemList, listItemCounter, typeToBuild){
		
		var item, image, anchor, paragraph;
		
		item = document.createElement("DIV");
		item.setAttribute("class", "carouselItemContent col-lg-2");
		
	/*	if(maxItemsInItemList == 2){
			if(listItemCounter === 1){
				item.setAttribute("class", "carouselItemContent col-lg-5 vuiTextAlignCenter");
			}
		}
		
		if(maxItemsInItemList === 1){
			item.setAttribute("class", "carouselItemContent col-md-4 vuiTextAlignCenter");
			item.style.height = "300px";
		}*/ 
		
		if(typeToBuild == "IMG"){
			image = buildImage(buddy);
			anchor = buildAnchor(image, buddy);
			item.appendChild(anchor);
		}
		
		if(typeToBuild == "PARA"){
			paragraph = buildParagraph(buddy);
			item.appendChild(paragraph);
		}
		
		return item;
	}
	
	function buildImage(buddy){
		var image = document.createElement("IMG");
		image.setAttribute("src", "img/icons/userProfile.png");
		image.setAttribute("alt", buddy.firstName + " " + buddy.lastName);
		image.setAttribute("width", "100");
		image.setAttribute("height", "100");
		image.setAttribute("display", "block");
		image.setAttribute("margin-left", "auto");
		image.setAttribute("margin-right", "auto");
		image.style.padding = "10px 10px 10px 10px";
		
		return image;
	
	}
	
	function buildAnchor(image, buddy) {
		var anchor = document.createElement("A");
		anchor.appendChild(image);
		
		return anchor;
	}
	
	function buildParagraph(buddy)  {
		var paragraph = document.createElement("P");
		var paragraphName = document.createTextNode(buddy.firstName + " " + buddy.lastName);
		var breakLine = document.createElement("br");
		var paragraphDesc = document.createTextNode(buddy.aboutMe);
		paragraph.setAttribute("text-align", "center");
		
		paragraph.appendChild(paragraphName);
		paragraph.appendChild(breakLine);
		paragraph.appendChild(paragraphDesc);
		
		return paragraph;
	}
	
	function restoreProfile() {
		$("#myprofilesection").removeClass("hidden");
		$("#findmybuddy").addClass("hidden");
	}
	
	var proxyURL = 'https://cors-anywhere.herokuapp.com/';
	
	