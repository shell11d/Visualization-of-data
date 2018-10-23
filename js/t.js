var chart;
var height = 200;
var width = 300;
var Xlabel, Ylabel; //labels
var x_axis, y_axis; 
//DEFINE YOUR VARIABLES UP HERE
var vis;
//Gets called when the page is loaded.
var dat;
var color;
function init(){

    chart = d3.select('#vis').append('svg');

    //PUT YOUR INIT CODE BELOW
    //Getting labels
    vis = chart.append('g'); // gets all the objects together in a container
    chart.attr("width",width)
        .attr("height",height);
    margin = {top: 15, right: 55, bottom: 30, left: 15}; // definite location of the bar graph as in the video
    width = width - margin.left - margin.right;
    height = height - margin.top - margin.bottom;

}
function update(rawdata){   // return all the columns in the csv file
    //PUT YOUR UPDATE CODE BELOW
    return{
        date: rawdata.date,
        sales: +rawdata.sales,
        profit: +rawdata.profit,
        region: rawdata.region,
        category: rawdata.category,
        type: rawdata.type,
        caffeination: rawdata.caffeination
    };

}
//Called when the update button is clicked
function updateClicked() {
    Xlabel = getXSelectedOption();
    Ylabel = getYSelectedOption();
    chart.selectAll('*').remove(); // so that the previous chart is removed after every update press otherwise we will have multiple bar graphs

    d3.csv('data/CoffeeData.csv', update, function (datavalue) {
        dat = d3.nest()
            .key(function (d) {return d[Xlabel]; // format taken from d3 API
            })
            .rollup(function (d) {return d3.sum(d, function (g) {return g[Ylabel]; // this is used to find the distinct values to decide the number of bars
                });
            }).entries(datavalue);
			setValues();
			
			x_axis.domain(dat.map(function (data) {return data.key;
        }));

        y_axis.domain([0, d3.max(dat, function (data) {return data.value; // we find max to match the Y axis with the max bar height
        })]);

        x = d3.axisBottom(x_axis);

        y = d3.axisRight(y_axis) // ticks are to indicate the names on the bars
            .ticks(4);
			
		createChart();
			});
}
function setValues(){

        x_axis = d3.scaleBand() // this is for range, the inner and outer padding between bars and the distance from start of first bar t the start of second 
	                              // with padding
            .range([0, width]).padding(0.5);
        y_axis = d3.scaleLinear()
            .range([height,0]);

        color = d3.scaleOrdinal()
            .range(["#267DB1", "#35b430", "#f17914", "#C81329"]); //colour codes
    
}

function createChart(){
	
        chart.append("g")
            .attr("height", 300)
            .attr("width", 400);

        chart.append("g")
            .attr("class", "x axis") // calling the class that creates the axis
            .attr("transform", "translate(0," + height + ")")
            .call(x);

        chart.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + width + ",0)")
            .call(y);


        console.log(dat);


        chart.selectAll('.bar')
            .data(dat)
            .enter().append('rect')
            .style("fill", function(d, i) {return color(i);
            })
            .attr('x', function(d) { return x_axis(d.key); })
            .attr('y', function(d) { return y_axis(d.value); })
            .attr('width', x_axis.bandwidth())
            .attr('height', function(d) { return height - y_axis(d.value); });
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