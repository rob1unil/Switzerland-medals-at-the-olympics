// Data for the bar chart
var data = [
    { year: 1896, gold: 1, silver: 2, bronze: 0, ranking: "10e" },
    { year: 1900, gold: 6, silver: 2, bronze: 1, ranking: "5e" },
    { year: 1904, gold: 1, silver: 0, bronze: 1, ranking: "8e" },
    { year: 1908, gold: 0, silver: 0, bronze: 0, ranking: "20e" },
    { year: 1912, gold: 0, silver: 0, bronze: 0, ranking: "19e" },
    { year: 1920, gold: 2, silver: 2, bronze: 7, ranking: "13e" },
    { year: 1924, gold: 7, silver: 8, bronze: 10, ranking: "6e" },
    { year: 1928, gold: 7, silver: 4, bronze: 4, ranking: "6e" },
    { year: 1932, gold: 0, silver: 1, bronze: 0, ranking: "22e" },
    { year: 1936, gold: 1, silver: 9, bronze: 5, ranking: "16e" },
    { year: 1948, gold: 5, silver: 10, bronze: 5, ranking: "9e" },
    { year: 1952, gold: 2, silver: 6, bronze: 6, ranking: "11e" },
    { year: 1956, gold: 0, silver: 0, bronze: 1, ranking: "35e" },
    { year: 1960, gold: 0, silver: 3, bronze: 3, ranking: "24e" },
    { year: 1964, gold: 1, silver: 2, bronze: 1, ranking: "22e" },
    { year: 1968, gold: 0, silver: 1, bronze: 4, ranking: "33e" },
    { year: 1972, gold: 0, silver: 3, bronze: 0, ranking: "26e" },
    { year: 1976, gold: 1, silver: 1, bronze: 2, ranking: "20e" },
    { year: 1980, gold: 2, silver: 0, bronze: 0, ranking: "19e" },
    { year: 1984, gold: 0, silver: 4, bronze: 4, ranking: "26e" },
    { year: 1988, gold: 0, silver: 2, bronze: 2, ranking: "33e" },
    { year: 1992, gold: 1, silver: 0, bronze: 0, ranking: "37e" },
    { year: 1996, gold: 4, silver: 3, bronze: 0, ranking: "18e" },
    { year: 2000, gold: 1, silver: 6, bronze: 2, ranking: "36e" },
    { year: 2004, gold: 1, silver: 1, bronze: 3, ranking: "46e" },
    { year: 2008, gold: 2, silver: 1, bronze: 4, ranking: "33e" },
    { year: 2012, gold: 2, silver: 2, bronze: 0, ranking: "33e" },
    { year: 2016, gold: 3, silver: 2, bronze: 2, ranking: "24e" },
    { year: 2020, gold: 3, silver: 4, bronze: 6, ranking: "24e" }
];

// Function to create the bar chart
function createBarChart(year) {
    var chartContainer = d3.select("#chartContainer");
    chartContainer.html('');

// Filter the data based on the selected year
var filteredData = data;
if (year) {
    filteredData = data.filter(function(item) {
        return item.year === parseInt(year);
    });
}

// Find the maximum value among all categories for the given year
var maxValue = 0;
filteredData.forEach(function(yearData) {
    var values = Object.values(yearData).slice(1); // Extract values for gold, silver, and bronze

    var maxCategoryValue = Math.max(...values);
    if (maxCategoryValue > maxValue) {
        maxValue = maxCategoryValue;
        }
    });

// Create a bar chart for each year
filteredData.forEach(function(yearData) {
    var chartRow = chartContainer.append("div").attr("class", "bar-chart");

    var rank = chartRow.append("div").attr("class", "bar-chart__rank").text(yearData.ranking);

    var label = chartRow.append("div").attr("class", "bar-chart__label").text(yearData.year);

    var silverBar = chartRow.append("div").attr("class", "bar-chart__bar bar-chart__bar--silver");
    silverBar.style("height", (yearData.silver / maxValue * 100) + '%');

    var silverValue = silverBar.append("div").attr("class", "bar-chart__value").text(yearData.silver);

    var goldBar = chartRow.append("div").attr("class", "bar-chart__bar bar-chart__bar--gold");
    goldBar.style("height", (yearData.gold / maxValue * 100) + '%');

    var goldValue = goldBar.append("div").attr("class", "bar-chart__value").text(yearData.gold);

    var bronzeBar = chartRow.append("div").attr("class", "bar-chart__bar bar-chart__bar--bronze");
    bronzeBar.style("height", (yearData.bronze / maxValue * 100) + '%');

    var bronzeValue = bronzeBar.append("div").attr("class", "bar-chart__value").text(yearData.bronze);
    });
}

// Function to populate the dropdown menu with years
function populateYearDropdown() {
    var yearSelect = d3.select("#yearSelect");

// Add options for each year in the data
data.forEach(function(item) {
    yearSelect.append("option").attr("value", item.year).text(item.year);
    });
}

// Function to handle the year selection change event
function updateChart() {
    var yearSelect = d3.select("#yearSelect");
    var selectedYear = yearSelect.property("value");
    createBarChart(selectedYear);
}

// Call the createBarChart function to generate the initial chart
createBarChart(null);

// Populate the dropdown menu with years
populateYearDropdown();

// Attach the updateChart function to the change event of the year select dropdown
d3.select("#yearSelect").on("change", updateChart);