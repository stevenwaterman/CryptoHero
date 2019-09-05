import {PriceChartProps} from "./PriceChartContainer";
import * as React from "react";
import {Component} from "react";
import * as d3 from "d3";
import {ELEMENT} from "../../../modules/RootStore";
import "./PriceChart.css"
import {IPriceHistory} from "../../../models/PriceHistory";
import {clamp} from "../../../util/Clamp";
type AXIS = d3.Axis<number | { valueOf(): number }> | undefined;
type XSCALE = d3.ScaleTime<number, number> | undefined;
type YSCALE = d3.ScaleLinear<number, number> | undefined;

function reshapeData(data: IPriceHistory): Array<[number, number]> {
    const destructed = data.filter((_, idx) => idx%(clamp(Math.round(data.length / 100), 1)) === 0);
    return destructed.map(it => [Number.parseFloat(it.time.toString()), Number.parseFloat(it.price.toString())])
}

export default class PriceChart extends Component<PriceChartProps> {
    private readonly width = 500;
    private readonly height = 150;
    private readonly margin = {top: 0, right: 10, bottom: 30, left: 35};

    private svg: any;
    private xScale: XSCALE;
    private yScale: YSCALE;
    private mounted: boolean = false;
    private xAxis: AXIS;
    private yAxis: AXIS;

    private readonly data: Array<[number, number]> = [];

    componentDidMount(): void {
        this.svg = d3.select("#PriceChart")
            .append("div").classed("svg-container", true)
            .append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", `0 0 ${this.width} ${this.height}`)
            .classed("svg-content-responsive", true)
            .append("g")
            .attr("transform", `translate(${this.margin.left},${this.margin.right})`);

        this.xScale = d3.scaleTime()
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

        this.svg.append("path")
            .data([this.data])
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-width", 2.5);

        this.mounted = true;
    }

    render(): ELEMENT {
        if (this.mounted && !this.props.hide) {
            this.changeData();
        }

        return (
            <div id="PriceChart" hidden={this.props.hide}/>
        );
    }

    private changeData(): void {
        const data: IPriceHistory = this.props.priceHistory;
        this.data.splice(0, Infinity, ...reshapeData(data));

        const yDomain = d3.extent(data.map(it => Number.parseFloat(it.price.toString()))) as [number, number];
        if (data.length > 0) {
            const xMin = data[0].time;
            const xMax = data[data.length - 1].time;
            this.xScale!.domain([xMin, xMax]);
        }

        this.svg.selectAll(".xAxis")
            //.transition().duration(1000)
            .call(this.xAxis as any);

        this.yScale!.domain(yDomain.reverse());
        this.svg.selectAll(".yAxis")
            //.transition().duration(1000)
            .call(this.yAxis as any);

        this.svg.selectAll(".line")
            .data([this.data])
            .attr("d", d3.line()
                .x(d => this.xScale!(d[0]))
                .y(d => this.yScale!(d[1]))
            );
    }
}