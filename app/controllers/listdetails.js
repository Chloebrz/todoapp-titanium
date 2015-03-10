var args = arguments[0] || {};

$.listWindow.title = args.title.toUpperCase() || "DEFAULT TITLE";

var mytodoitems = Alloy.Collections.todoitems;

var INDEXES = {
	"All" : 0,
	"To do" : 1,
	"Done" : 2
};
var whereIndex = INDEXES["All"];

mytodoitems.fetch();

// filter the items to show only the ones from the current list and corresponding to the selected menu item
function filterListItems (collection) {
	return !whereIndex ? collection.where({list : args.title}) : collection.where({list : args.title, done : whereIndex === 1 ? 0 : 1});
}
			
function addTodoItem () {
	
	// if no value, return
	if (!$.newTodoItem.value || $.newTodoItem.value === "") return;
	
	// create the new newTodoItem
	var newTodoItem = Alloy.createModel("todoitems", {
		desc : $.newTodoItem.value,
		list : args.title,
		done : 0
	});
	
	// add it to the collection of todoitems
	mytodoitems.add(newTodoItem);
	
	// save it
	newTodoItem.save();
	
	// empty the form
	$.newTodoItem.value = "";
}

function showItems (e) {
	
	// retrieve the selected menu item
	// TabbedBar on iOS
	if (typeof e.index !== "undefined" && e.index !== null) {
		whereIndex = e.index;
	}
	// Android menu
	else {
		whereIndex = INDEXES[e.source.title];
	}
	
	// update the todo items
	mytodoitems.fetch();
}
