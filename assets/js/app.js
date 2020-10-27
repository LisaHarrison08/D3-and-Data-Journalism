// Data Journalism and D3


var svgArea = d3.select("body").select("svg");

// Setup
var svgWidth = 980;
var svgHeight = 600;

// Set SVG Margins
var margin = {
  top: 20,
  right: 40,
  bottom: 90,
  left: 100
};

// Define Dimensions of the Chart Area
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG Wrapper
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG Group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "poverty";
var chosenYAxis = "healthcare";

// Function for Updating xScale Upon Click on Axis Label
function xScale(states, chosenXAxis) {

  // Create scale functions (chosenXAxis)
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(states, d => d[chosenXAxis]) * 0.8,
    d3.max(states, d => d[chosenXAxis]) * 1.2
    ])
    .range([0, width]);
  return xLinearScale;
}

// Function for Updating yScale Upon Click on Axis Label
function yScale(states, chosenYAxis) {

  // Create scale functions (chosenYAxis)
  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(states, d => d[chosenYAxis]) * 0.8,
    d3.max(states, d => d[chosenYAxis]) * 1.1
    ])
    .range([height, 0]);
  return yLinearScale;
}

// Initial Function for Updating Circles Group with New Tooltip
function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup, textGroup) {

  if (chosenXAxis === "poverty") {
    var xLabel = "Poverty (%)";
  }
  // else if (chosenXAxis === "age") {
  //   var xLabel = "Age (Median)";
  // }
  // else {
  //   var xLabel = "Household Income (Median)";
  // }
  if (chosenYAxis === "healthcare") {
    var yLabel = "Lacks Healthcare (%)";
  }
  // else if (chosenYAxis === "obesity") {
  //   var yLabel = "Obese (%)";
  // }
  // else {
  //   var yLabel = "Smokes (%)";
  // }

  // Initialize Tool Tip
  var toolTip = d3.tip()
    .attr("class", "tooltip d3-tip")
    .offset([90, 80])
    .html(function (d) {
      return (`<strong>${d.abbr}</strong><br>${xLabel} ${d[chosenXAxis]}<br>${yLabel} ${d[chosenYAxis]}`);
    });

  // Create Circles Tooltip in the Chart
  circlesGroup.call(toolTip);

  // Create Event Listeners to Display and Hide the Circles Tooltip
  circlesGroup.on("mouseover", function (data) {
    toolTip.show(data, this);
  })

    // Mouseout Event
    .on("mouseout", function (data) {
      toolTip.hide(data);
    });
}
// Read CSV
d3.csv("assets/data/data.csv").then(function (states) {

  // Parse Data and convert to numerical values
  states.forEach(function (data) {
    data.age = +data.age;
    data.healthcare = +data.healthcare;
    data.income = +data.income;
    data.obesity = +data.obesity;
    data.poverty = +data.poverty;
    data.smokes = +data.smokes;

    // console.log(states[30]['obesity']);
  });

  // Create xLinearScale & yLinearScale 
  var xLinearScale = xScale(states, chosenXAxis);
  var yLinearScale = yScale(states, chosenYAxis);

  // Create Axis Functions for the Chart
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Append xAxis to the Chart
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // Append yAxis to the Chart
  var yAxis = chartGroup.append("g")
    .classed("y-axis", true)
    .call(leftAxis);

  // Create Circles
  var circlesGroup = chartGroup.selectAll(".stateCircle")
    .data(states)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis]))
    .attr("r", 18)
    .attr("class", "stateCircle")
    .attr("opacity", ".65");

  // Append Text to Circles
  var textGroup = chartGroup.selectAll(".stateText")
    .data(states)
    .enter()
    .append("text")
    .attr("x", d => xLinearScale(d[chosenXAxis]))
    .attr("y", d => yLinearScale(d[chosenYAxis]* .98))
    .text(d => (d.abbr))
    .attr("class", "stateText");

  // xAxis Labels
  var xLabel = svg.append('g')
    .attr('class', 'x aText')
    .style("font-family", 'Kufam')
    .style("font-size", '16')
    .attr('transform', `translate(${width / 2},${height})`);

  xLabel
    .append('text')
    .text('Household Income (median)')
    .attr('dataValue', 'income')
    .attr('class', 'inactive')
    .attr('y', height * .15);

  xLabel
    .append('text')
    .text('Age (Median)')
    .attr('dataValue', 'age')
    .attr('class', 'inactive')
    .attr('y', height * .20);

  xLabel
    .append('text')
    .text('Poverty (%)')
    .attr('dataValue', 'poverty')
    .attr('class', 'active')
    .attr('y', height * .10);

  // yAxis Labels
  var yLabel = svg.append('g')
    .attr('class', 'x aText')
    .style("font-family", 'Kufam')
    .style("font-size", '16')
    .attr('transform', `translate(0,${height / 2})rotate(-90)`);

  yLabel
    .append('text')
    .text('Obese (%)')
    .attr('dataValue', 'obesity')
    .attr('class', 'inactive')
    .attr('y', height * .05);

  yLabel
    .append('text')
    .text('Smokes (%)')
    .attr('dataValue', 'smokes')
    .attr('class', 'inactive')
    .attr('y', height * .10);

  yLabel
    .append('text')
    .text('Lacks Healthcare (%)')
    .attr('dataValue', 'healthcare')
    .attr('class', 'active')
    .attr('y', height * .15);

  // updateToolTip Function
  var circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup, textGroup);
});