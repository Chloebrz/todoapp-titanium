var args = arguments[0] || {};

var todoItems = Alloy.Collections.todoitems;
var id;

// $model represents the current model accessible to this
// controller from the markup's model-view binding. $model
// will be null if there is no binding in place.
if ($model) {
	id = $model.id;
	if ($model.get("done")) {
		$.item.backgroundColor = "#eee";
		$.check.backgroundColor = "#eee";
		$.itemDesc.color = "#A9A9A9";
		$.check.text = "X";
		$.check.color = "#61C5AA";
	} else {
		$.item.backgroundColor = "#fff";
		$.check.backgroundColor = "#fff";
		$.itemDesc.color = "#737373";
		$.check.text = "4";
		$.check.color = "#B594C4";
	}
}

function toggleStatus (e) {

	// retrieve the item
	var item = todoItems.get(id);

	// set it to done
	item.set({
		"done" : item.get("done") ? 0 : 1
	}).save();
}

function deleteItem (e) {

	e.cancelBubble = true;

	// retrieve the item
	var item = todoItems.get(id);
	
	// remove it from the database
	item.destroy();
}