 // Data for the bar chart
 var data = [
    { year: 1924, gold: 2, silver: 0, bronze: 1, ranking: "4e" },
    { year: 1928, gold: 0, silver: 0, bronze: 1, ranking: "8e" },
    { year: 1932, gold: 0, silver: 1, bronze: 0, ranking: "8e" },
    { year: 1936, gold: 1, silver: 2, bronze: 0, ranking: "5e" },
    { year: 1948, gold: 3, silver: 4, bronze: 3, ranking: "3e" },
    { year: 1952, gold: 0, silver: 0, bronze: 2, ranking: "11e" },
    { year: 1956, gold: 3, silver: 2, bronze: 1, ranking: "4e" },
    { year: 1960, gold: 2, silver: 0, bronze: 0, ranking: "8e" },
    { year: 1964, gold: 0, silver: 0, bronze: 0, ranking: "15e" },
    { year: 1968, gold: 0, silver: 2, bronze: 4, ranking: "14e" },
    { year: 1972, gold: 4, silver: 3, bronze: 3, ranking: "3e" },
    { year: 1976, gold: 1, silver: 3, bronze: 1, ranking: "8e" },
    { year: 1980, gold: 1, silver: 1, bronze: 3, ranking: "10e" },
    { year: 1984, gold: 2, silver: 2, bronze: 1, ranking: "7e" },
    { year: 1988, gold: 5, silver: 5, bronze: 5, ranking: "3e" },
    { year: 1992, gold: 1, silver: 0, bronze: 2, ranking: "14e" },
    { year: 1994, gold: 3, silver: 4, bronze: 2, ranking: "8e" },
    { year: 1998, gold: 2, silver: 2, bronze: 3, ranking: "12e" },
    { year: 2002, gold: 3, silver: 2, bronze: 6, ranking: "11e" },
    { year: 2006, gold: 5, silver: 4, bronze: 5, ranking: "8e" },
    { year: 2010, gold: 6, silver: 0, bronze: 3, ranking: "6e" },
    { year: 2014, gold: 7, silver: 2, bronze: 2, ranking: "7e" },
    { year: 2018, gold: 5, silver: 6, bronze: 4, ranking: "8e" },
    { year: 2022, gold: 7, silver: 2, bronze: 6, ranking: "8e" }
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


// Create a bar chart for each year
filteredData.forEach(function(yearData) {
    var chartRow = chartContainer.append("div").attr("class", "bar-chart");

    var rank = chartRow.append("div").attr("class", "bar-chart__rank").text(yearData.ranking);

    var label = chartRow.append("div").attr("class", "bar-chart__label").text(yearData.year);

    var silverBar = chartRow.append("div").attr("class", "bar-chart__bar bar-chart__bar--silver");

    var silverValue = silverBar.append("div").attr("class", "bar-chart__value").text(yearData.silver);

    var goldBar = chartRow.append("div").attr("class", "bar-chart__bar bar-chart__bar--gold");

    var goldValue = goldBar.append("div").attr("class", "bar-chart__value").text(yearData.gold);

    var bronzeBar = chartRow.append("div").attr("class", "bar-chart__bar bar-chart__bar--bronze");

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
