var chart;
var height = 200;
var width = 300;
//DEFINE YOUR VARIABLES UP HERE
var svg,margin,xScale,yScale,xAxis,yAxis;
 var region_profit=[];
  var nested_data=[];
//Gets called when the page is loaded.
function init(){
  chart = d3.select('#vis').append('svg');
  vis = chart.append('g');
  //PUT YOUR INIT CODE BELOW
   margin = {top: 20, right: 10, bottom: 100, left:50},
    width = 700 - margin.right - margin.left,
    height = 500 - margin.top - margin.bottom;
	
 svg = d3.select("body")
  .append("svg")
    .attr("width", 960)
    .attr("height", 500)
  .append("g")
    .attr("transform", "translate(20,20)");
 
 xScale = d3.scaleOrdinal()
    .range([0,width], 0.2, 0.2);

 yScale = d3.scaleLinear()
    .range([height, 0]);

// define x axis and y axis
 xAxis = d3.axisBottom()
    .scale(xScale);

 yAxis = d3.axisTop()
    .scale(yScale);
}

//Called when the update button is clicked
function updateClicked(){
  d3.csv('data/CoffeeData.csv',update);
  
}

//Callback for when data is loaded
function update(rawdata){
  //PUT YOUR UPDATE CODE BELOW
  rawdata.forEach(function(d) {
    d.region = d.region;
    d.profit = +d["profit"];
	region_profit.push({
    region:   d["region"],
    profit: +d["profit"]
});
});

 nested_data = d3.nest()
  .key(function(d) { return d.region;})
  .rollup(function(d) { 
   return d3.sum(d, function(g) {return g.profit; });
  }).entries(region_profit);
 //var dataArray = [23, 13, 21, 14, 37, 15, 18, 34, 30];

var svg = d3.select("body").append("svg")
          .attr("height","100%")
          .attr("width","100%");

svg.selectAll("rect")
    .data(nested_data)
    .enter().append("rect")
          .attr("height", function(d, i) {return (d.value /1000)})
          .attr("width","40")
          .attr("x", function(d, i) {return (i * 60) + 25})
          .attr("y", function(d, i) {return 400 - (d.value/1000)});


	  
/*		  
	
 
  
 
// console.log(region_profit);
// console.log(nested_data);
 
 rawdata.forEach(function(d) {
    d.region = d.region;
    d.profit = +d.profit;       // try removing the + and see what the console prints
    console.log(d.profit);   // use console.log to confirm
  });

  // sort the gdp values
  rawdata.sort(function(a,b) {
    return b.profit - a.profit;
  });
console.log(rawdata);
  // Specify the domains of the x and y scales
  xScale.domain(rawdata.map(function(d) { return d.region; }) );
  yScale.domain([0, d3.max(rawdata, function(d) { return d.profit; } ) ]);

  svg.selectAll('rect')
    .data(rawdata)
    .enter()
    .append('rect')
    .attr("height", 0)
    .attr("y", height)
    .transition().duration(3000)
    .delay( function(d,i) { return i * 200; })
    // attributes can be also combined under one .attr
    .attr({
     "x": function(d) { return xScale(d.region); },
     "y": function(d) { return yScale(d.profit); },
      "width": xScale.range(),
      "height": function(d) { return  height - yScale(d.profit); }
    });
	
	*/
}

// Returns the selected option in the X-axis dropdown. Use d[getXSelectedOption()] to retrieve value instead of d.getXSelectedOption()
function getXSelectedOption(){
  var node = d3.select('#xdropdown').node();
  var i = node.selectedIndex;
  return node[i].value;
}

// Returns the selected option in the X-axis dropdown. 
function getYSelectedOption(){
  var node = d3.select('#ydropdown').node();
  var i = node.selectedIndex;
  return node[i].value;
}