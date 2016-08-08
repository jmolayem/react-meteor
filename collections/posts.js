Posts = new Mongo.Collection('posts');

PostSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Name"
	},
	desc: {
		type: String,
		label: "Description"
	}
})

Posts.attachSchema(PostSchema);