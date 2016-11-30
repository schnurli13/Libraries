var tabulate = function (data,columns) {
    var table = d3.select('body').append('table')
    var thead = table.append('thead')
    var tbody = table.append('tbody')

    thead.append('tr')
        .selectAll('th')
        .data(columns)
        .enter()
        .append('th')
        .text(function (d) { return d })

    var rows = tbody.selectAll('tr')
        .data(data)
        .enter()
        .append('tr')

    var cells = rows.selectAll('td')
        .data(function(row) {
            return columns.map(function (column) {
                return { column: column, value: row[column] }
            })
        })
        .enter()
        .append('td')
        .text(function (d) { return d.value })

    return table;
}

d3.csv('data/scientific_and_special_libraries/medienbestand_der_wissenschaftlichen_bibliotheken_und_spezialbibliotheken_.csv',function (data) {
    //var columns = ['Bibliothek','ID']

    var columns = ["ID","Bundesland","Bücher, Zeitungen und Zeitschriften sowie fortlaufende Sammelwerke","Karten und Pläne","Gedruckte Musikalien","Einblattmaterialien","Sonstige Druckwerke","Analoge audiovisuelle Materialien","Mikromaterialien","Weitere nicht-elektronische Materialien","Manuskripte:Handschriften und Autographen","Digitale Bestände: Einzeldokumente sowie Datenbanken"]
    tabulate(data,columns)
})