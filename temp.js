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

