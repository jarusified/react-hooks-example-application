import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Pie = props => {
    const ref = useRef(null);
    const cache = useRef(props.data);
    const createPie = d3
        .pie()
        .value(d => d.value)
        .sort(null);
    const createArc = d3
        .arc()
        .innerRadius(props.innerRadius)
        .outerRadius(props.outerRadius);
    const colors = d3.scaleOrdinal(d3.schemeCategory10);
    const format = d3.format(".2f");
    const total = props.data.length
    const angleSlice = Math.PI * 2 / total
    const radius = Math.min(props.width / 3, props.height / 3)

    var rScale = d3.scaleLinear()
        .range([0, radius])
        .domain([0, 1]);

    useEffect(
        () => {
            const data = createPie(props.data);
            const prevData = createPie(cache.current);
            const group = d3.select(ref.current);
            const groupWithData = group.selectAll("g.arc").data(data);

            groupWithData.exit().remove();

            const groupWithUpdate = groupWithData
                .enter()
                .append("g")
                .attr("class", "arc");

            const path = groupWithUpdate
                .append("path")
                .merge(groupWithData.select("path.arc"));

            const arcTween = (d, i) => {
                const interpolator = d3.interpolate(prevData[i], d);
                return t => createArc(interpolator(t));
            };

            path
                .attr("class", "arc")
                .attr("fill", (d, i) => {
                    let color_idx = props.colorMap[d.data.axis];
                    return colors(color_idx + 1)
                })
                .transition()
                .attrTween("d", arcTween);

            const text = groupWithUpdate
                .append("text")
                .merge(groupWithData.select("text.value"));

            text
                .attr("text-anchor", "middle")
                .attr("class", "value")
                .attr("alignment-baseline", "middle")
                .style("fill", "white")
                .style("font-size", 10)
                .transition()
                .attr("transform", d => `translate(${createArc.centroid(d)})`)
                .tween("text", (d, i, nodes) => {
                    const interpolator = d3.interpolate(prevData[i], d);
                    return t => d3.select(nodes[i]).text(format(interpolator(t).value));
                });

            const label = groupWithUpdate
                .append("text")
                .merge(groupWithData.select("text.legend"))

            label
                .attr("class", "legend")
                .style("font-size", "11px")
                .attr("text-anchor", "middle")
                .attr("dy", "0.35em")
                .attr("x", function (d, i) {
                    return rScale(1.25) * Math.cos(angleSlice * props.colorMap[d.data.axis] - Math.PI / 2);
                })
                .attr("y", function (d, i) {
                    return rScale(1.25) * Math.sin(angleSlice * props.colorMap[d.data.axis] - Math.PI / 2);
                })
                .style("fill", function (d, i) { 
                    let color_idx = props.colorMap[d.data.axis]; 
                    return colors(color_idx + 1); 
                })
                .text(function (d) { return d.data.axis })

            cache.current = props.data;
        },
        [props.data, props.colorMap]
    );

    return (
        <svg width={props.width} height={props.height}>
            <g
                ref={ref}
                transform={`translate(${props.outerRadius + props.width / 4} ${props.outerRadius + props.height / 4})`}
            />
        </svg>
    );
};

export default Pie;
