// set the dimensions and margins of the graph
const width = 500
const height = 500

// append the svg object to the body of the page
const svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(40,0)");  // bit of margin on the left = 40

// read json data
d3.json("./forum.json").then( function(data) {

  // Create the cluster layout:
  const cluster = d3.cluster()
    .size([height, width - 100]);  // 100 is the margin I will have on the right side

  // Give the data to this cluster layout:
  const root = d3.hierarchy(data, function(d) {
      return d.children;
  });
  cluster(root);

  // Add the links between nodes:
  svg.selectAll('path')
    .data( root.descendants().slice(1) )
    .join('path')
    .attr("d", function(d) {
        return "M" + d.y + "," + d.x
                + "C" + (d.parent.y + 15) + "," + d.x
                + " " + (d.parent.y + 20) + "," + d.parent.x // 50 and 150 are coordinates of inflexion, play with it to change links shape
                + " " + d.parent.y + "," + d.parent.x;
              })
    .style("fill", 'none')
    .attr("stroke", '#ccc')

  // create a tooltip
  var tooltip = d3.select("#my_dataviz")
    .append("div")
    .style("visibility", "hidden")
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px");

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    tooltip
      .style("visibility", "visible");
    d3.select(this)
      .style("stroke", "gray")
      .style("opacity", 1);
  };
  var mousemove = function(event, d) {
    console.log(d.data.type + ": " + d.data.content);
    tooltip
      .html(d.data.type + ": " + d.data.content)
      .style("left", (d3.pointer(event, this)[0]+30) + "px")
      .style("top", (d3.pointer(event, this)[1]+30) + "px");

  };
  var mouseleave = function(d) {
    tooltip
      .style("visibility", "hidden");
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.8);
  };

  // Add a circle for each node.
  svg.selectAll("g")
      .data(root.descendants())
      .join("g")
      .attr("transform", function(d) {
          return `translate(${d.y},${d.x})`
      })
      .append("circle")
        .attr("r", 7)
        .style("fill", function(d) {
          switch (d.data.type) {
            case "question":
              return "#ffb938"
            case "answer":
              return "#0eb57e"
            default:
              return "#d9005d"
          }
        })
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)

  svg.selectAll("g")
      .data(root.descendants())
      .join("g")
      .append("text")
        .attr("dx", "-2em")
        .attr("dy", "-.8em")
        .text(function(d) { return d.data.name });

})