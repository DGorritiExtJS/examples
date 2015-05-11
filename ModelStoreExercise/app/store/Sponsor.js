Ext.define('MyApp.store.Store', 
{
	extend: 'Ext.data.Store',
	userClassName: 'Sponsors',
	autoLoad: 'checked',
	storeId: 'Sponsors',
	pageSize: 600,
	model: 'MyApp.model.Sponsor',
	remoteFilter: true,
	autoLoad: false
});