Ext.define('MyApp.model.Sponsor', {
	userClassName: 'Sponsor',
	extend: 'Ext.data.Model',
	idProperty: 'IDSPONSOR',
	fields: [
	{name: 'IDSPONSOR'},
	{name: 'HONORIFIC'},
	{name: 'FIRSTNAME'},
	{name: 'LASTNAME'},
	{name: 'PARTY'},
	{name: 'STATE'}
	],
	proxy: {
		type: 'jsonp',
		url: 'http://webapps.figleaf.com/arch101/dataservices/desktop/sponsor.cfc?method=wsBigJSONP',
		reader: {
			root: 'ROWS',
			successProperty: 'SUCCESS',
			totalProperty: 'RESULTS'
		}
	}

});