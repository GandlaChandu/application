//#region react imports

import React from 'react';
import { Pie } from 'react-chartjs-2';

//#endregion react imports

//#region application imports

import './pie-chart.scss';
import { PieChartPropModel } from './models/pie-chart-prop.model';

//#endregion application imports

export class PieChartComponent extends React.Component<PieChartPropModel> {

    //#region model properties

    private colors = [];

    //#endregion model properties

    //#region constructor
    //#endregion constructor

    //#region life cycle hooks

    /**
    * renders html for component 
    */
    render() {
        for (let i = 0; i < this.props.dataSet.length; i++) {
            this.colors.push('#' + Math.floor(Math.random() * 16777215).toString(16));
        }
        const data = {
            labels: this.props.label,
            datasets: [{
                data: this.props.dataSet,
                backgroundColor: this.colors,
                borderWidth: [2,2,2,2,2,2]
            }]
        };
        const options = {
            legend: {
                position: 'right',
                labels: { boxWidth: 10 },
            },
        }
        return (
            <div>
                <Pie data={data} options={options}/>
            </div>
        );
    }

    //#endregion life cycle hooks

    //#region event callbacks/public methods
    //#endregion event callbacks/public methods

    //#region private methods
    //#endregion private methods
}