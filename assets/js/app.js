// Data Journalism and D3

// SVG dimensions 
var width = parseFloat(d3.select('#scatter').style('width'));
var height = width*.66;

var svg = d3.select('#scatter').append('svg');

// Create an SVG coordinate Space
svg
  .attr('class', 'chart')
  .style('border','2px solid black')
  .style('width',width)
  .style('height',height)

// xAxis Labels
var xText = svg.append('g')
                .attr('class','x aText')
                .attr('transform',`translate(${width/2},${height})`);

xText
  .append('text')
  .text('Household Income (median)')
  .attr('dataValue','income')
  .attr('class','inactive')
  .attr('y',- height*.05);
  
  xText
  .append('text')
  .text('Age (Median)')
  .attr('dataValue','age')
  .attr('class','inactive')
  .attr('y',- height*.10);
  
  xText
  .append('text')
  .text('Poverty (%)')
  .attr('dataValue','poverty')
  .attr('class','active')
  .attr('y',- height*.15);

  // yAxis Labels
  var yText = svg.append('g')
                .attr('class','x aText')
                .attr('transform',`translate(0,${height/2})rotate(-90)`);

yText
  .append('text')
  .text('Obese (%)')
  .attr('dataValue','obesity')
  .attr('class','active')
  .attr('y',height*.05);
  
  yText
  .append('text')
  .text('Smokes (%)')
  .attr('dataValue','smokes')
  .attr('class','inactive')
  .attr('y',height*.10);
  
  yText
  .append('text')
  .text('Lacks Healthcare (%)')
  .attr('dataValue','healthcare')
  .attr('class','inactive')
  .attr('y',height*.15);

  // Read CSV
  d3.csv("assets/data/data.csv").then(function (states) {

    // Parse Data and convert to numerical values
    states.forEach(function(data) {
      data.age = +data.age;
      data.healthcare = +data.healthcare;
      data.income = +data.income;
      data.obesity = +data.obesity;
      data.poverty = +data.poverty;
      data.smokes = +data.smokes;
   
    console.log(states[30]['obesity']);

  })
  });

  