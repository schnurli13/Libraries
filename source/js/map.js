var width = 960,
    height = 1160;
    //scale0 = width/Math.PI ;

var projection = d3.geo.albers()
    .center([0, 45.5])
    .rotate([-13.8, 0])
    .parallels([40, 50])
    .scale(9000)
    .translate([width / 2, height / 2]);

/*var zoom = d3.behavior.zoom()
    .translate([width / 2, height / 2])
    .scale(scale0)
    .scaleExtent([scale0, 8 * scale0])
    .on("zoom", zoomed);
 */

var path = d3.geo.path()
    .projection(projection)
    .pointRadius(2);

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);
    //.append("g");

var g = svg.append("g");


/*svg.call(zoom)
   .call(zoom.event);*/

d3.json("data/scientific_and_special_libraries/aut.json", function(error, aut) {
    console.log(aut);
    svg.selectAll(".gemeinden")
        .data(topojson.feature(aut, aut.objects.gemeinden).features)
        .enter().append("path")
        .attr("class", function(d) {
            return "gemeinde " + d.properties.iso;
        })
        .attr("d", path)
        .on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", 0.9);
            div	.html(d.properties.name)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY-25) + "px");
        })
        .on("mouseout", function(d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });

    /*for(var i = 1; i<10; i++){
        svg.append("path")
            .datum(topojson.merge(aut, aut.objects.gemeinden.geometries.filter(function(d) { return d.properties.iso.toString()[0] == i  })))
            .attr("class", "bundesland")
            .attr("d", path)
            .on("mouseover", function(d) {
             d3.select(this).attr({
                  fill: "grey"
              });

            })
            .on("mouseout", function(d) {

            });
    }*/


});

var zoom = d3.behavior.zoom()
    .on("zoom",function() {
        g.attr("transform","translate("+
            d3.event.translate.join(",")+")scale("+d3.event.scale+")");
        g.selectAll("path")
            .attr("d", path.projection(projection));
    });

svg.call(zoom);
/*function zoomed() {
    projection
        .translate(zoom.translate())
        .scale(zoom.scale());

    g.selectAll("path")
        .attr("d", path);
}*/

