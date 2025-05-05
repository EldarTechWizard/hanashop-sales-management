import { CalendarDate} from '@internationalized/date';
import { DatePicker, defaultTheme, Provider } from '@adobe/react-spectrum';

type Props = {
    date: CalendarDate | null
    setDate: (date: CalendarDate | null) => void
}

const CustomDatePicker: React.FC<Props> = ({ date, setDate }) => {
    return (
        <Provider theme={defaultTheme} colorScheme='light' locale="es-ES" >
            <DatePicker value={date} onChange={setDate}  aria-label='datepicker'/>
        </Provider>
    )
}

export default CustomDatePicker;