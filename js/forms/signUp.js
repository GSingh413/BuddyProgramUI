jQuery(document).ready(function($) {
"use strict";
	
    $('#signup').submit(function(event){
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
			jsonData = "{\"email\":\"" + document.getElementById('signup-email').value + "\", \"password\":\"" + document.getElementById('signup-password').value + "\"}";
			console.log(jsonData);
            $.ajax({
                type: "POST",
                url: proxyURL + "https://904xhviqh5.execute-api.us-east-2.amazonaws.com/MyBuddyPOC/signup",
                data: jsonData,
                success: function(msg){
                   if (msg.messageFromServer == "Successful") {
						$("#signUpErrorMessage").removeClass("show");
                        $("#signUpSuccessMessage").addClass("show");	
						$('#signUpSuccessMessage').html("Successful Sign Up");						
						sessionStorage.setItem("email", document.getElementById('signup-email').value);		
						sessionStorage.setItem("userId", msg.user.userId);		
						updateValidUserUI($);
                    }
                    else {
                        $("#signUpSuccessMessage").removeClass("show");
                        $("#signUpErrorMessage").addClass("show");
						$('#signUpErrorMessage').html("Unable to register. Are you sure your not already registered?");
					}	
				document.getElementById("btnLogIn").disabled = false;					
                }
            });
        return false;
    });

});