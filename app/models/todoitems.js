exports.definition = {
	config: {
		columns: {
		    "list": "text",
		    "desc": "text",
		    "done": "integer"
		},
		adapter: {
			type: "sql",
			collection_name: "todoitems"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};