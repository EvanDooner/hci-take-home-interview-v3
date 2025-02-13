import { useState } from "react";
import PaginatedResults from "../models/paginatedResults"
import VisitSearchResults from "../components/VisitSearchResults";
import RichVisit from "../models/richVisit";
import SearchTabs from "../components/SearchTabs";
import { Page } from "../Constants";
import { DateRange, DateRangeSelector } from "../components/DateRangeSelector";

type VisitSearchArguments = {
    visits: PaginatedResults<RichVisit> | undefined,
    onSearch: (searchQuery: string, startDateInc: Date, endDateInc: Date) => void,
    onSelect: (patientId: string) => void,
    onTabSelect: (page: Page) => void,
};

function getDefaultDates() {
    const now = new Date();
    const todayAtMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    todayAtMidnight.setSeconds(-1);
    const oneYearAgo = new Date(todayAtMidnight.getFullYear() - 1, todayAtMidnight.getMonth(), todayAtMidnight.getDate());
    return {startDateInc: oneYearAgo, endDateInc: todayAtMidnight};
}

export default function VisitSearch({visits, onSearch, onSelect, onTabSelect}: VisitSearchArguments) {
    const [searchQuery, setSearchQuery] = useState("")
    const [dateRange, setDateRange] = useState<DateRange>(getDefaultDates());
    const {startDateInc, endDateInc} = dateRange;
    let currentStartDateInc = startDateInc;

    if (startDateInc >= endDateInc) {
        currentStartDateInc = new Date(endDateInc.getFullYear(), endDateInc.getMonth(), endDateInc.getDate() - 1);
        setDateRange({startDateInc: currentStartDateInc, endDateInc});
    }

    return (
        <div className="visit search">
            <SearchTabs currentPage={Page.VisitSearch} onSelect={onTabSelect} />
            <div className="visit search-form">
                <input 
                        placeholder="Enter patient name or email" 
                        type="text" 
                        name="searchQuery" 
                        value={searchQuery} 
                        onChange={e => setSearchQuery(e.target.value)} 
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                onSearch(searchQuery, currentStartDateInc, endDateInc)
                            }
                        }}
                    />
                <DateRangeSelector dateRange={dateRange} setDateRange={setDateRange} />
                <button onClick={() => onSearch(searchQuery, currentStartDateInc, endDateInc)}>Search</button>
            </div>
            {visits &&
                <VisitSearchResults visits={visits} onSelect={onSelect} />
            }
        </div>
    );
}