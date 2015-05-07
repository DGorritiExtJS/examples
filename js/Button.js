
Ext.application({
	name   : 'MyApp',

	launch : function() {

		defineUser();
		var user = createUser('David',26);
		var button = createButton();

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

function createButton(){

	var button = Ext.create('Ext.Button',{
			text: 'Change Name',
			renderTo: Ext.getBody(),
			handler: changeName
		});

	return button;

}

function changeName(){
	alert('Name changed');
}