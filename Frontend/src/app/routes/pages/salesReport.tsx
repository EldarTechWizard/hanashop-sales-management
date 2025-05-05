import { useState } from "react"
import { CalendarDate, parseDate } from '@internationalized/date';
import { formatDateToYYYYMMDD } from "@components/report/utils/formatDate";
import { Flex } from "@radix-ui/themes";
import Header from "@components/header/header";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@lib/api";
import ReportHeader from "@components/report/reportHeader";
import ReportViewer from "@components/report/ReportViewer";
import { SalesPdf } from "@components/pdf/salesPdf";


const SalesReport = () => {
    const [startDate, setStartDate] = useState<CalendarDate | null>(parseDate(formatDateToYYYYMMDD(new Date())))
    const [endDate, setEndDate] = useState<CalendarDate | null>(parseDate(formatDateToYYYYMMDD(new Date())))

    const { data, refetch } = useQuery(
        {
            queryKey: ["order", startDate, endDate],
            queryFn: () => getData(`/orders/?start_date=${startDate}&end_date=${endDate}`),
            enabled: false
        }
    )


    const fetchData = async () => {
        await refetch();

    }


    return (
        <Flex direction="column" gap="2" height="100%">
            <Header />
            <ReportHeader title="Reporte de ventas" startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} handleClick={fetchData} />

            {data ? <ReportViewer>
                <SalesPdf data={data} startDate={startDate?.toString() ?? ""} endDate={endDate?.toString() ?? ""} />
            </ReportViewer> : <></>}

        </Flex>
    )
}

export default SalesReport;