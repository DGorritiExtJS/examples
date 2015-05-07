Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.state.*'
    ]);

// Null out built in convert functions for performance *because the raw data is known to be valid*
// Specifying defaultValue as undefined will also save code. *As long as there will always be values in the data, or the app tolerates undefined field values*
Ext.define('User', {
    extend: 'Ext.data.Model',
    fields: [
    {name: 'name'},
    {name: 'age'},
    {name: 'email'}
    ]
});

var users = [];

Ext.application({
    name   : 'MyApp',

    launch : function() {    

    // sample static data for the store
    users = [
    ['David',71, 'email1@hotmail.com'],
    ['Ales',29, 'email2@hotmail.com'],
    ['Ibon',83, 'email3@hotmail.com']
    ];

    // create the data store
    var user = Ext.create('Ext.data.ArrayStore', {
        model: 'User',
        data: users
    });

    // create the Grid
    var grid = Ext.create('Ext.grid.Panel', {
        store: user,
        stateful: true,
        collapsible: true,
        multiSelect: true,
        stateId: 'stateGrid',
        columns: [
        {
            text     : 'Name',
            flex     : 1,
            sortable : true,
            dataIndex: 'name'
        },
        {
            text     : 'Age',
            width    : 75,
            sortable : true,
            dataIndex: 'age'
        },
        {
            text     : 'Email',
            width    : 75,
            sortable : true,
            dataIndex: 'email'
        }],
        height: 350,
        width: 600,
        title: 'Array Grid',
        renderTo: Ext.getBody(),
        viewConfig: {
            stripeRows: true,
            enableTextSelection: true
        }
    });
}});
