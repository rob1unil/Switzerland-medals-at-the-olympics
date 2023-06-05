// Data
var data = [
    { sport: "gymnastique", count: 49 },
    { sport: "tir", count: 23 },
    { sport: "voile", count: 4 },
    { sport: "lutte", count: 14 },
    { sport: "aviron", count: 24 },
    { sport: "halterophilie", count: 4 },
    { sport: "football", count: 1 },
    { sport: "handball", count: 1 },
    { sport: "escrime", count: 8 },
    { sport: "judo", count: 4 },
    { sport: "canoe-kayak", count: 1 },
    { sport: "triathlon", count: 5 },
    { sport: "beach-volley", count: 2 },
    { sport: "natation", count: 3 },
    { sport: "athletisme", count: 8 },
    { sport: "cyclisme", count: 25 },
    { sport: "equitation", count: 23 },
    { sport: "tennis", count: 6 },
  ];
  
// Dimensions and radius
var width = 400;
var height = 400;
var radius = Math.min(width, height) / 2;

// Color scale
var color = d3.scaleOrdinal(d3.schemeCategory10);

// SVG element
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  
// Generate pie
var pie = d3.pie().value(function (d) {
  return d.count;
});
  
// Generate arc
var arc = d3
  .arc()
  .innerRadius(0)
  .outerRadius(radius);
  
// Generate arcs
var arcs = svg.selectAll("arc")
  .data(pie(data))
  .enter()
  .append("g")
  .attr("class", "arc");
  
// Draw arc paths
arcs
  .append("path")
  .attr("d", arc)
  .attr("fill", function (d, i) {
    return color(i);
   });

// Add labels
arcs
  .append("text")
  .attr("transform", function (d) {
    var centroid = arc.centroid(d);
    var x = centroid[0];
    var y = centroid[1];
    var angle = (d.startAngle + d.endAngle) / 2; // Compute the middle angle
    var rotate = (angle * 180) / Math.PI - 90; // Convert to degrees and subtract 90 degrees
    if (rotate > 90 && rotate < 270) {
      rotate += 180; // Rotate the labels on the left side by an additional 180 degrees
    }
    return "translate(" + x + "," + y + ") rotate(" + rotate + ")";
  })
  .attr("dy", "0.35em")
  .style("text-anchor", "middle")
  .text(function (d) {
    return d.data.sport;
  })
  .style("visibility", "hidden");

// Show labels and counts on mouseover
arcs.on("mouseover", function (d) {
  d3.select(this).select("text").style("visibility", "visible");
  d3.select(this)
    .select("text")
    .text(function (d) {
      return d.data.sport + " (" + d.data.count + ")";
    });
});

// Hide labels on mouseout
arcs.on("mouseout", function (d) {
d3.select(this).select("text").style("visibility", "hidden");
});


