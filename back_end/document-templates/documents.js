const React = require("react");
const {
  Text,
  Page,
  View,
  Document,
  StyleSheet,
} = require("@react-pdf/renderer");

const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#2d3748",
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    color: "#4a5568",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#e2e8f0",
    padding: 4,
  },
  tableCol: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 4,
  },
  tableCellHeader: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableCell: {
    fontSize: 10,
    textAlign: "center",
  },
  dayCell: {
    fontWeight: "bold",
    color: "#2b6cb0",
  },
});

const table_headers = ["Day", "Breakfast", "Lunch", "Dinner", "Exercise"];

const TableHeaderComponent = ({ headers }) =>
  headers.map((header, i) =>
    React.createElement(
      View,
      { style: styles.tableColHeader, key: i },
      React.createElement(Text, { style: styles.tableCellHeader }, header)
    )
  );

const DietRowsComponent = ({ arr }) =>
  arr.map((diet, i) =>
    React.createElement(View, { style: styles.tableRow, key: i }, [
      React.createElement(
        View,
        { style: styles.tableCol, key: "day" },
        React.createElement(
          Text,
          { style: { ...styles.tableCell, ...styles.dayCell } },
          `Day: ${i + 1}`
        )
      ),
      React.createElement(
        View,
        { style: styles.tableCol, key: "breakfast" },
        React.createElement(
          Text,
          { style: styles.tableCell },
          `Breakfast :${diet.breakfast}`
        )
      ),
      React.createElement(
        View,
        { style: styles.tableCol, key: "lunch" },
        React.createElement(
          Text,
          { style: styles.tableCell },
          `Lunch :${diet.lunch}`
        )
      ),

      React.createElement(
        View,
        { style: styles.tableCol, key: "dinner" },
        React.createElement(
          Text,
          { style: styles.tableCell },
          `Dinner :${diet.dinner}`
        )
      ),
      React.createElement(
        View,
        { style: styles.tableCol, key: "exercise" },
        React.createElement(
          Text,
          { style: styles.tableCell },
          `Exercise :${diet.exercise}`
        )
      ),
    ])
  );

const DietDocument = ({ diets }) =>
  React.createElement(
    Document,
    null,
    React.createElement(
      Page,
      { size: "A4", style: styles.page },
      React.createElement(
        Text,
        { style: styles.subtitle },
        "Weight.Tracker\n7-Day Diet Meal Plan"
      ),
      
      React.createElement(
        View,
        { style: styles.table },
        React.createElement(
          View,
          { style: styles.tableRow },
          React.createElement(TableHeaderComponent, { headers: table_headers })
        )
      ),
      React.createElement(DietRowsComponent, { arr: diets })
    )
  );

module.exports = DietDocument;
