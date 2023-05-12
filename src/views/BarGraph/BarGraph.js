import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const BarGraph = ({ data = [] }) => {
    const svgRef = useRef(null);
    const height = 500;
    const width = 600;
    const margin = {
        "left": 40,
        "right": 40,
        "top": 40,
        "bottom": 40
    };

    useEffect(() => {
        const svgElement = d3.select(svgRef.current);
        svgElement.selectAll("*").remove();

        const svg = svgElement
            .append("g")
            .attr("transform", `translate(100, 100)`);

        // defining x-axis
        const xScale = d3
            .scaleLinear()
            .domain([0, d3.max(data)] + 50)
            .range([0, width]);

        // defining y-axis
        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(data)] + 50)
            .range([height, 0]);

        const xAxis = d3
            .axisBottom(xScale)
            .ticks(5)
            .tickSize(-height + margin.top);
        const xAxisGroup = svg
            .append("g")
            .attr("transform", `translate(0, ${height - margin.bottom})`)
            .call(xAxis);

        const yAxis = d3
            .axisLeft(yScale)
            .ticks(5)
            .tickSize(-width);

        const yAxisGroup = svg.append("g").call(yAxis);
        svg
            .selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", d=>d)
            .attr("y", d=>d)
            .attr("width", 50)
            .attr("height", d=>height-d);

    }, [data]);

    return (
        <div>
            <h1>Bar Graph</h1>
            <svg
                ref={svgRef}
            // width={100}
            // height={200}
            />
        </div>

    )
}

export default BarGraph;