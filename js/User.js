var innerHtml = ([
'<div id="logo"></div>',
'<br class="clear" />',
'<header class="search">',
'    <input type="search">',
'</header>',
'<br class="clear" />',
'<div id="name">Name</div>',
'<div id="age">Age</div>',
]);

Ext.application({
	name   : 'MyApp',

	launch : function() {

		defineUser();
		var user = createUser('David',26);
		var viewPort = createViewPort(user);
	}

});

function defineUser(){
	Ext.define('User', {
		extend: 'Ext.data.Model',
		fields: [
		{name: 'name',  type: 'string'},
		{name: 'age',   type: 'int', convert: null}
		],
		changeName: function(newName) {
			this.set('name', newName);
		}
	});
};

function createUser(name,age){
	var user = Ext.create('User', {
		name : name,
		age  : age
	});
	return user;
};

function createViewPort(user){
 
	var viewPort = Ext.create('Ext.container.Viewport', {
		layout: 'fit',
		id: 'viewPort',
		items: [
		{
			title: 'Hello ' + user.get('name') + ', your are ' + user.get('age') + ' years old',
			html: innerHtml
		}
		]
	});

	return viewPort;
};