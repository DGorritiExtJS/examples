var users = [];
var usersArrayStore;

Ext.application({
	name   : 'MyApp',

	launch : function() {

		defineUser();
		loadDefaultUsers()

		createUsersArrayStore();

		createPanel();

	}

});

function loadDefaultUsers(){

	var user = createUser('David',26,'email@hotmail.com');
	users.push(user);

}

function defineUser(){
	Ext.define('User', {
		extend: 'Ext.data.Model',
		fields: [
		{name: 'name',  type: 'string'},
		{name: 'age',   type: 'int', convert: null},
		{name: 'email', type: 'string'}
		],
		changeName: function(newName) {
			this.set('name', newName);
		}
	});
};

function createUser(name,age,email){
	var user = Ext.create('User', {
		name : name,
		age  : age,
		email: email
	});
	return user;
};

function createPanel(){

	var panel = Ext.create('Ext.form.Panel', {
		title: 'Contact Info',
		width: 300,
		bodyPadding: 10,
		renderTo: Ext.getBody(),
		items: [
		{
			id: 'nameTextField',
			xtype: 'textfield',
			name: 'name',
			fieldLabel: 'Name',
        allowBlank: false  // requires a non-empty value
    }, {
    	id: 'ageTextField',
    	xtype: 'textfield',
    	name: 'age',
    	fieldLabel: 'Age',
    	enforceMaxLength: true,
    	maxLength: 3,
    	maskRe:/[0-9.]/,
        allowBlank: false  // requires a non-empty value
    }, {
    	id: 'emailTextField',
    	xtype: 'textfield',
    	name: 'email',
    	fieldLabel: 'Email Address',
        vtype: 'email',  // requires value to be a valid email address format
        allowBlank: false
    }, 
    createButton(),
    createGrid()
    ]
});

	return panel;

}

function saveInfo(){
	var name = Ext.getCmp('nameTextField').getValue();
	var age = Ext.getCmp('ageTextField').getValue();
	var email = Ext.getCmp('emailTextField').getValue();

	var user = createUser(name,age,email);
	users.push(user);

	usersArrayStore.reload();

	//showUsersInfo();
}

function createButton(){

	var button = Ext.create('Ext.Button',{
		text: 'Save info',
		handler: saveInfo,
		formBind: true
	});

	return button;

}

function showUsersInfo(){

	var info = "";

	users.forEach(function(user){

		info += user.get('name') + ' - ' + user.get('age') + ' - ' 
		+ user.get('email') + '\n';

	});

	Ext.each(usersArrayStore.getRange(), function (item, idx, a) {
		for (var i in item.data) {
			info += item.data[i] + '\n';
		}
	});

	alert(info);

}

function createUsersArrayStore(){

	usersArrayStore = Ext.create('Ext.data.ArrayStore', {
		model: 'User',
		data: users
	});

}

function createGrid(){

	var usersGrid = Ext.create('Ext.grid.Panel', {
		store: usersArrayStore,
		stateful: true,
		collapsible: true,
		multiSelect: true,
		stateId: 'usersGrid',
		height: 250,
		title: 'Array Grid',
		viewConfig: {
			stripeRows: true,
			enableTextSelection: true
		},
		columns: [
		{
			text     : 'Name',
			sortable : true,
			dataIndex: 'name',
			flex: 1
		},
		{
			text     : 'Age',
			width    : 40,
			sortable : true,
			dataIndex: 'age'
		},
		{
			text     : 'Email',
			width    : 140,
			sortable : true,
			dataIndex: 'email'
		}]
	});

	return usersGrid;

}