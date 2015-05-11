
Ext.application({
	name   : 'MyApp',

	launch : function() {

		var store = createTreeStore();
		var tree = createTreePanel(store);

	}

});

function createTreeStore(){

	return Ext.create('Ext.data.TreeStore', {
		root: {
			expanded: true,
			children: [
			{ text: "detention", leaf: true },
			{ text: "homework", expanded: true, children: [
			{ text: "book report", leaf: true },
			{ text: "algebra", leaf: true}
			] },
			{ text: "buy lottery tickets", leaf: true }
			]
		}
	});

};

function createTreePanel(store){

	return Ext.create('Ext.tree.Panel', {
		title: 'Simple Tree',
		width: 200,
		height: 150,
		store: store,
		rootVisible: false,
		renderTo: Ext.getBody(),
		listeners: {
			itemclick: function(s,r) {
				alert(r.data.text);
			}
		}
	});

};