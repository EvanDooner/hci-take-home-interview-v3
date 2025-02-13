import { Page } from "../Constants";

export default function SearchTabs({currentPage, onSelect}: {currentPage: Page, onSelect: (page: Page) => void}) {

    return (
        <div className="search-tabs">
            <div 
                    className={`patients tab${currentPage === Page.PatientSearch ? ' active' : ''}`}
                    onClick={() => currentPage !== Page.PatientSearch && onSelect(Page.PatientSearch)}
                >
                Patients
            </div>
            <div
                    className={`visits tab${currentPage === Page.VisitSearch ? ' active' : ''}`}
                    onClick={() => currentPage !== Page.VisitSearch && onSelect(Page.VisitSearch)}
                >
                Visits
            </div>
        </div>
    );
}