import { Flex, Text } from "@radix-ui/themes";
import { CalendarDate } from '@internationalized/date';
import CustomDatePicker from "@components/ui/datePicker";
import CustomButton from "@components/ui/formCustomButton";


type Props = {
    title? : string;
    startDate: CalendarDate | null;
    setStartDate: (date: CalendarDate | null) => void
    endDate: CalendarDate | null;
    setEndDate: (date: CalendarDate | null) => void
    handleClick: () => void
}


const ReportHeader = ({ startDate, endDate, setStartDate, setEndDate, handleClick , title}: Props) => {

    return (
        <Flex justify="center" direction="column" gap="4">
            <Text size="6" weight="bold" align="center">{title}</Text>
            <Flex gap="4" p="2" justify="center">
                <Flex gap="2" justify="center" align="center">
                    <Text>Fecha de inicio:</Text>
                    <CustomDatePicker date={startDate} setDate={setStartDate} />
                </Flex>

                <Flex gap="2" justify="center" align="center">
                    <Text>Fecha de cierre:</Text>
                    <CustomDatePicker date={endDate} setDate={setEndDate} />
                </Flex>
                <CustomButton text="Generar" onClick={handleClick} />
            </Flex>
        </Flex>
    )
}

export default ReportHeader;