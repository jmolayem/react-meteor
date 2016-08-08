Template.leaderboard.helpers({
	'recipe': function(){
		return Recipes.find({roadlength});
	}
})