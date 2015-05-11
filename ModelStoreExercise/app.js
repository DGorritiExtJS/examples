
Ext.application({
    name: 'MyApp',
    requires : ['Ext.container.Viewport', 'MyApp.view.SponsorGrid'],
    //name : 'School',
    //stores: ['MyApp.store.Earmark','MyApp.store.Sponsor'],
    //models: ['MyApp.model.Earmark','MyApp.model.Sponsor'],

    model:'MyApp.model.Sponsor',
    store:'MyApp.store.Sponsor',
    
    launch : function(){

        Ext.create('Ext.container.Viewport', 
        {
            layout : 'fit',
            items : [{
                xtype : 'container',
                items : [{
                    xtype : 'sponsorGrid',
                    height:200
                }]
            }]
        });

    }
});