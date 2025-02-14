
function daysInMonth(month: number, year: number) {
    // This works because JavaScript uses 1-indexed Dates. 
    // When we create a new Date with a day value of 0, 
    // JS actually considers this the last day of the preceding month.
    // For example, if we want to find out the number of days in January 2024,
    // we create a new Date for day '0' in February 2024.
    if (month == 11) {
        return new Date(year + 1, 1, 0).getDate();
    } else {
        return new Date(year, month + 1, 0).getDate();
    }
}

function getDayOptions(month: number, year: number) {
    const options: JSX.Element[] = []

    for (let i = 1; i <= daysInMonth(month, year); i += 1) {
        options.push(<option key={i} value={i}>{i}</option>)
    }

    return options;
}

function getYearOptions(startYearInc: number, endYearInc: number) {
    const options: JSX.Element[] = []

    for (let i = endYearInc; i >= startYearInc; i -= 1) {
        options.push(<option key={i} value={i}>{i}</option>)
    }

    return options;
}

type DateSelectorProps = {
    date: Date,
    setDate: (dateSelection: Date) => void
};

function adjustDayForMonthChange(date: Date, month: number) {
    const daysInCurrentMonth = daysInMonth(date.getMonth(), date.getFullYear());
    const daysInNewMonth = daysInMonth(month, date.getFullYear());

    return Math.min(date.getDate(), daysInCurrentMonth, daysInNewMonth);
}

function adjustDayForYearChange(date: Date, year: number) {
    const daysInCurrentMonth = daysInMonth(date.getMonth(), date.getFullYear());
    const daysInNewMonth = daysInMonth(date.getMonth(), year);

    return Math.min(date.getDate(), daysInCurrentMonth, daysInNewMonth);
}

export function DateSelector({date, setDate}: DateSelectorProps) {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    return (
        <div className="date-selector" data-testid="DateSelector">
            <select
                    name="day"
                    value={day}
                    onChange={(e) => setDate(new Date(date.getFullYear(), date.getMonth(), parseInt(e.target.value)))}
            >
                {getDayOptions(month, year)}
            </select>
            <select
                    name="month"
                    value={month}
                    onChange={(e) => setDate(new Date(date.getFullYear(), parseInt(e.target.value), adjustDayForMonthChange(date, month)))}
            >
                <option value="0">January</option>
                <option value="1">February</option>
                <option value="2">March</option>
                <option value="3">April</option>
                <option value="4">May</option>
                <option value="5">June</option>
                <option value="6">July</option>
                <option value="7">August</option>
                <option value="8">September</option>
                <option value="9">October</option>
                <option value="10">November</option>
                <option value="11">December</option>
            </select>
            <select
                    name="year"
                    value={year}
                    onChange={(e) => 
                        setDate(new Date(parseInt(e.target.value), date.getMonth(), adjustDayForYearChange(date, parseInt(e.target.value))))
                }>
                {
                    // In production would be determined based on the date range of records for the current hospital/org.
                    getYearOptions(2000, new Date().getFullYear()) 
                }
            </select>
        </div>
    );
}