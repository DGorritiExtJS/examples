Ext.define('Earmark', {
	userClassName: 'Earmark',
	extend: 'Ext.data.Model',
	idProperty: 'EARMARK_ID',
	fields: [
	{name: 'EARMARK_ID'},
	{name: 'EARMARK_DESCRIPTION'},
	{name: 'ENACTED_YEAR'},
	{name: 'AGENCY_TITLE'},
	{name: 'BUREAU_TITLE'},
	{name: 'AMT_CONF'},
	{name: 'SPONSOR'},
	{name: 'SPENDINGCOMMITTEE'},
	{
		name: 'SPONSORNAME',
		convert: function(v,rec){
			return Ext.String.format("{0}, {1}", 
				rec.get('SPONSOR').LASTNAME,
				rec.get('SPONSOR').FIRSTNAME);
		}
	}
	],
	proxy: {
		type: 'jsonp',
		url: 'http://webapps.figleaf.com/arch101/dataservices/desktop/earmark.cfc?method=wsBigJSONP',
		reader: {
			root: 'ROWS',
			successProperty: 'SUCCESS',
			totalProperty: 'RESULTS'
		}
	}

});