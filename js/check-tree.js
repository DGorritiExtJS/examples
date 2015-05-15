Ext.require([
    'Ext.tree.*',
    'Ext.data.*',
    'Ext.window.MessageBox'
    ]);

Ext.onReady(function() {
    var store = Ext.create('Ext.data.TreeStore', {
        root: {
            expanded: true,
            children: [{
                "text": "To Do", 
                "cls": "folder",
                "expanded": true,
                "children": [{
                    "text": "Go jogging",
                    "leaf": true,
                    "checked": true
                },{
                    "text": "Take a nap",
                    "leaf": true,
                    "checked": false
                },{
                    "text": "Climb Everest",
                    "leaf": true,
                    "checked": false
                }]
            },{
                "text": "Grocery List",
                "cls": "folder",
                "children": [{
                    "text": "Bananas",
                    "leaf": true,
                    "checked": false
                },{
                    "text": "Milk",
                    "leaf": true,
                    "checked": false
                },{
                    "text": "Cereal",
                    "leaf": true,
                    "checked": false
                },{
                    "text": "Energy foods",
                    "cls": "folder",
                    "children": [{
                        "text": "Coffee",
                        "leaf": true,
                        "checked": false
                    },{
                        "text": "Red Bull",
                        "leaf": true,
                        "checked": false
                    }]
                }]
            },{
                "text": "Remodel Project", 
                "cls": "folder",
                "children": [{
                    "text": "Finish the budget",
                    "leaf": true,
                    "checked": false
                },{
                    "text": "Call contractors",
                    "leaf": true,
                    "checked": false
                },{
                    "text": "Choose design",
                    "leaf": true,
                    "checked": false
                }]
            }]
        }
    });
var tree = new Ext.tree.TreePanel({
       store: store,
       width:150,
       title:'Layers',
       height:250,
       collapsible:true,
       rootVisible:false,
       renderTo: Ext.getBody()
   })
});
