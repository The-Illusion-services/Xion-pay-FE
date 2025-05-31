// Date filter utilities for transaction graphs
import { useState, useMemo } from 'react';

type FilterType = 'week' | 'month' | 'year';

interface DateRange {
  startDate: Date;
  endDate: Date;
  formatted: {
    startDate: string;
    endDate: string;
  };
}

interface UseDateFilterResult {
  filterType: FilterType;
  setFilterType: (type: FilterType) => void;
  dateRange: DateRange;
  description: string;
  goToPrevious: () => void;
  goToNext: () => void;
  goToCurrent: () => void;
  referenceDate: Date;
}

/**
 * Get start and end dates based on filter type
 */
const getDateRange = (filterType: FilterType, referenceDate: Date = new Date()): DateRange => {
  const date = new Date(referenceDate);
  let startDate: Date;
  let endDate: Date;

  switch (filterType) {
    case 'week': {
      const dayOfWeek = date.getDay();
      const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

      startDate = new Date(date);
      startDate.setDate(date.getDate() - daysToMonday);
      startDate.setHours(0, 0, 0, 0);

      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 5);
      endDate.setHours(23, 59, 59, 999);
      break;
    }

    case 'month': {
      startDate = new Date(date.getFullYear(), date.getMonth(), 1);
      startDate.setHours(0, 0, 0, 0);

      endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      endDate.setHours(23, 59, 59, 999);
      break;
    }

    case 'year': {
      startDate = new Date(date.getFullYear(), 0, 1);
      startDate.setHours(0, 0, 0, 0);

      endDate = new Date(date.getFullYear(), 11, 31);
      endDate.setHours(23, 59, 59, 999);
      break;
    }

    default:
      throw new Error('Invalid filter type. Use "week", "month", or "year"');
  }

  return {
    startDate,
    endDate,
    formatted: {
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    },
  };
};

/**
 * Format date to YYYY-MM-DD format
 */
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Format date to ISO string
 */
const formatDateISO = (date: Date): string => {
  return date.toISOString();
};

/**
 * Get human-readable date range description
 */
const getDateRangeDescription = (filterType: FilterType, referenceDate: Date = new Date()): string => {
  const { startDate, endDate } = getDateRange(filterType, referenceDate);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  switch (filterType) {
    case 'week':
      return `${startDate.toLocaleDateString('en-US', options)} - ${endDate.toLocaleDateString('en-US', options)}`;
    case 'month':
      return startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    case 'year':
      return `${startDate.getFullYear()}`;
    default:
      return '';
  }
};

/**
 * React hook for managing date filters
 */
const useDateFilter = (initialFilter: FilterType = 'week'): UseDateFilterResult => {
  const [filterType, setFilterType] = useState<FilterType>(initialFilter);
  const [referenceDate, setReferenceDate] = useState<Date>(new Date());

  const dateRange = useMemo(() => getDateRange(filterType, referenceDate), [filterType, referenceDate]);
  const description = useMemo(() => getDateRangeDescription(filterType, referenceDate), [filterType, referenceDate]);

  const goToPrevious = () => {
    const newDate = new Date(referenceDate);

    switch (filterType) {
      case 'week':
        newDate.setDate(newDate.getDate() - 7);
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() - 1);
        break;
      case 'year':
        newDate.setFullYear(newDate.getFullYear() - 1);
        break;
    }

    setReferenceDate(newDate);
  };

  const goToNext = () => {
    const newDate = new Date(referenceDate);

    switch (filterType) {
      case 'week':
        newDate.setDate(newDate.getDate() + 7);
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() + 1);
        break;
      case 'year':
        newDate.setFullYear(newDate.getFullYear() + 1);
        break;
    }

    setReferenceDate(newDate);
  };

  const goToCurrent = () => setReferenceDate(new Date());

  return {
    filterType,
    setFilterType,
    dateRange,
    description,
    goToPrevious,
    goToNext,
    goToCurrent,
    referenceDate,
  };
};

/**
 * Build query string for API
 */
const buildTransactionQuery = (filterType: FilterType, referenceDate: Date = new Date()): string => {
  const { formatted } = getDateRange(filterType, referenceDate);
  const queryParams = new URLSearchParams({
    start_date: formatted.startDate,
    end_date: formatted.endDate
  });
  return queryParams.toString();
};

// Export all utilities
export {
  getDateRange,
  formatDate,
  formatDateISO,
  getDateRangeDescription,
  useDateFilter,
  buildTransactionQuery,
};

