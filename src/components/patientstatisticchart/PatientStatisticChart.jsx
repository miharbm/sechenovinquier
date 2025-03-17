import Paper from "@mui/material/Paper";
import "./patientstaticchart.scss"
import ChartItem from "./PatientStatisticChartItem.jsx";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import {useGetPatientResultQuery} from "../../api/adminApi.js";


const PatientStatisticChart = ({patientId}) => {
    const {data} = useGetPatientResultQuery({patientId})
    const chartRef = useRef(null);
    const userResults = data?.user_results || [];
    const [hasScroll, setHasScroll] = useState(false);

    const groupByDate = userResults.reduce((acc, result) => {
        const date = new Date(result.pass_time).toISOString().split("T")[0];

        if (!acc[date]) {
            acc[date] = []
        }

        acc[date].push(result);

        return acc;
    }, {})

    const sortedDates = Object.keys(groupByDate).sort((a, b) => new Date(a) - new Date(b));

    const renderData = sortedDates.map((date, ) => {
        const dateAndMonth = date.split("-").slice(1, 3);
        const day = dateAndMonth[1];
        const month = dateAndMonth[0];
        return (
            <div key={`${date}`} className={"chart__column"}>
                <Box>
                    <Typography variant="body2"
                                color="textPrimary"
                                sx={{fontSize: "10px", lineHeight: 1, textAlign: "center"}}
                    >
                        {day}
                    </Typography>
                    <Typography variant="body2"
                                color="textSecondary"
                                sx={{fontSize: "10px", lineHeight: 1, textAlign: "center"}}
                    >
                        {month}
                    </Typography>
                </Box>
                {
                    groupByDate[date].map((item, i) => (
                        <ChartItem key={`${date}-${i}`} data={item}/>
                    ))
                }
            </div>
        )
    })

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.scrollLeft = chartRef.current.scrollWidth;
            const hasHorizontalScroll = chartRef.current.scrollWidth > chartRef.current.clientWidth;
            setHasScroll(hasHorizontalScroll);
        }
    }, [renderData]);

    return (
        <Paper sx={{padding:'20px', paddingTop: "10px"}}>
            <Typography variant={"h6"}>Статистика опросов</Typography>
            <Divider/>
            <div className={classNames("chart", {"chart__no-scroll": !hasScroll})}
                 ref={chartRef}
            >
                {renderData}
            </div>
        </Paper>

    )
}


export default PatientStatisticChart