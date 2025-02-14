import { render, screen } from '@testing-library/react';
import { DateSelector } from "./DateSelector";

test("DateSelector sets selected values", async () => {
    const { container } = render(<DateSelector date={new Date(2025, 1,  14)} setDate={() => {}}/>);
    const linkElement = screen.getByTestId('DateSelector');
    expect(linkElement).toBeTruthy();
    
    const daySelector = container.querySelector('select[name="day"]') as HTMLSelectElement;
    expect(daySelector).toBeTruthy();
    if (daySelector !== null) {
        expect(daySelector.value).toBe('14');
    }
    
    const monthSelector = container.querySelector('select[name="month"]') as HTMLSelectElement;
    expect(monthSelector).toBeTruthy();
    if (monthSelector !== null) {
        expect(monthSelector.value).toBe('1');
    }
    
    const yearSelector = container.querySelector('select[name="year"]') as HTMLSelectElement;
    expect(yearSelector).toBeTruthy();
    if (yearSelector !== null) {
        expect(yearSelector.value).toBe('2025');
    }
});