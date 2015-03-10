var args = arguments[0] || {};

var facebook = Alloy.Globals.Facebook;
facebook.appid = "TO_CHANGE";

var mytodolists = Alloy.Collections.todolists;
mytodolists.fetch();

alert("Welcome " + args.username + "!");

if (OS_IOS) {
	
	var logoutBtn = Ti.UI.createButton({
		title : "Logout"
	});
	$.homeWindow.setRightNavButton(logoutBtn);
	
	logoutBtn.addEventListener("click", logout);
}

function createTodolist () {
	
	// if no value, return
	if (!$.newTodolist.value || $.newTodolist.value === "") return;
	
	// create the new todolist
	var newTodolist = Alloy.createModel("todolists", {
		title : $.newTodolist.value
	});
	
	// add it to the collection of todolists
	mytodolists.add(newTodolist);
	
	// save it
	newTodolist.save();
	
	// empty the form
	$.newTodolist.value = "";
}

function showTodolist (event) {
	
	// get the selected list and the view
	var selectedList = event.source;
	var args = {
		title : selectedList.title
	};
	var listview = Alloy.createController("listdetails", args).getView();

	// open the view
    //if (OS_IOS) out.open();
    
    if (OS_ANDROID) {
    	listview.open({
	    	activityEnterAnimation: Ti.Android.R.anim.slide_in_left,
	    	activityExitAnimation: Ti.Android.R.anim.slide_out_right
    	});
    }
}

function logout () {
	
	var out = Alloy.createController("index").getView();
	
	if (OS_IOS) out.open();
    
    if (OS_ANDROID) {
    	out.open({
	    	activityEnterAnimation: Ti.Android.R.anim.slide_in_left,
	    	activityExitAnimation: Ti.Android.R.anim.slide_out_right
    	});
    }
    
    facebook.logout();
}
