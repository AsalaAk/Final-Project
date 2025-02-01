// Filter.tsx
import React, { useState, useRef, useEffect } from 'react';
import './Filter.css';

type FilterProps = {
    onApplyFilter: (filters: { ezor: string; gender: string }) => void;
};

const Filter: React.FC<FilterProps> = ({ onApplyFilter }) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedEzor, setSelectedEzor] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [ezorOptions, setEzorOptions] = useState<string[]>([]);
    const filterRef = useRef<HTMLDivElement | null>(null);

    // Fetch ezor options dynamically
    useEffect(() => {
        const fetchEzors = async () => {
            try {
                const response = await fetch('http://localhost:3001/users/ezors');
                const data = await response.json();
                setEzorOptions(data.map((ezorObj: { ezor: string }) => ezorObj.ezor));
            } catch (error) {
                console.error('Error fetching ezor options:', error);
            }
        };

        fetchEzors();
    }, []);

    // Close filter when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false);
            }
        };

        if (isFilterOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isFilterOpen]);

    const handleApply = () => {
        onApplyFilter({ ezor: selectedEzor, gender: selectedGender });
        setIsFilterOpen(false);
    };

    const handleReset = () => {
        setSelectedEzor('');
        setSelectedGender('');
        onApplyFilter({ ezor: '', gender: '' });
    };

    return (
        <div className="filter-wrapper">
            {/* Button to toggle filter */}
            <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="filter-button">
                Filter
            </button>

            {/* Filter box */}
            {isFilterOpen && (
                <div ref={filterRef} className="filter-box">
                    <div>
                        <label>Ezor:</label>
                        <select
                            value={selectedEzor}
                            onChange={(e) => setSelectedEzor(e.target.value)}
                        >
                            <option value="">All</option>
                            {ezorOptions.map((ezor, index) => (
                                <option key={index} value={ezor}>
                                    {ezor}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Gender:</label>
                        <select
                            value={selectedGender}
                            onChange={(e) => setSelectedGender(e.target.value)}
                        >
                            <option value="">All</option>
                            <option value="Male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="filter-buttons">
                        <button onClick={handleApply}>Apply</button>
                        <button onClick={handleReset}>Reset</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Filter;
