Template.SideNav.randoma = function(){
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

	var randomName = _.random(10, 99) + ' ' + _.sample(names);

	return randomName
}