import {DepthChartProps} from "./DepthChartContainer";
import * as React from "react";
import {Component} from "react";
import * as d3 from "d3";
import {ELEMENT} from "../../../modules/RootStore";
import "./DepthChart.css"
import {OrderDepthPoint} from "../../../models/OrderDepth";

function getX(p: [number, number]): number {
    return p[0];
}

function getY(p: [number,number]): number {
    return p[1];
}

type AXIS = d3.Axis<number | { valueOf(): number }> | undefined;
type SCALE = d3.ScaleLinear<number, number> | undefined;

function reshapeData(data: DirectionalOrderDepth): Array<[number, number]> {
    const shaped: DirectionalOrderDepth = data.flatMap((point, index) => {
        const next: OrderDepthPoint | undefined = data[index + 1];
        if (next == null) {
            return new OrderDepthPoint(point.price, point.volume);
        } else {
            return [
                point,
                new OrderDepthPoint(next.price, point.volume)
            ]
        }
    });
    return shaped.map(it => [it.price, it.volume])
}

export default class DepthChart extends Component<DepthChartProps> {
    private readonly width = 500;
    private readonly height = 250;
    private readonly margin = {top: 0, right: 10, bottom: 40, left: 60};

    private svg: any;
    private xScale: SCALE;
    private yScale: SCALE;
    private mounted: boolean = false;
    private xAxis: AXIS;
    private yAxis: AXIS;

    private readonly buys: Array<[number, number]> = [];
    private readonly sells: Array<[number, number]> = [];

    componentDidMount(): void {
        this.svg = d3.select("#DepthChart")
            .append("div").classed("svg-container", true)
            .append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", `0 0 ${this.width} ${this.height}`)
            .classed("svg-content-responsive", true)
            .append("g")
            .attr("transform", `translate(${this.margin.left},${this.margin.right})`);

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

        this.svg.append("path")
            .data([this.buys])
            .attr("class", "buyLine")
            .attr("fill", "none")
            .attr("stroke", "green")
            .attr("stroke-width", 2.5);

        this.svg.append("path")
            .data([this.sells])
            .attr("class", "sellLine")
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 2.5);

        this.mounted = true;
    }

    private changeData(): void {
        const buys: DirectionalOrderDepth = this.props.depthData.buys;
        const sells: DirectionalOrderDepth = this.props.depthData.sells;

        this.buys.splice(0, Infinity, ...reshapeData(buys));
        this.sells.splice(0, Infinity, ...reshapeData(sells));
        const all: Array<[number, number]> = this.buys.concat(this.sells);

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

        this.svg.selectAll(".buyLine")
            .data([this.buys])
            //.transition().duration(1000)
            .attr("d", d3.line()
                .x(d => this.xScale!(d[0]))
                .y(d => this.yScale!(d[1]))
            );
        this.svg.selectAll(".sellLine")
            .data([this.sells])
            //.transition().duration(1000)
            .attr("d", d3.line()
                .x(d => this.xScale!(d[0]))
                .y(d => this.yScale!(d[1]))
            );
    }

    render(): ELEMENT {
        if (this.mounted) {
            this.changeData();
        }

        return (
            <div id="DepthChart" hidden={this.props.hide}/>
        );
    }
}