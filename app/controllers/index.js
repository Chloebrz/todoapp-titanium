$.index.open();

var users = Alloy.Collections.users;
users.fetch();

var facebook = Alloy.Globals.Facebook;
facebook.appid = "TO_CHANGE";

$.fbButton.addEventListener("click",function (e) {
	 
    facebook.addEventListener("login", function (e) {
        
        if (e.success) {
        	
			var args = {
				username : JSON.parse(e.data).first_name
			};
			
			var home = Alloy.createController("home", args).getView();
			
			if (OS_IOS) home.open();
		    
		    if (OS_ANDROID) {
		    	home.open({
			    	activityEnterAnimation: Ti.Android.R.anim.slide_in_left,
			    	activityExitAnimation: Ti.Android.R.anim.slide_out_right
		    	});
		    }
        }
        
        else if (e.error) alert(e.error);

        else if (e.cancelled) alert("Canceled");
    });
    facebook.authorize();
});

function login () {
	
	// if the username or password is missing, display an alert
	if ($.usernameL.value === "" || $.password.value === "") {alert("Username and password are required"); return;}
	
	// otherwise, check if the username is in the database
	var user = users.filter(function (user) {
		return user.get("username") === $.usernameL.value;
	});
	
	if (!user[0]) {alert("Username or password incorrect"); return;}
	
	// and if the password is correct
	if (user[0].get("password") !== $.password.value) {alert("Username or password incorrect"); return;}
	
	var args = {
		username : user[0].get("username")
	};
	
	var home = Alloy.createController("home", args).getView();
	
	if (OS_IOS) home.open();
    
    if (OS_ANDROID) {
    	home.open({
	    	activityEnterAnimation: Ti.Android.R.anim.slide_in_left,
	    	activityExitAnimation: Ti.Android.R.anim.slide_out_right
    	});
    }
}

function register () {
	
	if ($.usernameR.value === "" || $.password1.value === "" || $.password2.value === "") {
		alert("All fields are required");
		return;
	}
	
	var user = users.filter(function (user) {
		return user.get("username") === $.usernameR.value;
	});
	if (user[0]) {alert("Username already used!"); return;}
	
	if ($.password1.value !== $.password2.value) {
		alert("The 2 passwords must be the same");
		return;
	}
	
	var newUser = Alloy.createModel("users", {
		username : $.usernameR.value,
		password : $.password.value
	});
	users.add(newUser);
	newUser.save();
	
	var args = {
		username : $.usernameR.value
	};
	
	var home = Alloy.createController("home", args).getView();
	
	if (OS_IOS) home.open();
    
    if (OS_ANDROID) {
    	home.open({
	    	activityEnterAnimation: Ti.Android.R.anim.slide_in_left,
	    	activityExitAnimation: Ti.Android.R.anim.slide_out_right
    	});
    }
}
