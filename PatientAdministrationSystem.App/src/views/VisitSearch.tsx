import { useState } from "react";
import PaginatedResults from "../models/paginatedResults"
import VisitSearchResults from "../components/VisitSearchResults";
import RichVisit from "../models/richVisit";
import SearchTabs from "../components/SearchTabs";
import { Page } from "../Constants";

type VisitSearchArguments = {
    visits: PaginatedResults<RichVisit> | undefined,
    onSearch: (searchQuery: string) => void,
    onSelect: (patientId: string) => void,
    onTabSelect: (page: Page) => void,
};

export default function VisitSearch({visits, onSearch, onSelect, onTabSelect}: VisitSearchArguments) {
    const [searchQuery, setSearchQuery] = useState("")

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
                                onSearch(searchQuery)
                            }
                        }}
                    />
                <button onClick={() => onSearch(searchQuery)}>Search</button>
            </div>
            {visits &&
                <VisitSearchResults visits={visits} onSelect={onSelect} />
            }
        </div>
    );
}