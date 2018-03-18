jQuery(document).ready(function($) {
"use strict";
	
    $('#login').submit(function(event){
		event.preventDefault();
        var f = $(this).find('.form-group'), 
        ferror = false, 
        emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

        f.children('input').each(function(){ // run all inputs

            var i = $(this); // current input
            var rule = i.attr('data-rule');

            if( rule !== undefined ){
            var ierror=false; // error flag for current input
            var pos = rule.indexOf( ':', 0 );
            if( pos >= 0 ){
                var exp = rule.substr( pos+1, rule.length );
                rule = rule.substr(0, pos);
            }else{
                rule = rule.substr( pos+1, rule.length );
            }
            
            switch( rule ){
                case 'required':
                if( i.val()==='' ){ ferror=ierror=true; }
                break;
                
                case 'minlen':
                if( i.val().length<parseInt(exp) ){ ferror=ierror=true; }
                break;

                case 'email':
                if( !emailExp.test(i.val()) ){ ferror=ierror=true; }
                break;

                case 'checked':
                if( !i.attr('checked') ){ ferror=ierror=true; }
                break;
                
                case 'regexp':
                exp = new RegExp(exp);
                if( !exp.test(i.val()) ){ ferror=ierror=true; }
                break;
            }
                i.next('.validation').html( ( ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '' ) ).show('blind');
            }
        });
        f.children('textarea').each(function(){ // run all inputs

            var i = $(this); // current input
            var rule = i.attr('data-rule');

            if( rule !== undefined ){
            var ierror=false; // error flag for current input
            var pos = rule.indexOf( ':', 0 );
            if( pos >= 0 ){
                var exp = rule.substr( pos+1, rule.length );
                rule = rule.substr(0, pos);
            }else{
                rule = rule.substr( pos+1, rule.length );
            }
            
            switch( rule ){
                case 'required':
                if( i.val()==='' ){ ferror=ierror=true; }
                break;
                
                case 'minlen':
                if( i.val().length<parseInt(exp) ){ ferror=ierror=true; }
                break;
            }
                i.next('.validation').html( ( ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '' ) ).show('blind');
            }
        });
        if( ferror ) return false; 
          else var jsonData;	
		   document.getElementById("btnLogIn").disabled = true;
			jsonData = "{\"email\":\"" + document.getElementById('login-email').value + "\", \"password\":\"" + document.getElementById('login-password').value + "\"}";
			$.ajax({
                type: "POST",
                url: "https://904xhviqh5.execute-api.us-east-2.amazonaws.com/MyBuddyPOC/login",
                data: jsonData,
                success: function(msg){
                    if ((msg.messageFromServer == "Success") || msg.messageFromServer == "Valid") {
                        $("#logInSuccessMessage").addClass("show");							
                        $("#logInErrorMessage").removeClass("show");
						$('#logInSuccessMessage').html("Successful Log in");
						sessionStorage.setItem("email", msg.user.email);	
						sessionStorage.setItem("userId", msg.user.userId);							
						updateValidUserUI($);	
						window.location.hash = '#myprofilesection';
                    }
                    else {
                        $("#logInSuccessMessage").removeClass("show");
                        $("#logInErrorMessage").addClass("show");
                        $('#logInErrorMessage').html("Invalid credentials. Please try again!");
                    }
                    document.getElementById("btnLogIn").disabled = false;
                },
				 error: function (jqXHR, textStatus, errorThrown) {
					console.log(jqXHR.responseText);			
					document.getElementById("btnLogIn").disabled = false;
				}, 
				 complete: function (data) {
						console.log(data);	
				 }

            });
        return false;
    });
});