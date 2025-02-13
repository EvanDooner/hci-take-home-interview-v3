import { DateSelector } from "./DateSelector";

export type DateRange = {
    startDateInc: Date,
    endDateInc: Date,
}

type DateRangeSelectorProps = {
    dateRange: DateRange,
    setDateRange: (dateRange: DateRange) => void,
}

export function DateRangeSelector({dateRange, setDateRange}: DateRangeSelectorProps) {
    const {startDateInc, endDateInc} = dateRange;

    return (
        <div className="date-range-selector">
            <div className="date from">
                From: <DateSelector 
                        date={startDateInc}
                        setDate={(dateSelection) => setDateRange({startDateInc: dateSelection, endDateInc: dateRange.endDateInc})} />
            </div>
            <div className="date to">
                To: <DateSelector 
                        date={endDateInc}
                        setDate={(dateSelection) => setDateRange({startDateInc: dateRange.startDateInc, endDateInc: dateSelection})} />
            </div>
        </div>
    );
}