var users = [];
var usersArrayStore;
var userID = 0, selectedUserID = -1, gridSelectedIndex = -1;
var usersGrid;

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
		var user = createUser();
		user.setName('David' + i);
		user.setAge(26 + i);
		user.setEmail('email@hotmail.com');
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
		{name: 'email', type: 'string'},
		{name: 'index', type: 'int'}
		],
		setName: function(newName) {
			this.set('name', newName);
		},
		setAge: function(newName) {
			this.set('age', newName);
		},
		setEmail: function(newName) {
			this.set('email', newName);
		},
		save: function(){

			var index = this.get('index');

			if (index > -1) {

				users.splice(index,1,this);

			}else{

				userID++;
				this.set('id',userID);
				users.push(this);

			}
		},
		getUser: function(id){
			var  i = 0, found = false;
			while(i < users.length && found == false){
				if (users[i].get('id') === id){
					this.setName(users[i].get('name'));
					this.setAge(users[i].get('age'));
					this.setEmail(users[i].get('email'));
					this.set('id',users[i].get('id'));
					this.set('index',i);
					found = true;
				};
				i++;
			}
		}
	});
};

function createUser(){
	var user = Ext.create('User', {
		index: -1,
		id   : -1,
		name : '',
		age  : 0,
		email: ''
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
    createNewButton(),
    createSaveButton(),
    createGrid()
    ]
});

	return panel;

}

function saveInfo(){

	var user = createUser();
	var name = Ext.getCmp('nameTextField').getValue();
	var age = Ext.getCmp('ageTextField').getValue();
	var email = Ext.getCmp('emailTextField').getValue();

	if (selectedUserID == -1){

		user.setName(name);
		user.setAge(age);
		user.setEmail(email);
		user.save();

		usersArrayStore.reload();
		resetForm();

	}else{

		user.getUser(selectedUserID);

		user.setName(name);
		user.setAge(age);
		user.setEmail(email);

		user.save();
		usersArrayStore.reload();
		usersGrid.getSelectionModel().select(gridSelectedIndex)

	}

}

function createNewButton(){

	var button = Ext.create('Ext.Button',{
		text: 'New User',
		handler: newUser
	});

	return button;

}

function createSaveButton(){

	var button = Ext.create('Ext.Button',{
		text: 'Save User',
		handler: saveInfo,
		formBind: true
	});

	return button;

}

function newUser(){

	selectedUserID = -1;
	gridSelectedIndex = -1;
	resetForm();
	usersGrid.getSelectionModel().deselectAll();

}

function deleteSelection(grid, rowIndex, colIndex){

	var rec = grid.getStore().getAt(rowIndex);
	var name = rec.get('name');

	Ext.MessageBox.confirm('Confirm', 'Are you sure you want to delete ' + name + '?', 
		function(btn){
			if(btn ==='yes'){
				var id = rec.get('id');
				var index = arrayObjectIndexOf(id)
				if (index > -1){
					users.splice(index,1);
				};

    //ALL ARE WORKING
    usersArrayStore.reload();
	//grid.getStore().remove(rec);
	//grid.getStore().removeAt(rowIndex);
	resetForm();
}
});

}

function resetForm(){
	Ext.getCmp('nameTextField').setValue('');
	Ext.getCmp('ageTextField').setValue('');
	Ext.getCmp('emailTextField').setValue('');
}

function drawInfo(dv, record, item, index, e){
	gridSelectedIndex = index;
	selectedUserID = record.get('id')
	Ext.getCmp('nameTextField').setValue(record.get('name'));
	Ext.getCmp('ageTextField').setValue(record.get('age'));
	Ext.getCmp('emailTextField').setValue(record.get('email'));
}

function arrayObjectIndexOf(searchTerm) {
	for(var i = 0; i < users.length; i++) {
		if (users[i].get('id') === searchTerm) return i;
	}
	return -1;
}

function createUsersArrayStore(){

	usersArrayStore = Ext.create('Ext.data.ArrayStore', {
		model: 'User',
		data: users
	});

}

function createGrid(){

	usersGrid = Ext.create('Ext.grid.Panel', {
		store: usersArrayStore,
		stateful: true,
		collapsible: true,
		multiSelect: false,
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
        }],
        listeners:{
        	itemclick: drawInfo
        }
    });

	return usersGrid;

}