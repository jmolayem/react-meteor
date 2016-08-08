Template.Pipelines.onCreated(function(){
	var self = this;
	self.autorun(function() {
		self.subscribe('Pipelines');
	});
});

Template.Pipelines.helpers({
	Pipelines: ()=> {
		return Pipelines.find({});
	}
});

Template.Pipelines.events({
	'click .new-Pipeline': () => {
		Session.set('newPipeline', true);
	}
});