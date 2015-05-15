var usersStore, itemsPerPage = 3, pager, grid, win;

enableLoader();

Ext.application({
	name   : 'MyApp',

	launch : function() {

		defineUser();
		createStore();
		createPager();
		createGrid();
		createWin();

		win.show();

	}

});

function defineUser(){
	Ext.define('User', {
		extend: 'Ext.data.Model',
		fields: [
		{name: 'firstName', type: 'string'},
		{name: 'lastName', type: 'string'}
		]
	});
};

function enableLoader(){

	Ext.Loader.setConfig({
		enabled: true
	});

	Ext.Loader.setPath('Ext.ux', '../extjs-4.1.1/examples/ux');
	Ext.require('Ext.ux.data.PagingMemoryProxy');

}

function createGrid(){

	grid = new Ext.grid.GridPanel({
		store: usersStore,
		columns: [
		new Ext.grid.RowNumberer(),
		{text:'First Name', dataIndex:'firstName'},
		{text:'Last Name', dataIndex:'lastName'}
		],
		border: false,
		stripeRows: true,
		bbar: pager
	});

};

function createPager(){

	pager = new Ext.PagingToolbar({
		store: usersStore, 
		displayInfo: true,
		emptyMsg: 'No cities to display',
		pageSize: itemsPerPage
	});

};

function createWin(){

	win = new Ext.Window({
		title: 'Grid example',
		layout: 'fit',
		width: 510,
		height:350,
		items: grid
	});

};

function createStore(){

	usersStore = Ext.create('Ext.data.Store', {
		model: 'User',
		data : [
		{firstName: 'Ed',    lastName: 'Spencer'},
		{firstName: 'Tommy', lastName: 'Maintz'},
		{firstName: 'Aaron', lastName: 'Conran'},
		{firstName: 'Jamie', lastName: 'Avins'},
		{firstName: 'David',    lastName: 'Carter'},
		{firstName: 'Kevin ', lastName: 'Speacy'},
		{firstName: 'Homer', lastName: 'Simpson'},
		{firstName: 'Fox', lastName: 'Mulder'}
		],
		autoLoad: false,
		pageSize: itemsPerPage,
		//Key to page information together with enableLoader()
		proxy : {
			type: 'pagingmemory'
		}
	});
};