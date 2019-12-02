
// Code borrowed from http://bl.ocks.org/nbremer/raw/21746a9668ffdf6d8242/
// But rewrote as a React hook by Suraj Kesavan. 

import React, { useEffect, useRef } from 'react'
import * as d3 from "d3"

const RadarChart = props => {
    const ref = useRef(null)
    const cache = useRef(props.data)

    const cfg = {
        w: props.width,				//Width of the circle
        h: props.height,				//Height of the circle
        margin: { top: 10, right: 10, bottom: 10, left: 10 }, //The margins of the SVG
        levels: props.levels || 5,				//How many levels or inner circles should there be drawn
        maxValue: props.maxValue || 1.0, 			//What is the value that the biggest circle will represent
        labelFactor: props.labelFactor || 1.25, 	//How much farther than the radius of the outer circle should the labels be placed
        wrapWidth: props.wrapWidth || 40, 		//The number of pixels after which a label needs to be given a new line
        opacityArea: props.opacityArea || 0.20, 	//The opacity of the area of the blob
        dotRadius: props.dotRadius || 5, 			//The size of the colored circles of each blog
        opacityCircles: props.opacityCircles || 0.1, 	//The opacity of the circles of each blob
        strokeWidth: props.strokeWidth || 2, 		//The width of the stroke around each blob
        roundStrokes: props.roundStrokes || false,	//If true the area and stroke will follow a round path (cardinal-closed)
        color: props.colors || d3.scaleOrdinal(d3.schemeCategory10)	//Color function
    };

    var maxValue = 1.00

    var allAxis = (props.data[0].map(function (i, j) { return i.axis })),	//Names of each axis
        total = allAxis.length,					//The number of different axes
        radius = Math.min(cfg.w / 3, cfg.h / 3), 	//Radius of the outermost circle
        Format = d3.format('.0%'),			 	//Percentage formatting
        angleSlice = Math.PI * 2 / total;		//The width in radians of each "slice"

    //Scale for the radius
    var rScale = d3.scaleLinear()
        .range([0, radius])
        .domain([0, maxValue]);

    //The radial line function
    var radarLine = d3.radialLine()
        .curve(d3.curveLinearClosed)
        .radius(function (d) { return rScale(d.value); })
        .angle(function (d, i) { return i * angleSlice; });

    useEffect(
        () => {
            const data = props.data
            const circleData = props.data[0]
            const prevData = cache.current

            const group = d3.select(ref.current)
            const groupWithData = group.selectAll("g.radarWrapper").data(data)
            const circleWithData = group.selectAll('g.circleWrapper').data(circleData)

            groupWithData.exit().remove()
            circleWithData.exit().remove()
            
            const groupWithUpdate = groupWithData
                .enter()
                .append('g')
                .attr('class', 'radarWrapper')

            const filter = groupWithUpdate.append('defs').append('filter').attr('id', 'glow');
            const feMerge = filter.append('feMerge');
            filter.append('feGaussianBlur').attr('stdDeviation', '2.5').attr('result', 'coloredBlur');
            feMerge.append('feMergeNode').attr('in', 'coloredBlur');
            feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

            //Wrapper for the grid & axes
            const axisGrid = groupWithUpdate
                .append("g")
                .attr("class", "axisWrapper")
                .merge(groupWithData.select("g.axisWrapper"))

            //Draw the background circles
            axisGrid.selectAll(".levels")
                .data(d3.range(1, (cfg.levels + 1)).reverse())
                .enter()
                .append("circle")
                .attr("class", "gridCircle")
                .attr("r", function (d, i) { return radius / cfg.levels * d; })
                .style("fill", "#CDCDCD")
                .style("stroke", "#CDCDCD")
                .style("fill-opacity", cfg.opacityCircles)
                .style("filter", "url(#glow)");

            //Text indicating at what % each level is
            axisGrid.selectAll(".axisLabel")
                .data(d3.range(1, (cfg.levels + 1)).reverse())
                .enter().append("text")
                .attr("class", "axisLabel")
                .attr("x", 4)
                .attr("y", function (d) { return -d * radius / cfg.levels; })
                .attr("dy", "0.4em")
                .style("font-size", "10px")
                .attr("fill", "#737373")
                .text(function (d, i) { return Format(maxValue * d / cfg.levels); });

            var axis = axisGrid.selectAll(".axis")
                .data(allAxis)
                .enter()
                .append("g")
                .attr("class", "axis");

            //Append the lines
            axis.append("line")
                .attr("x1", 0)
                .attr("y1", 0)
                .attr("x2", function (d, i) { return rScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2); })
                .attr("y2", function (d, i) { return rScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2); })
                .attr("class", "line")
                .style("stroke", "white")
                .style("stroke-width", "2px");

            //Append the labels at each axis
            axis.append("text")
                .attr("class", "legend")
                .style("font-size", "11px")
                .attr("text-anchor", "middle")
                .attr("dy", "0.35em")
                .attr("x", function (d, i) {
                    return rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice * props.colorMap[d] - Math.PI / 2);
                })
                .attr("y", function (d, i) {
                    return rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice * props.colorMap[d] - Math.PI / 2);
                })
                .style("fill", function (d, i) {
                    let color_idx = props.colorMap[d];
                    return cfg.color(color_idx);
                })
                .text(function (d) { return d })
                .call(wrap, cfg.wrapWidth);

            let radarArea = groupWithUpdate
                .append('path')
                .merge(groupWithData.select('path.radarArea'))

            const arcTween = (d, i) => {
                const interpolator = d3.interpolate(prevData[0], d);
                return t => radarLine(interpolator(t));
            };

            radarArea
                .attr("class", "radarArea")
                .attr("d", function (d, i) { return radarLine(d); })
                .style("fill", function (d, i) { return cfg.color(i); })
                .style("fill-opacity", cfg.opacityArea)
                .on('mouseover', function (d, i) {
                    //Dim all blobs
                    d3.selectAll(".radarArea")
                        .transition().duration(200)
                        .style("fill-opacity", 0.1);
                    //Bring back the hovered over blob
                    d3.select(this)
                        .transition().duration(200)
                        .style("fill-opacity", 0.7);
                })
                .on('mouseout', function () {
                    //Bring back all blobs
                    d3.selectAll(".radarArea")
                        .transition().duration(200)
                        .style("fill-opacity", cfg.opacityArea);
                })
                .transition()
                .duration(500)
                .attrTween("d", arcTween)

            let radarStroke = groupWithUpdate
                .append('path')
                .merge(groupWithData.select('path.radarStroke'))

            //Create the outlines	
            radarStroke
                .attr("class", "radarStroke")
                .attr("d", function (d, i) { return radarLine(d); })
                .style("stroke-width", cfg.strokeWidth + "px")
                .style("stroke", function (d, i, j) { return '#B1C739'; })
                .style("fill", "none")
                .style("filter", "url(#glow)");

            const circleWithUpdate = circleWithData
                .enter()
                .append('g')
                .attr('class', 'circleWrapper')

            let radarCircle = circleWithUpdate
                .append('circle')
                .merge(circleWithData.select('circle.radarCircle'))
            
            radarCircle
                .attr("class", "radarCircle")
                .attr("r", cfg.dotRadius)
                .attr("cx", function (d, i) { return rScale(d.value) * Math.cos(angleSlice * props.colorMap[d.axis] - Math.PI / 2); })
                .attr("cy", function (d, i) { return rScale(d.value) * Math.sin(angleSlice * props.colorMap[d.axis] - Math.PI / 2); })
                .style("fill", function (d, i, j) {
                    let color_idx = props.colorMap[d.axis];
                    return cfg.color(color_idx);
                })
                .style("fill-opacity", 0.8);

            //Set up the small tooltip for when you hover over a circle
            groupWithUpdate.append("text")
                .attr("class", "tooltip")
                .style("opacity", 0);

            cache.current = props.data

        },
        [props.data, props.colorMap]
    );

    function wrap(text, width) {
        text.each(function () {
            var text = d3.select(this),
                words = text.text().split(/\s+/).reverse(),
                word,
                line = [],
                lineNumber = 0,
                lineHeight = 1.4, // ems
                y = text.attr("y"),
                x = text.attr("x"),
                dy = parseFloat(text.attr("dy")),
                tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");

            while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > width) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                }
            }
        });
    }

    return (
        <svg width={props.width} height={props.height} transform={`translate(${cfg.margin.left} ${cfg.margin.top})`}>
            <g
                className="radarWrapper"
                ref={ref}
                transform={`translate(${props.width / 2} ${props.height / 2})`}
            />
            <g
                className="circleWrapper"
                ref={ref}
                transform={`translate(${props.width / 2} ${props.height / 2})`}
            />
        </svg>
    )

};

export default RadarChart;