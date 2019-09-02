import {DepthChartProps} from "./DepthChartContainer";
import * as React from "react";
import {Component} from "react";
import * as d3 from "d3";
import {ELEMENT} from "../../../modules/RootStore";
import "./DepthChart.css"

function getX(d: [number, number]): number {
    return d[0];
}

function getY(d: [number, number]): number {
    return d[1];
}

type AXIS = d3.Axis<number | { valueOf(): number }> | undefined;
type SCALE = d3.ScaleLinear<number, number> | undefined;

function reshapeData(data: Array<[number, number]>): Array<[number, number]> {
    const out: Array<[number, number]> = data.flatMap(([price, units], index) => {
        const next: [number, number] | undefined = data[index + 1];
        if (next == undefined) {
            return [[price, units]];
        } else {
            return [
                [price, units],
                [next[0], units]
            ]
        }
    });
    return out;
}

export default class DepthChart extends Component<DepthChartProps> {
    private readonly width = 500;
    private readonly height = 500;
    private readonly margin = {top: 0, right: 10, bottom: 40, left: 40};

    private svg: any;
    private xScale: SCALE;
    private yScale: SCALE;
    private mounted: boolean = false;
    private xAxis: AXIS;
    private yAxis: AXIS;

    componentDidMount(): void {
        this.svg = d3.select("#DepthChart")

            .append("div").classed("svg-container", true)

            .append("svg")

            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", `0 0 ${this.width} ${this.height}`)
            .classed("svg-content-responsive", true)

            .append("g")
            .attr("transform",
                `translate(${this.margin.left},${this.margin.right})`);

        this.xScale = d3.scaleLinear()
            .range([0, this.width - this.margin.left - this.margin.right]);
        this.xAxis = d3.axisBottom(this.xScale!);
        this.svg.append("g")
            .attr("class", "xAxis")
            .attr("transform", `translate(0,${this.height - this.margin.top - this.margin.bottom})`);


        this.yScale = d3.scaleLinear()
            .range([0, this.height - this.margin.top - this.margin.bottom]);
        this.yAxis = d3.axisLeft(this.yScale!);
        this.svg.append("g")
            .attr("class", "yAxis");

        this.mounted = true;
    }

    private changeData(): void {
        const buys = this.props.data.buys;
        const sells = this.props.data.sells;
        const all = buys.concat(sells);

        const xDomain = d3.extent(all.map(getX)) as [number, number];
        const yDomain = d3.extent(all.map(getY)) as [number, number];

        this.xScale!.domain(xDomain);
        this.svg.selectAll(".xAxis").transition()
            .duration(1000)
            .call(this.xAxis as any);

        this.yScale!.domain([yDomain[1] * 1.1, 0]);
        this.svg.selectAll(".yAxis").transition()
            .duration(1000)
            .call(this.yAxis as any);

        // noinspection TypeScriptValidateJSTypes
        const buyPlot = this.svg.selectAll(".buyLine")
            .data([reshapeData(buys)], getX);

        buyPlot.enter()
            .append("path")
            .attr("class", "buyLine")
            .transition()
            .duration(1000)
            .attr("d", d3.line()
                .x(d => this.xScale!(getX(d)))
                .y(d => this.yScale!(getY(d)))
            )
            .attr("fill", "none")
            .attr("stroke", "green")
            .attr("stroke-width", 2.5);

        // noinspection TypeScriptValidateJSTypes
        const sellPlot = this.svg.selectAll(".sellLine")
            .data([reshapeData(sells)], getX);

        sellPlot.enter()
            .append("path")
            .attr("class", "sellLine")
            .transition()
            .duration(1000)
            .attr("d", d3.line()
                .x(d => this.xScale!(getX(d)))
                .y(d => this.yScale!(getY(d)))
            )
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 2.5);
    }

    render(): ELEMENT {
        if (this.mounted) {
            this.changeData();
        }

        return (
            <div id="DepthChart"/>
        );
    }
}