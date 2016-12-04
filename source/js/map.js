var width = 960,
    height = 1160;

var projection = d3.geo.albers()
    .center([0, 45.5])
    .rotate([-13.8, 0])
    .parallels([40, 50])
    .scale(9000)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection)
    .pointRadius(2);

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

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

   /* svg.append("path")
        .datum(topojson.feature(aut, aut.objects.gemeinden))
        .attr("d", path)
        .attr("class", "place");

    svg.selectAll(".place-label")
        .data(topojson.feature(aut, aut.objects.gemeinden).features)
        .enter().append("text")
        .attr("class", "place-label")
        .attr("transform", function(d) { return "translate(" + projection(d.geometry.coordinates) + ")"; })
        .attr("dy", ".35em")
        .text(function(d) { return d.properties.name; });

    svg.selectAll(".place-label")
        .attr("x", function(d) { return d.geometry.coordinates[0] > 16.3 ? 6 : -6; })
        .style("text-anchor", function(d) { return d.geometry.coordinates[0] > 16.3 ? "start" : "end"; });

    svg.selectAll(".subunit-label")
        .data(topojson.feature(aut, aut.objects.subunits).features)
        .enter().append("text")
        .attr("class", function(d) { return "subunit-label " + d.id; })
        .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .text(function(d) { return d.properties.name; });*/

});
