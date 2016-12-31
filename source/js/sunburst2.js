window.onload=initialize;

// Dimensions of sunburst.
var width = 750;
var height = 600;
var radius = Math.min(width, height) / 2;

// Breadcrumb dimensions: width, height, spacing, width of tip/tail.
var b = {
    w: 175, h: 30, s: 3, t: 10
};

// Mapping of step names to colors.
var colors = {
    "Burgenland": "#468966",
    "Oberösterreich": "#FFF0A5",
    "Niederösterreich": "#FFB03B",
    "Kärnten": "#FF6138",
    "Wien": "#8E2800",
    "Steiermark": "#046380",
    "Salzburg": "#002F2F",
    "Vorarlberg": "#A7A37E",
    "Tirol": "#BEEB9F"
};

// Total size of all segments; we set this later, after loading the data.
var totalSize = 0;

var vis = d3.select("#chart").append("svg:svg")
    .attr("width", width)
    .attr("height", height)
    .append("svg:g")
    .attr("id", "container")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var partition = d3.layout.partition()
    .size([2 * Math.PI, radius * radius])
    .value(function(d) { return d.size; });

var arc = d3.svg.arc()
    .startAngle(function(d) { return d.x; })
    .endAngle(function(d) { return d.x + d.dx; })
    .innerRadius(function(d) { return Math.sqrt(d.y); })
    .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });

var Json;


// Main function to draw and set up the visualization, once we have the data.
function createVisualization(json) {

    d3.select('#showAll').property('checked',true);

    // Bounding circle underneath the sunburst, to make it easier to detect
    // when the mouse leaves the parent g.
    vis.append("svg:circle")
        .attr("r", radius)
        .style("opacity", 0);


    var path = vis.selectAll("path")
        .data(partition.nodes(json))
        .enter().append("svg:path")
        .attr("display", function(d) { return d.depth ? null : "none"; })
        .attr("d", arc)
        .attr("fill-rule", "evenodd")
        .style("fill", function(d) { return getColor(d);
        })
        .style("opacity", 1)
        .on("mouseover", mouseover);

    // Add the mouseleave handler to the bounding circle.
    d3.select("#container").on("mouseleave", mouseleave);
    d3.selectAll('.compare').each(function(){
        if(this.checked == true){
            compare(this,"init");
        }
    });


};

function drawAgain(json, option){
    d3.selectAll('path').remove();
    d3.select('#'+option).property('checked',true);

    var path = vis.selectAll("path")
        .data(partition.nodes(json));

        path.enter().append("svg:path")
            .attr("display", function(d) { return d.depth ? null : "none"; })
            .attr("d", arc)
            .attr("fill-rule", "evenodd")
            .style("fill", function(d) { return getColor(d);
            })
            .style("opacity", 1);

        path.on("mouseover", mouseover);

    d3.selectAll('.compare').each(function(){
        if(this.checked == true){
            compare(this,"init");
        }
    });

}


function getColor(d){
    var c = colors[d.name];
    var depth = d.depth;

    if(c == undefined){

        if(d.name != "Bundesland"){
            var l = d;
            while(c == undefined){
                c = findColor(l);
                l = l.parent;
            }
            var array_bright = [c];
            c = d3.hsl(array_bright[array_bright.length-1]).darker(depth*0.7)
        }


       // console.log(depth);
    }
    return c;
}



function findColor(d){
    return colors[d.parent.name];
}

// Fade all but the current sequence, and show it in the breadcrumb trail.
function mouseover(d) {
//console.log(d);
        //var percentage = (100 * d.value / totalSize).toPrecision(3);
        var percentageString = "";
        if (d.size != undefined) {
            percentageString = (d.size.toLocaleString());
        }
        /*  if (percentage < 0.1) {
         percentageString = "< 0.1%";
         }*/

        d3.select("#explanation")
            .style("visibility", "");

        d3.select("#percentage")
            .text(percentageString);

        d3.select("#text")
            .text(d.name);
    if (d3.select('#filtermode').property('checked') != true) {
        var sequenceArray = getAncestors(d);

        updateBreadcrumbs(sequenceArray, percentageString);

        // Fade all the segments.
        d3.selectAll("path")
            .style("opacity", 0.3);

        // Then highlight only those that are an ancestor of the current segment.
        vis.selectAll("path")
            .filter(function (node) {
                return (sequenceArray.indexOf(node) >= 0);
            })
            .style("opacity", 1);
    }
}

// Restore everything to full opacity when moving off the visualization.
function mouseleave(d) {
    if (d3.select('#filtermode').property('checked') != true) {
        // Hide the breadcrumb trail
        d3.select("#trail")
            .style("visibility", "hidden");

        // Deactivate all segments during transition.
        d3.selectAll("path").on("mouseover", null);

        // Transition each segment to full opacity and then reactivate it.
        d3.selectAll("path")
            .transition()
            .duration(1000)
            .style("opacity", 1)
            .each("end", function () {
                d3.select(this).on("mouseover", mouseover);
            });

        d3.select("#explanation")
            .style("visibility", "hidden");
    }
}

// Given a node in a partition layout, return an array of all of its ancestor
// nodes, highest first, but excluding the root.
function getAncestors(node) {
    var path = [];
    var current = node;
    while (current.parent) {
        path.unshift(current);
        current = current.parent;
    }
    return path;
}


function getChildren(node,path) {
    var current = node;
    path.push(current);
    if (current.children != undefined) {
        console.log(current.children);
            for(var i = 0; i < current.children.length; i++ ){
                var currentneu = current.children[i];
                path = getChildren(currentneu,path);
            }
    }
    return path;
}

function initializeBreadcrumbTrail() {
    // Add the svg area.
    var trail = d3.select("#leftsidebar").append("svg:svg")
        .attr("width", width)
        .attr("height", height)
        .attr("id", "trail");
    // Add the label at the end, for the percentage.
    trail.append("svg:text")
        .attr("id", "endlabel")
        .style("fill", "#fff");         // DIREKTE ZAHL NICHT SICHTBAR SONST FARBE #000
}

// Generate a string that describes the points of a breadcrumb polygon.
function breadcrumbPoints(d, i) {
    var points = [];
    points.push("0,0");
    points.push(b.w+150 + ",0");
    points.push(b.w+150 + b.t + "," + (b.h / 2));
    points.push(b.w+150 + "," + b.h);
    points.push("0," + b.h);
    //if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
    //    points.push(b.t + "," + (b.h / 2));
    //}
    return points.join(" ");
}


// Update the breadcrumb trail to show the current sequence and percentage.
function updateBreadcrumbs(nodeArray, percentageString) {

    // Data join; key function combines name and depth (= position in sequence).
    var g = d3.select("#trail")
        .selectAll("g")
        .data(nodeArray, function(d) { return d.name + d.depth; });

    // Add breadcrumb and label for entering nodes.
    var entering = g.enter().append("svg:g");

    entering.append("svg:polygon")
        .attr("points", breadcrumbPoints)
        .style("fill", function(d) {
            return getColor(d);
        });

    entering.append("svg:text")
        .attr("x", (b.w+150 + b.t) / 2)
        .attr("y", b.h / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text(function(d) { return d.name; });

    // Set position for entering and updating nodes.
    g.attr("transform", function(d, i) {
        //return "translate(" + i * (b.w + b.s) + ", 0)";
        return "translate(0, " + i * (b.h + b.s) + ")";
    });

    // Remove exiting nodes.
    g.exit().remove();

    // Now move and update the percentage at the end.
    d3.select("#trail").select("#endlabel")
        //.attr("x", (nodeArray.length + 0.5) * (b.w + b.s))
        //.attr("y", b.h / 2)
        .attr("x", b.w / 2)
        .attr("y", (nodeArray.length + 0.5) * (b.h + b.s))
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text(percentageString);

    // Make the breadcrumb trail visible, if it's hidden.
    d3.select("#trail")
        .style("visibility", "");

}

function drawLegend() {

    // Dimensions of legend item: width, height, spacing, radius of rounded rect.
    var li = {
        w: 175, h: 30, s: 3, r: 3
    };

    var legend = d3.select("#legend").append("svg:svg")
        .attr("width", li.w)
        .attr("height", d3.keys(colors).length * (li.h + li.s));

    var g = legend.selectAll("g")
        .data(d3.entries(colors))
        .enter().append("svg:g")
        .attr("transform", function(d, i) {
            return "translate(0," + i * (li.h + li.s) + ")";
        });

    g.append("svg:rect")
        .attr("rx", li.r)
        .attr("ry", li.r)
        .attr("width", li.w)
        .attr("height", li.h)
        .style("fill", function(d) { return d.value; })
        .on("mouseover", function(d) {
            highlightSection(d.key);
        }).on("mouseout", function(d) {
            vis.selectAll('path').style("opacity", 1);
        });

    g.append("svg:text")
        .attr("x", li.w / 2)
        .attr("y", li.h / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text(function(d) { return d.key; });
}

function toggleLegend() {
    var legend = d3.select("#legend");
    if (d3.select('#togglelegend').property('checked') == true) {
        legend.style("visibility", "");
    } else {
        legend.style("visibility", "hidden");
    }
}

function showHelp(){
    var help = d3.select('#help');
    var allNodes =  d3.selectAll("path");
    if (d3.select('#filtermode').property('checked') == true) {
       //help.style("visibility", "");
        enableMainRadios();
        allNodes.style("opacity", 0.3);
    } else {
        //help.style("visibility", "hidden");
        disableMainRadios();
        resetRadios();
        allNodes.style("opacity", 1);
    }
}

function highlightSection(string){
    var allNodes =  d3.selectAll("path");
    allNodes.style("opacity", 0.3);
    var node = [];
    node = partition.nodes(Json)
        .filter(function(d) {
                return (d.name == string);
        });

    var sequenceArray =[];
    sequenceArray = getChildren(node[0],sequenceArray);

    allNodes.filter(function (node) {
        return (sequenceArray.indexOf(node) >= 0);
    })
        .style("opacity", 1);
}

function disableMainRadios(){
    d3.select('#medien').property("disabled",true);
    d3.select('#benützung').property("disabled",true);
    d3.select('#neuzugänge').property("disabled",true);
}

function enableMainRadios(){
    d3.select('#medien').property("disabled",false);
    d3.select('#benützung').property("disabled",false);
    d3.select('#neuzugänge').property("disabled",false);
}

function resetRadios(){
    d3.selectAll('.compare').property('checked',false);
    d3.selectAll('.sublist').selectAll('.compare').property('disabled', true);
}


function resetSubRadios(){
    d3.selectAll('.sub').property('checked',false);
    d3.selectAll('.sub').property('disabled',true);
}

function enableSubRadios(value){
    var group = d3.select('#sublist'+value);
    group.selectAll('.compare').property('disabled', false);
}

function compare(element,init){
    var allNodes =  d3.selectAll("path");
    var id = "";
    var value = "";
    if(element != ""){
        id = element.id;
        value= element.value;
    }
    if (d3.select('#filtermode').property('checked') != true) {
        allNodes.style("opacity", 1);
    }else{
        allNodes.style("opacity", 0.3);
        var nodes = [];

        //find nodes with ticked value
        nodes = partition.nodes(Json)
            .filter(function(d) {
                if(d.parent != undefined && d.parent.parent != undefined){
                    return (d.name == value||d.parent.name == value|| d.parent.parent.name == value);
                }
            });

        if(value == "Medien" || value == "Benützung" || value == "Neuzugänge"){
            if(init != "init"){
                resetSubRadios();
            }
            enableSubRadios(value);
        }

        //find all parents to highlight them as well
        var sequenceArray =[];
        for(var i = 0; i < nodes.length; i++){
            var ancestors = getAncestors(nodes[i]);
            for(var j = 0; j<ancestors.length; j++){
                sequenceArray.push(ancestors[j]);
            }
        }
        //make it the array unqiue to avoid double highlighting
        sequenceArray = sequenceArray.filter(function(item, i, ar){ return ar.indexOf(item) === i; });

        //highlight selected nodes
        allNodes.filter(function (node) {
                return (sequenceArray.indexOf(node) >= 0);
            })
            .style("opacity", 1);

    }

}



function initialize(){
    // Use d3.text and d3.csv.parseRows so that we do not need to have a header
// row, and can receive the csv as an array of arrays.
    d3.json("data/scientific_and_special_libraries/data.json", function(error, root) {
        //console.log(root);
        Json = root;
        createVisualization(Json);
    });

    d3.selectAll('#showAll').on("click", function(){
        d3.json("data/scientific_and_special_libraries/data.json", function(error, root) {
            Json = root;
            drawAgain(Json,"showAll");

        });
    });
    d3.selectAll('#showBigger500k').on("click", function(){
        d3.json("data/scientific_and_special_libraries/data_bigger_500k.json", function(error, root) {
            Json = root;
            drawAgain(Json,"showBigger500k");
        });
    });
    d3.selectAll('#showBigger5m').on("click", function(){
        d3.json("data/scientific_and_special_libraries/data_bigger_5m.json", function(error, root) {
            Json = root;
            drawAgain(Json,"showBigger5m");
        });
    });
    d3.selectAll('#showLower500k').on("click", function(){
        d3.json("data/scientific_and_special_libraries/data_smaller_500k.json", function(error, root) {
            Json = root;
            drawAgain(Json,"showLower500k");

        });
    });
    d3.selectAll('#showLower100k').on("click", function(){
        d3.json("data/scientific_and_special_libraries/data_smaller_100k.json", function(error, root) {
            Json = root;
            drawAgain(Json,"showLower100k");

        });
    });
    d3.selectAll('#showLower10k').on("click", function(){
        d3.json("data/scientific_and_special_libraries/data_smaller_10k.json", function(error, root) {
            Json = root;
            drawAgain(Json,"showLower10k");

        });
    });
    d3.selectAll('#showLower1k').on("click", function(){
        d3.json("data/scientific_and_special_libraries/data_smaller_1k.json", function(error, root) {
            Json = root;
            drawAgain(Json,"showLower1k");

        });
    });

    // Basic setup of page elements.
    initializeBreadcrumbTrail();
    drawLegend();

    d3.select("#togglelegend").on("click", toggleLegend);
    d3.select('#filtermode').on("click", showHelp);
    d3.selectAll('.compare').on("click", function(e){
        compare(this,"");
        //console.log(this);
    });

    toggleLegend();
    showHelp();

}