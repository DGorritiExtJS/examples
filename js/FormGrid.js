var users = [];
var usersArrayStore;
var userID = 0;

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

	for (i = 0; i < 10; i++){
		var user = createUser('David' + i,26 + i,'email@hotmail.com');
		user.save();
	};

}

function defineUser(){
	Ext.define('User', {
		extend: 'Ext.data.Model',
		fields: [
		{name: 'id', type: 'int'},
		{name: 'name',  type: 'string'},
		{name: 'age',   type: 'int', convert: null},
		{name: 'email', type: 'string'}
		],
		changeName: function(newName) {
			this.set('name', newName);
		},
		save: function(){
			users.push(this);
		}
	});
};

function createUser(name,age,email){
	userID++;
	var user = Ext.create('User', {
		id   : userID,
		name : name,
		age  : age,
		email: email
	});
	return user;
};

function createPanel(){

	var panel = Ext.create('Ext.form.Panel', {
		title: 'Contact Info',
		width: 350,
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
    createSaveButton(),
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
	user.save();

	usersArrayStore.reload();

}

function createSaveButton(){

	var button = Ext.create('Ext.Button',{
		text: 'Save info',
		handler: saveInfo,
		formBind: true
	});

	return button;

}

function createDeleteButton(){

	var button = Ext.create('Ext.Button',{
		text: 'Delete Selection',
		handler: deleteSelection
	});

	return button;

}

function deleteSelection(grid, rowIndex, colIndex){

	var rec = grid.getStore().getAt(rowIndex);
    var id = rec.get('id');
    //var index = arrayObjectIndexOf(id);
    //alert(index);
    //BOTH ARE WORKING
	//grid.getStore().remove(rec);
	grid.getStore().removeAt(rowIndex);
	//alert("Delete " + rec.get('name'));

}

function arrayObjectIndexOf(searchTerm) {
    for(var i = 0; i < myArray.length; i++) {
        if (users[i].get('id') === searchTerm) return i;
    }
    return -1;
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
			text     : 'ID',
			sortable : 30,
			sortable : true,
			dataIndex: 'id',
			flex: 1
		},
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
		},{
			xtype:'actioncolumn', 
			width: 15,
			tdCls:'delete',
			items: [{
                icon: 'http://www.sanwebe.com/assets/ajax-add-delete-record/images/icon_del.gif',  // Use a URL in the icon config
                tooltip: 'Delete',
                handler: deleteSelection
            }]
        }]
    });

return usersGrid;

}