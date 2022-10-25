//#region react imports

import React from 'react';
import { Line } from 'react-chartjs-2';

//#endregion react imports

//#region application imports

import './line-chart.scss';
import { LineChartPropModel } from './models/line-chart-prop.model';

//#endregion application imports

export class LineChartComponent extends React.Component<LineChartPropModel> {

    //#region model properties
    //#endregion model properties

    //#region constructor
    //#endregion constructor

    //#region life cycle hooks

    /**
    * renders html for component 
    */
    render() {
        let dataValue = this.props.trendPeriod;
        const data = {
            labels: this.props.scanDates,
            datasets: [
                {
                    label: 'High',
                    fill: false,
                    borderColor: '#dc3545',
                    pointBackgroundColor: '#dc3545',
                    pointRadius: 2,
                    pointHitRadius: 2,
                    data: this.props.high,
                },
                {
                    label: 'Medium',
                    fill: false,
                    borderColor: '#ffc107',
                    pointBackgroundColor: '#ffc107',
                    pointRadius: 3,
                    pointHitRadius: 3,
                    data: this.props.medium,
                },
                {
                    label: 'Low',
                    fill: false,
                    borderColor: '#20639b',
                    pointBackgroundColor: '#20639b',
                    pointRadius: 4,
                    pointHitRadius: 4,
                    data: this.props.low,
                }
            ]
        };
        const options = {
            legend: {
                position: 'bottom'
            },
            scales: {
                xAxes: [{
                    ticks: {
                        fontSize: 10,
                        autoSkip: false,
                        maxRotation: 90,
                        minRotation: 90,
                        callback: function (tick, index) {
                            if (dataValue > 15) {
                                return (index % 5) ? "" : tick;
                            } else {
                                return (index % 0) ? "" : tick;
                            }
                        }
                    }
                }],
                yAxes: [{
                    ticks: {
                        min: 0
                    }
                }]
            }
        }
        return (
            <div className="line-chart">
                <Line data={data} options={options} height={125}/>
            </div>
        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods
    //#endregion event callbacks/public methods

    //#region private methods
    //#endregion private methods
}