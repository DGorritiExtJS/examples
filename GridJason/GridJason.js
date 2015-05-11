
Ext.application({
    name: 'UsersJson',
    /*requires : ['Ext.container.Viewport', 'MyApp.view.SponsorGrid'],*/
    //name : 'School',
    //stores: ['MyApp.store.Earmark','MyApp.store.Sponsor'],
    //models: ['MyApp.model.Earmark','MyApp.model.Sponsor'],

    /*model:'MyApp.model.Sponsor',
    store:'MyApp.store.Sponsor',*/
    
    launch : function(){

        Ext.Loader.setConfig({enabled:true});

        defineUserModel();
        defineUsersStore();
        defineUsersGrid();
        Ext.create('UsersGrid');

    }
});

function defineUserModel(){

    Ext.define('User', {
        extend: 'Ext.data.Model',
        fields: [
        {name: 'name'},
        {name: 'age'},
        {name: 'email'}
        ],
        proxy: {
            //url: 'file:///C:/Users/david.gorriti/Documents/Documentation/ExtJS/Examples/examples/GridJason/Users.json',
            type:'ajax',
            url:'Users.json',
            reader:{
                //root:'data',
                type:'json'
                //successProperty: 'success',
                //totalProperty: 'total'
            }

        }
    });
};

function defineUsersStore(){
    Ext.define('UsersStore',{
        extend: 'Ext.data.Store',
        model: 'User',
        autoLoad: false,
        autoSync: false
    });
};

function defineUsersGrid(){

    Ext.define('UsersGrid',
    {

        extend: 'Ext.grid.Panel',
        alias: 'widget.UsersGrid',
        id: 'usersGrid',
        //width: '100%',
        //height: 300,
        //selType: 'rowmodel',
        /*selModel:
        {
            mode: 'SINGLE'
        },*/
        /*viewConfig:
        {
            stripeRows: true
        },*/
        initComponent: function () {

            var activityStore = Ext.create('UsersStore');
            activityStore.load();

            Ext.apply(this, {
                items:[{

                    store: UsersStore,
                    xtype: 'grid',
                    columns: [{
                        text: "name",
                        dataIndex: 'name',
                        flex: 1,
                        width: 35
                    }]

                }]
            });

            this.callParent(arguments);

        }

    });

};