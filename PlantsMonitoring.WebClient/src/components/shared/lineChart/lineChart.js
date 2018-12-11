import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from "reactstrap";
import { Line } from 'react-chartjs-2';
import { Loader } from '../';

export const LineChart = ({ data, options, isFetching, title, width, height }) => {
    return (
        <Card className="card-chart">
            <CardHeader>
                <h4 className="card-title">{title}</h4>
            </CardHeader>
            <CardBody>
                {isFetching ?
                    <Loader isFetching={isFetching}></Loader>
                    :   <Line
                            data={data}
                            options={options}
                            redraw={true}
                            width={width}
                            height={height}
                        />
                }
            </CardBody>
            <CardFooter>
                <div className="stats">
                    <i className="now-ui-icons arrows-1_refresh-69"></i> Just Updated
                      </div>
            </CardFooter>
        </Card>
    );
}