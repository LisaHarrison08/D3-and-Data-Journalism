// Data Journalism and D3

// SVG wrapper dimensions are determined by the current width
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
