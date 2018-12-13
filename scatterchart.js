var data2 = [[.500,2.5], [1.000,3], [1.500,3], [2.000,3.3], [3.000,3.6], [4.000,4], [5.500,4.1], [6.000,4.1], [7.000,4.0], [8.000,4.2], [9.000,4.3], [12.000,4.3], [14.000,4.4], [15.000,4.5], [18.000,4.4], [20.000,4.6], [21.000,4.7], [24.000,4.5], [28.000,4.6], [30.000,4.6], [50.000,4.5]];

var data = [[.500,2.5], [1.000,3], [1.500,3], [2.000,3.3], [2.500,3.6], [3.000,4], [3.500,4.1], [4.000,4.1], [4.5,4.0], [5,4.2], [5.5,4.3], [6,4.3], [6.5,4.4], [7.0,4.5], [7.5,4.4], [8.000,4.6], [8.500,4.7], [9.000,4.5], [9.500,4.6], [10.000,4.6], [11.000,4.5]];
   
var data3 = [[.500,2.5], [1.000,3], [1.500,3], [2.000,3.3], [2.500,3.6], [3.000,4], [3.500,4.1], [4.000,6.1], [4.5,8.0], [5,7.2], [5.5,8.3], [6,1.3], [6.5,4.4], [7.0,4.5], [7.5,4.4], [8.000,4.6], [8.500,4.7], [9.000,4.5], [9.500,5.6], [10.000,4.6], [11.000,7.5]];

var margin = {top: 20, right: 80, bottom: 30, left: 250}
var  width = 960 - margin.left - margin.right
var  height = 350 - margin.top - margin.bottom;

//var margin = {top: 20, right: 80, bottom: 30, left: 250}
//    , width = 960 - margin.left - margin.right
//    , height = 350 - margin.top - margin.bottom;


var x = d3.scale.linear()
        .domain([0, d3.max(data, function(d) { return d[0]; })])
        .range([ 0, width ]);

var y = d3.scale.linear()
        .domain([0, 8])
        .range([ height, 0 ]);

var chart = d3.select('div.contentYieldCurve')
.append('svg:svg')
.attr('width', width + margin.right + margin.left)
.attr('height', height + margin.top + margin.bottom)
.attr('class', 'chart')



var main = chart.append('g')
.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
.attr('width', width)
.attr('height', height)
.attr('class', 'main')   
    
// draw the x axis
var xAxis = d3.svg.axis()
.scale(x)
.orient('bottom');

main.append('g')
.attr('transform', 'translate(0,' + height + ')')
.attr('class', 'main axis date')
.call(xAxis);

// draw the y axis
var yAxis = d3.svg.axis()
.scale(y)
.orient('left');

main.append('g')
.attr('transform', 'translate(0,0)')
.attr('class', 'main axis date')
.call(yAxis);

var g = main.append("svg:g"); 

g.selectAll("scatter-dots")
    .data(data)
    .enter().append("svg:circle")
    .attr("cx", function (d,i) { return x(d[0]); } )
    .attr("cy", function (d) { return y(d[1]); } )
    .attr("r", 4);

//do trend analysis
var linReg = regression('linear', data);
var polyReg = regression('polynomial', data, 2);
var expoReg = regression('exponential', data);
var powReg = regression('power', data);
var logReg = regression('logarithmic', data);

var linRegEq = "Lin: y = " + linReg.equation[0].toFixed(4) + "x + " + linReg.equation[1].toFixed(2) + ", r2 = " + linReg.r2.toFixed(3);
var polyRegEq = "Poly: y = " + polyReg.equation[2].toFixed(4) + "x^2 + " + polyReg.equation[1].toFixed(4) + "x + " + polyReg.equation[0].toFixed(2) + ", r2 = " + polyReg.r2.toFixed(3);
var expoRegEq = "Exp: y = " + expoReg.equation[0].toFixed(4) + "e^(" + expoReg.equation[1].toFixed(4) + "x), r2 = " + expoReg.r2.toFixed(3);
var powRegEq = "Pow: y = " + powReg.equation[0].toFixed(4) + "x^" + powReg.equation[1].toFixed(2) + ", r2 = " + powReg.r2.toFixed(3);
var logRegEq = "Log: y = " + logReg.string + ", r2 = " + logReg.r2.toFixed(3);
var allEqs = "Trends: " + linRegEq + "; " + polyRegEq + "; " + expoRegEq + "; " + powRegEq + "; " + logRegEq;

chart.append("rect")
          .attr("id","myRect1")
          .attr("x", 50)
          .attr("y", 50)
          .attr("width", 150)
          .attr("height", 50)
          .style("stroke","black")
          .style("stroke-opacity",0.5)
          .style("stroke-width",2)
          .style("fill","#333")
          .on("mouseover", handleMouseOver1)
          .on("mouseout", handleMouseOut1)
          ;

          chart.append("text")
          .attr("dx",60)
          .attr("dy",80)
          .text("Add the curve")
          .style("fill","white")
          ;

          
          chart.append("rect")
          .attr("id","myRect2")
          .attr("x", 50)
          .attr("y", 100)
          .attr("width", 150)
          .attr("height", 50)
          .style("stroke","black")
          .style("stroke-opacity",0.5)
          .style("stroke-width",2)
          .style("fill","#333")
          .on("mouseover", handleMouseOver2)
          .on("mouseout", handleMouseOut2)
          ;

          chart.append("text")
          .attr("dx",60)
          .attr("dy",130)
          .text("Parallel shift")
          .style("fill","white")
          ;

          chart.append("rect")
          .attr("id","myRect3")
          .attr("x", 50)
          .attr("y", 150)
          .attr("width", 150)
          .attr("height", 50)
          .style("stroke","black")
          .style("stroke-opacity",0.5)
          .style("stroke-width",2)
          .style("fill","#333")
          .on("mouseover", handleMouseOver3)
          .on("mouseout", handleMouseOut3)
          ;
          chart.append("text")
          .attr("dx",60)
          .attr("dy",180)
          .text("Inversion")
          .style("fill","white")
          ;

          chart.append("rect")
          .attr("id","myRect4")
          .attr("x", 50)
          .attr("y", 200)
          .attr("width", 150)
          .attr("height", 50)
          .style("stroke","black")
          .style("stroke-opacity",0.5)
          .style("stroke-width",2)
          .style("fill","#333")
          .on("mouseover", handleMouseOver4)
          .on("mouseout", handleMouseOut4)
          ;
          chart.append("text")
          .attr("dx",60)
          .attr("dy",230)
          .text("Change shape")
          .style("fill","white")
          ;

          

          function handleMouseOver1() {  // Add interactivity 
            // Use D3 to select element, change color and size
           d3.select('#logarithmic')
           .style("stroke-opacity",1)
           ;
           d3.select('#myRect')
           //.attr("r", 70)
           .style("fill","blue")
           ;
        

          d3.select(this)
            .style("fill","#2690d4")
            ;
          }

          function handleMouseOut1() {  // Add interactivity 
            // Use D3 to select element, change color and size
           d3.select('#logarithmic')
           .style("stroke-opacity",0.5)
           ;
           d3.select('#myRect1')
           //.attr("r", 70)
           .style("fill","#333")
           ;        
          }

          function handleMouseOver2() {  // Add interactivity 
            // Use D3 to select element, change color and size
           d3.select('#logarithmic_2')
           .style("stroke-opacity",1)
           ;
        

          d3.select(this)
            .attr({
              fill: "blue",
              //r: 70
            })
            .style("fill","#2690d4")
            ;
          }

          function handleMouseOut2() {  // Add interactivity 
            // Use D3 to select element, change color and size
           d3.select('#logarithmic_2')
           .style("stroke-opacity",0)
           ;
           d3.select('#myRect2')
           //.attr("r", 70)
           .style("fill","#333")
           ;        
          }

          function handleMouseOver3() {  // Add interactivity 
            // Use D3 to select element, change color and size
           d3.select('#logarithmic_3')
           .style("stroke-opacity",1)
           ;
           d3.select('#myRect')
           //.attr("r", 70)
           .style("fill","#2690d4")
           ;
        

          d3.select(this)
            .attr({
              fill: "blue",
              //r: 70
            })
            .style("fill","#2690d4")
            ;
          }

          function handleMouseOut3() {  // Add interactivity 
            // Use D3 to select element, change color and size
           d3.select('#logarithmic_3')
           .style("stroke-opacity",0)
           ;
           d3.select('#myRect3')
           //.attr("r", 70)
           .style("fill","#333")
           ;        
          }

          function handleMouseOver4() {  // Add interactivity 
            // Use D3 to select element, change color and size
           d3.select('#logarithmic_4').style("stroke-opacity",1)
           ;
           d3.select('#myRect')
           //.attr("r", 70)
           .style("fill","blue")
           ;
        

          d3.select(this)
            .attr({
              fill: "blue",
              //r: 70
            })
            .style("fill","#2690d4")
            ;
          }

          function handleMouseOut4() {  // Add interactivity 
            // Use D3 to select element, change color and size
           d3.select('#logarithmic_4')
           .style("stroke-opacity",0)
           ;
           d3.select('#myRect4')
           //.attr("r", 70)
           .style("fill","#333")
           ;        
          }

//
// -----------------------------------------------------------------------
//
var color = d3.scale.category10();
var coloredLines = ["logarithmic", "logarithmic_2", "logarithmic_3", "logarithmic_4", "linear", "polynomial", "exponential", "power" ];
color.domain(coloredLines);
var regressionLinesToPlot = color.domain().map(function(name) {
return {
    name: name,
    values: function() {
    var extrapolatedPts = [];
    for(var i = 0; i < data.length; i++){
        var val = data[i][0];
        switch(name){
        // case "polynomial":
        //     extrapolatedPts.push({x: val, y: polyReg.equation[2] * Math.pow(val,2) + polyReg.equation[1] // * val + polyReg.equation[0]});
        //     break;
        //case "exponential":
        //    extrapolatedPts.push({x: val, y: expoReg.equation[0] * Math.exp(val * expoReg.equation[1])}); ////or use numbers.js per https://gist.github.com/zikes/4279121, var regression = //numbers.statistic.exponentialRegression(pts);
        //    break;
        //case "power":
        //    extrapolatedPts.push({x: val, y: powReg.equation[0] * Math.pow(val,powReg.equation[1])});
        //    break;
        case "logarithmic":
            extrapolatedPts.push({x: val, y: logReg.equation[0] + logReg.equation[1] * Math.log(val)});
            break;
        case "logarithmic_2":
            extrapolatedPts.push({x: val, y: 2*logReg.equation[0] + logReg.equation[1] * Math.log(val)});
            break;
        case "logarithmic_3":
            extrapolatedPts.push({x: val, y: 1.8*logReg.equation[0] - logReg.equation[1] * Math.log(val)});
            break;    
        case "logarithmic_4":
            extrapolatedPts.push({x: val, y: 0.9*logReg.equation[0] + 0.3*logReg.equation[1] * val});
            break;
        //case "linear":
        //default:
        //   extrapolatedPts.push({x: val, y: linReg.equation[0] * val + linReg.equation[1]});
        }
    }


    /*
    ** Bond calculations.
    */

    console.log("regression coeffs", logReg.equation);
    const yield_2 = 0.9*logReg.equation[0] + 0.3*logReg.equation[1] * 2;
    const yield_10 = 0.9*logReg.equation[0] + 0.3*logReg.equation[1] * 10;
    const p_2 = 100 * (1+yield_2/100)**-2;
    const p_10 = 100 * (1+yield_10/100)**-10;
    console.log("yields = ", yield_2, yield_10);
    console.log("prices = ", p_2, p_10);
    const n_2 = - (p_10*10)/(p_2*2);
    const parShift = 0.02;
    const rotation = 3.02;
    const newYield_2 = yield_2 + parShift + rotation;
    const newYield_10 = yield_10 + parShift - rotation;
    const newP_2 = 100 * (1+newYield_2/100)**-2;
    const newP_10 = 100 * (1+newYield_10/100)**-10;
    console.log("new prices = ", newP_2, newP_10);
    const profit_2 = n_2 * (newP_2 - p_2);
    const profit_10 = (newP_10 - p_10);
    const netProfit =  profit_2 + profit_10;
    console.log("net profit/loss:", netProfit);
    
    main.append('text')
    .style("font-size","12px")
    .attr("dx",-200)
    .attr("dy",320)
    .text("For 1*10yr purchased, sell " + -n_2.toFixed(3) + " 2yrs")
    .style("fill","blue")
    ;
    main.append('text')
    .style("font-size","12px")
    .attr("dx",-200)
    .attr("dy",330)
    .text("For a rotation of "+ rotation*100 + " bps:  profit = $"+ netProfit.toFixed(3))
    .style("fill","grey")
    ;
    return extrapolatedPts;
    }()
};
});



var line = d3.svg.line()
      .interpolate("basis")
      .x(function(d) { return x(d.x); })
      .y(function(d) { return y(d.y); });
      
var plotFields = main.selectAll(".lines-to-plot")
    .data(regressionLinesToPlot)
    .enter().append("g")
    .attr("class", "lines-to-plot");

plotFields.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .attr("data-legend", function(d) { return d.name})
      .style("stroke", function(d) { return color(d.name); })
      .style("stroke-width", "3.0px")
      .style("fill", "none")
      .style("stroke-opacity",0)
      .attr("id",function(d) { return d.name});

plotFields.append("text")
    .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
    .attr("transform", function(d) { return "translate(" + x(d.value.x) + "," + y(d.value.y) + ")"; })
    .attr("x", 3)
    .attr("dy", ".35em")
    .text(function(d) { return d.name; });

var legend = main.append("g")
    .attr("class","legend")
    .attr("transform","translate(50,30)")
    .style("font-size","16px")
    .call(d3.legend);

var regLineInfo = main.append("g")
    .attr("class","legend")
    .attr("transform","translate(20,0)")
    .style("font-size","12px")
    .append("text")
    .text(function() { return allEqs; });


    