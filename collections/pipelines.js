Pipelines = new Mongo.Collection('pipelines');

var names = [
  'Cool Runnings',
  'Front Porch',
  'Soulshine',
  'Spearhead',
  'Sunshine',
  'Galileo V',
  'Starfighter',
  'Project Mayhem',
  'Morning Frost',
  'Radiant Forest',
  'Royale with Cheese',
  'X Wing',
  'Y Wing',
  'TIE Fighter',
  'Mr. Mugatu',
];

var randomname = _.random(10, 99) + ' ' + _.sample(names);

Pipelines.allow({
	insert: function(userId, doc) {
		return !!userId;
	},
	update: function(userId, doc) {
		return !!userId;
	}
});

Ingredient = new SimpleSchema({
	randomname: {
		type: String 
	},
	amount: {
		type: String
	}
});

PipelineSchema = new SimpleSchema({
	randomname: {
		type: String,
		label: "Name",
	},
	desc: {
		type: String,
		label: "Description"
	},
	ingredients: {
		type: [Ingredient]
	},
	inMenu: {
		type: Boolean,
		defaultValue: false,
		optional: true,
		autoform: {
			type: "hidden"
		}
	},
	author: {
		type: String,
		label: "Author",
		autoValue: function () {
			return this.userId
		},
		autoform: {
			type: "hidden"
		}
	},
	createdAt: {
		type: Date,
		label: "Created At",
		autoValue: function() {
			return new Date()
		},
		autoform: {
			type: "hidden"
		}
	}
});

Pipelines.attachSchema(PipelineSchema);