// Type definitions
interface BackendTransaction {
  amount: number;
  created_at: string;
  status?: string;
}

interface WeeklyChartData {
  week: string;
  amount: number;
}

interface MonthlyChartData {
  month: string;
  amount: number;
}

// Transform data for MONTHLY view (by weeks)

export function transformToWeeklyChartData(backendData: BackendTransaction[]) {
  // Get the current week's date range (Monday to Sunday)
  const today = new Date();
  const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay; // Adjust for Sunday

  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset);
  monday.setHours(0, 0, 0, 0);

  // Initialize chart data with days of the week
  const rawChartData = [
    { day: "Mon", amount: 0 },
    { day: "Tue", amount: 0 },
    { day: "Wed", amount: 0 },
    { day: "Thu", amount: 0 },
    { day: "Fri", amount: 0 },
    { day: "Sat", amount: 0 },
    { day: "Sun", amount: 0 },
  ];

  // Process backend data
  backendData.forEach(transaction => {
    const transactionDate = new Date(transaction.created_at);
    const dayOfWeek = transactionDate.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // Convert Sunday (0) to index 6, and Monday-Saturday (1-6) to indices 0-5
    const chartIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    // Add amount to the corresponding day (convert to cents if needed)
    rawChartData[chartIndex].amount += Math.round(
      transaction.status === "completed" ? transaction.amount : 0
    );
  });
  // setChartData(rawChartData);
  return rawChartData;
}

export function transformToMonthlyChartData(
  backendData: BackendTransaction[], 
  year: number, 
  month: number
): WeeklyChartData[] {
  // Get number of weeks in the specified month
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  
  // Calculate number of weeks in month
  const firstWeek = getWeekOfMonth(firstDay);
  const lastWeek = getWeekOfMonth(lastDay);
  const totalWeeks = lastWeek;
  
  // Initialize chart data with weeks
  const chartData: WeeklyChartData[] = [];
  for (let i = 1; i <= totalWeeks; i++) {
    chartData.push({ week: `Week ${i}`, amount: 0 });
  }
  
  // Process backend data
  backendData.forEach(transaction => {
    const transactionDate = new Date(transaction.created_at);
    const transactionYear = transactionDate.getFullYear();
    const transactionMonth = transactionDate.getMonth() + 1;
    
    // Only process transactions from the specified month/year
    if (transactionYear === year && transactionMonth === month) {
      const weekOfMonth = getWeekOfMonth(transactionDate);
      if (weekOfMonth <= totalWeeks) {
        chartData[weekOfMonth - 1].amount += Math.round(transaction.status === "completed" ? transaction.amount  : 0);
      }
    }
  });
  
  return chartData;
}

// Helper function to get week number within a month
function getWeekOfMonth(date: Date): number {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDayOfWeek = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  // Adjust for Monday as first day of week
  const adjustedFirstDay = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  const dayOfMonth = date.getDate();
  
  return Math.ceil((dayOfMonth + adjustedFirstDay) / 7);
}

// Transform data for YEARLY view (by months)
export function transformToYearlyChartData(
  backendData: BackendTransaction[], 
  year: number
): MonthlyChartData[] {
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  
  // Initialize chart data with all months
  const chartData: MonthlyChartData[] = monthNames.map(month => ({
    month,
    amount: 0
  }));
  
  // Process backend data
  backendData.forEach(transaction => {
    const transactionDate = new Date(transaction.created_at);
    const transactionYear = transactionDate.getFullYear();
    
    // Only process transactions from the specified year
    if (transactionYear === year) {
      const monthIndex = transactionDate.getMonth(); // 0 = January, 1 = February, etc.
      chartData[monthIndex].amount += Math.round(transaction.status === "completed" ? transaction.amount  : 0);
    }
  });
  
  return chartData;
}

// Alternative monthly function using calendar weeks (Sunday-Saturday)
function transformToMonthlyChartDataCalendarWeeks(
  backendData: BackendTransaction[], 
  year: number, 
  month: number
): WeeklyChartData[] {
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  
  // Find first Sunday of or before the month
  const firstSunday = new Date(firstDay);
  firstSunday.setDate(firstDay.getDate() - firstDay.getDay());
  
  // Calculate number of weeks needed
  const totalDays = Math.ceil((lastDay.getTime() - firstSunday.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const totalWeeks = Math.ceil(totalDays / 7);
  
  const chartData: WeeklyChartData[] = [];
  for (let i = 1; i <= totalWeeks; i++) {
    chartData.push({ week: `Week ${i}`, amount: 0 });
  }
  
  backendData.forEach(transaction => {
    const transactionDate = new Date(transaction.created_at);
    const transactionYear = transactionDate.getFullYear();
    const transactionMonth = transactionDate.getMonth() + 1;
    
    if (transactionYear === year && transactionMonth === month) {
      const daysDiff = Math.floor((transactionDate.getTime() - firstSunday.getTime()) / (1000 * 60 * 60 * 24));
      const weekIndex = Math.floor(daysDiff / 7);
      
      if (weekIndex >= 0 && weekIndex < totalWeeks) {
        chartData[weekIndex].amount += Math.round(transaction.amount * 100);
      }
    }
  });
  
  return chartData;
}

// Example usage:
const sampleBackendData: BackendTransaction[] = [
  { amount: 3.00, created_at: "2025-05-30T10:37:33.702851+00:00" },  // May, Week 5
  { amount: 25.50, created_at: "2025-05-05T14:20:00.000000+00:00" }, // May, Week 2
  { amount: 12.75, created_at: "2025-05-05T16:45:30.000000+00:00" }, // May, Week 2
  { amount: 60.00, created_at: "2025-03-15T09:15:00.000000+00:00" }, // March, Week 3
  { amount: 45.25, created_at: "2025-01-10T12:30:00.000000+00:00" }  // January, Week 2
];

// Monthly chart data for May 2025
console.log("Monthly (May 2025):");
const monthlyData: WeeklyChartData[] = transformToMonthlyChartData(sampleBackendData, 2025, 5);
console.log(monthlyData);
// Output: [
//   { week: 1, amount: 0 },
//   { week: 2, amount: 3825 }, // 25.50 + 12.75
//   { week: 3, amount: 0 },
//   { week: 4, amount: 0 },
//   { week: 5, amount: 300 }   // 3.00
// ]

// Yearly chart data for 2025
console.log("\nYearly (2025):");
const yearlyData: MonthlyChartData[] = transformToYearlyChartData(sampleBackendData, 2025);
console.log(yearlyData);
// Output: [
//   { month: "Jan", amount: 4525 }, // 45.25
//   { month: "Feb", amount: 0 },
//   { month: "Mar", amount: 6000 }, // 60.00
//   { month: "Apr", amount: 0 },
//   { month: "May", amount: 4125 }, // 3.00 + 25.50 + 12.75
//   { month: "Jun", amount: 0 },
//   // ... etc
// ]