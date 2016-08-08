Meteor.publish('recipes', function(){
	return Recipes.find({author: this.userId});
});

Meteor.publish('SingleRecipe', function(id){
	check(id, String);
	return Recipes.find({_id: id});
});

Meteor.publish('points', function() {
  return Points.find();
});

Meteor.publish('pipelines', function(){
	return Pipelines.find();
});

Meteor.publish('posts', function(){
	return Posts.find();
});
