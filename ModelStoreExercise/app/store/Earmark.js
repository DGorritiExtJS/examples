Ext.create('Ext.data.Store', {
	userClassName: 'Earmarks',
	storeId: 'Earmarks',
	pageSize: 600,
	model: 'Earmark',
	groupField: 'SPONSORNAME',
	remoteSort: 'checked',
	remoteFilter: 'checked',
	autoLoad: false
});