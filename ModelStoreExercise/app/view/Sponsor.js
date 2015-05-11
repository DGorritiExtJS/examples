Ext.define('MyApp.view.SponsorsGrid',
{
    title: '',
    extend: 'Ext.grid.Panel',
    itemId: 'sponsorsGrid',
    columnLines: 'checked',
    store: 'Sponsors',
    frameHeader: 'unchecked',
    columns: [
    {
        dataIndex: 'HONORIFIC',
        text: 'Title',
        flex: 1
    }]
});