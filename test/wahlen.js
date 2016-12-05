var color = {"gesamt":"#A9A9A9","oevp":"#191919","spoe":"#C83D44","fpoe":"#2657A8","gruene":"#009933","stronach":"#f8d323","frank":"#f8d323","bzoe":"#FFA500","sonstige":"#C0C0C0","fpk":"#4682B4","kpoe":"#900d11","piraten":"#48217d","vorwaerts":"#DAA520","buergerklub":"#A0522D","fritz":"#DCDCDC","lbl":"#a7a173","wahlbeteiligung":"#A9A9A9","pro berufsheer/sozialjahr":"#4B0082","pro wehrpflicht/zivildienst":"#2F4F4F","pro berufsheer und sozialjahr":"#4B0082","pro wehrpflicht und zivildienst":"#2F4F4F","lif":"#FFFF00","heinz fischer":"#d6604d","rudolf gehring":"#e7b500","barbara rosenkranz":"#2657A8","ungueltig":"#2F4F4F","martin":"#E0E0E0","neos":"#B82593"};

var gruppen = {"gender":["Maenner", "Frauen"],"age":["bis 29 Jahre","30 bis 59 Jahre","60 Jahre und aelter"],"erwerb":["Arbeiter","Angestellte","öffentlich Bedienstete","Selbständige","Pensionisten"],"bildung":["Pflichtschule","Lehre","BMS","Matura","Universitaet"],"erfahrung":["war beim Heer","war nicht beim Heer"],"age_gender":["Maenner bis 44 Jahre","Maenner ab 45 Jahren","Frauen bis 44 Jahre","Frauen ab 45 Jahren"],"age_gender3":["Maenner bis 29 Jahre","Maenner zwischen 30 und 59 Jahren","Maenner ab 60 Jahren","Frauen bis 29 Jahre","Frauen zwischen 30 und 59 Jahren","Frauen ab 60 Jahren"],"eu":["EU Befuerworter","EU Gegner"],"entwicklung":["Wien ist sehr lebenswert","Wien hat stark abgewirtschaftet"],"lq":["Lebensqualitaet Zuversicht","Lebensqualitaet Sorge","Lebensqualitaet Ärger"],"arbeit":["Arbeitsmarkt Zuversicht","Arbeitsmarkt Sorge","Arbeitsmarkt Ärger"],"fluechtlinge":["Flüchtlinge Zuversicht","Flüchtlinge Sorge","Flüchtlinge Ärger"],"zusammenleben":["Zusammenleben Zuversicht","Zusammenleben Sorge","Zusammenleben Ärger"],"mighint":["Migrationshintergrund","kein Migrationshintergrund"],"gemeindebau":["wohnt im Gemeindebau","wohnt nicht im Gemeindebau"]};

var gruppentitel = {"gender":["Maenner", "Frauen"],"age":["Personen unter 30 Jahren","Personen zwischen 30 und 59 Jahren","Personen ab 60 Jahren"],"erwerb":["Arbeiter","Angestellten","öffentlich Bediensteten","Selbständigen","Pensionisten"],"bildung":["Personen mit Pflichtschul-Abschluss","Personen mit Lehr-Abschluss","Personen mit dem Abschluss einer berufsbildenden mittleren Schule","Personen mit Matura","Personen mit einem Universitaetsabschluss"],"erfahrung":["Personen, die beim Bundesheer waren,","Personen, die nicht beim Bundesheer waren,"],"age_gender":["Maenner bis 44 Jahren","Maenner ab 45 Jahren","Frauen bis 44 Jahren","Frauen ab 45 Jahren"],"eu":["Personen, die die Mitgliedschaft in der EU positiv beurteilen,","Personen, die die Mitgliedschaft in der EU negativ beurteilen,"],
"entwicklung":["Personen, die Wien als sehr lebenswert bezeichnen,",
"Personen, die meinen, dass Wien stark abgewirtschaftet hat,"]
,"age_gender3":["Maenner unter 30 Jahren","Maenner zwischen 30 und 59 Jahren","Männer ab 60 Jahren","Frauen unter 30 Jahren","Frauen zwischen 30 und 59 Jahren","Frauen ab 60 Jahren"]
,"lq":[
"Personen, die Zuversicht in die Politik setzen, die Lebensqualität zu gewährleisten",
"Personen, die sich Sorgen machen, ob die Politik die Lebensqualität gewährleisten kann,",
"Personen, die sich beim Thema Erhalt der Lebensqualität über die Politik ärgern,"],
"arbeit":[
"Personen, die Zuversicht in die Politik setzen, die Herausforderungen am Arbeitsmarkt zu bewältigen,",
"Personen, die sich Sorgen machen, ob die Politik die Herausforderungen am Arbeitsmarkt bewältigen kann,",
"Personen, die sich beim Thema Arbeitsmarkt über die Politik ärgern,"],
"fluechtlinge":[
"Personen, die Zuversicht in die Politik setzen, die Herausforderungen bei der Aufnahme und Integration von Flüchtlingen zu bewältigen,",
"Personen, die sich Sorgen machen, ob die Politik die Herausforderungen bei der Aufnahme und Integration von Flüchtlingen bewältigen kann,",
"Personen, die sich beim Thema Aufnahme und Integration von Flüchtlingen über die Politik ärgern,"],
"zusammenleben":[
"Personen, die Zuversicht in die Politik setzen, das Zusammenleben aller WienerInnen gut zu gestalten,",
"Personen, die sich Sorgen machen, ob die Politik das Zusammenleben aller WienerInnen gut gestalten kann,",
"Personen, die sich beim Thema Zusammenleben in Wien über die Politik ärgern,"],
"mighint":[
"Personen mit Migrationshintergrund",
"Personen ohne Migrationshintergrund"],
"gemeindebau":[
"Personen, die in einem Gemeindebau wohnen,",
"Personen, die nicht in einem Gemeindebau wohnen,"]
};

function aut(d)
{
if (d.indexOf("Michael")>=0)
{
d=d;
}
else
{
d = d.replace(/ae/g,"%E4");
}
d = d.replace("oe","%F6");
if (d.indexOf("aue")>=0 || d.indexOf("eue")>=0 || d.indexOf("Aue")>=0)
{
d=d;
}
else
{
d =d.replace("ue","%FC");
}
d = d.replace("AE","%C4");
d = d.replace("OE","%D6");
d = d.replace("UE","%DC");

if (d.indexOf("gross")>=0||d.indexOf("Gross")>=0||d.indexOf("auss")>=0||d.indexOf("Auss")>=0||d.indexOf("nuss")>=0||d.indexOf("Nuss")>=0||d.indexOf("weiss")>=0||d.indexOf("Weiss")>=0)
{
d = d.replace("ss","%DF");
}
return unescape(d);
}

function aut_upper(d)
{
if (d!="Frauen")
{
d = d.replace("oe","%D6");
d = d.replace("ue","%DC");
d = d.replace("ae","%C4");
d = d=="wahlbeteiligung"||d=="abgegeben"||d=="wahlberechtigte" ? d.charAt(0).toUpperCase()+d.slice(1) : d.toUpperCase();
return unescape(d);
}
else
{
return d.toUpperCase();
}
}

function point(value)
{
value=value.toString();
return value>999 ? value=[value.slice(0,1),".",value.slice(1),".000"].join('') : value=value+".000";
}

function exp(item)
{
$(item).toggle();
}

function tabparse(tabledata,i,vw)
{
return !tabledata[i].indexOf("Ergebnis") || !tabledata[i].indexOf("Mandate") || !tabledata[i].indexOf("Regierungssitze") || !tabledata[i].indexOf("zu "+vw) ? true : false;
}

function tabselect(tabledata,i,wert)
{
if (wert=="age")
{
return !tabledata[i].indexOf("bis 29 Jahre") || !tabledata[i].indexOf("30 bis 59 Jahre") || !tabledata[i].indexOf("60 Jahre und aelter") ? true : false;
}
else if (wert=="erwerb")
{
return !tabledata[i].indexOf("Arbeiter") || !tabledata[i].indexOf("Angestellte") || !tabledata[i].indexOf("öffentlich Bedienstete") || !tabledata[i].indexOf("Selbständige") || !tabledata[i].indexOf("Pensionisten") ? true : false;
}
else if (wert=="bildung")
{
return !tabledata[i].indexOf("Pflichtschule") || !tabledata[i].indexOf("Lehre") || !tabledata[i].indexOf("BMS") || !tabledata[i].indexOf("Matura") || !tabledata[i].indexOf("Universitaet") ? true : false;
}
else if (wert=="age_gender")
{
return !tabledata[i].indexOf("Maenner bis 44 Jahre") || !tabledata[i].indexOf("Maenner ab 45 Jahren") || !tabledata[i].indexOf("Frauen bis 44 Jahre") || !tabledata[i].indexOf("Frauen ab 45 Jahren") ? true : false;
}
else if (wert=="erfahrung")
{
return !tabledata[i].indexOf("war beim Heer") || !tabledata[i].indexOf("war nicht beim Heer") || !tabledata[i].indexOf("Frauen unter 44") || !tabledata[i].indexOf("Frauen ueber 45") ? true : false;
}
else if (wert=="zeitpunkt")
{
return !tabledata[i].indexOf("schon laenger her") || !tabledata[i].indexOf("vor zwei bis drei Wochen") || !tabledata[i].indexOf("in den letzten Tagen") ? true : false;
}
else if (wert=="eu")
{
return !tabledata[i].indexOf("EU Befuerworter") || !tabledata[i].indexOf("EU Gegner") ? true : false;
}
else if (wert=="entwicklung")
{
return !tabledata[i].indexOf("Wien ist sehr lebenswert") || !tabledata[i].indexOf("Wien hat stark abgewirtschaftet") ? true : false;
}
else if (wert=="lq")
{
return !tabledata[i].indexOf("Lebensqualitaet Zuversicht") || !tabledata[i].indexOf("Lebensqualitaet Sorge")  || !tabledata[i].indexOf("Lebensqualitaet Ärger") ? true : false;
}
else if (wert=="arbeit")
{
return !tabledata[i].indexOf("Arbeitsmarkt Zuversicht") || !tabledata[i].indexOf("Arbeitsmarkt Sorge")  || !tabledata[i].indexOf("Arbeitsmarkt Ärger") ? true : false;
}
else if (wert=="fluechtlinge")
{
return !tabledata[i].indexOf("Flüchtlinge Zuversicht") || !tabledata[i].indexOf("Flüchtlinge Sorge")  || !tabledata[i].indexOf("Flüchtlinge Ärger") ? true : false;
}
else if (wert=="zusammenleben")
{
return !tabledata[i].indexOf("Zusammenleben Zuversicht") || !tabledata[i].indexOf("Zusammenleben Sorge")  || !tabledata[i].indexOf("Zusammenleben Ärger") ? true : false;
}
else if (wert=="mighint")
{
return !tabledata[i].indexOf("Migrationshintergrund") || !tabledata[i].indexOf("kein Migrationshintergrund") ? true : false;
}
else if (wert=="gemeindebau")
{
return !tabledata[i].indexOf("wohnt im Gemeindebau") || !tabledata[i].indexOf("wohnt nicht im Gemeindebau") ? true : false;
}
else if (wert=="age_gender3")
{
return !tabledata[i].indexOf("Maenner bis 29 Jahre") || !tabledata[i].indexOf("Maenner zwischen 30 und 59 Jahren") || !tabledata[i].indexOf("Maenner ab 60 Jahren") || !tabledata[i].indexOf("Frauen bis 29 Jahre") || !tabledata[i].indexOf("Frauen zwischen 30 und 59 Jahren") || !tabledata[i].indexOf("Frauen ab 60 Jahren") ? true : false;
}
else
{
return !tabledata[i].indexOf("Maenner") || !tabledata[i].indexOf("Frauen") ? true : false;
}
}

function nullwerte(datastore)
{
for (i=0;i<datastore.length;i++)
{
if (datastore[i].Maenner == "")
{
datastore.splice(i,1);
i=i-1;
}
}
return datastore;
}

function tablenull(tabledata)
{
var last = tabledata[0].length-1;
for (i=0;i<tabledata.length;i++)
{
if (tabledata[i][last] == "")
{
tabledata.splice(i,1);
i=i-1;
}
}
return tabledata;
}

function legpos(selection)
{
var distx = 0;
for (i=0;i<gruppen[selection].length;i++)
{
if (gruppen[selection][i].length>distx)
{
distx = gruppen[selection][i].length;
}
}
return Math.round(distx*6.5);
}


function parsehigh(results,k,h)
{
var reg=[];
var gueltig=[];
high[k]=new Array();
datastore=d3.csv.parseRows(results);
header=datastore.shift();
if (k==0||h==1)
{
for (i=4;i<header.length;i++)
{
party.push(header[i]);
}
}
for (i=0;i<datastore.length;i++)
{
reg.push(datastore[i][0]);
gueltig.push(datastore[i][3]);
max=0;
for (j=4;j<datastore[0].length;j++)
{
if (max<+datastore[i][j]){max=datastore[i][j]};
}
high[k][i]=new Array();
high[k][i].push(reg[i],party[(datastore[i].indexOf(max))-4]);
for (j=0;j<party.length;j++)
{
high[k][i].push(((datastore[i][j+4]/gueltig[i])*100).toFixed(2));
}
}
return high,party;
}

function combine(temp,k,y)
{
for (i=0;i<temp.features.length;i++)
{
for (j=0;j<high[k].length;j++)
{
if (k==2&&y!=2013)
{
if (temp.features[i].properties.iso_alt!=null)
{
if (high[k][j][0] == temp.features[i].properties.iso_alt)
{
temp.features[i].properties.color=high[k][j][1];
high[k][j].shift();
high[k][j].shift();
temp.features[i].properties.ergebnisse=high[k][j];
}
}
else
{
if (high[k][j][0] == temp.features[i].properties.iso)
{
temp.features[i].properties.color=high[k][j][1];
high[k][j].shift();
high[k][j].shift();
temp.features[i].properties.ergebnisse=high[k][j];
}
}
}
else
{
if (high[k][j][0] == temp.features[i].properties.iso)
{
temp.features[i].properties.color=high[k][j][1];
high[k][j].shift();
high[k][j].shift();
temp.features[i].properties.ergebnisse=high[k][j];
}
}
}
}
return temp;
}