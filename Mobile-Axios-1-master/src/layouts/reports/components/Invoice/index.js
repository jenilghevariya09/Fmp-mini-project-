// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { HttpClient } from "../../../../utility/httpclient";
import React from "react";
import { useState, useEffect } from 'react'
import exportFromJSON from 'export-from-json'  
import jsPDF from 'jspdf'; 
import 'jspdf-autotable';
import CsvDownload from 'react-json-to-csv'

//Spredsheet file name and export type
const fileName = 'Ledger spredsheet'  
const exportType = 'xls'  

function Invoice({ date, id, price, noGutter }) {
  const [mrpStock, setMrpStock] = useState([]);
  const getData = () => {
    HttpClient.post(`/admin/ledgerlist`).then((res) => {
      setMrpStock(res.data);
    });
  }
  useEffect(() => {
    getData()
  }, [])

// eslint-disable-next-line
  const columns = [
    {
      field: "id",
      headerName: "Transection ID",
      width: 150,
      headerAlign: "center",
      renderCell: (cellValues) => {
        return (
          <div style={{ fontSize: 16, width: "100%", textAlign: "center" }}>
            {cellValues.value}
          </div>
        );
      },
    },
    {
      field: "created_date",
      headerName: "Date",
      width: 92,
      renderCell: (cellValues) => {
        return (
          <div style={{ fontSize: 16, width: "100%", textAlign: "center" }}>
            {cellValues.value}
          </div>
        );
      },
    },
    {
      field: "Coustmer_name",
      headerName: "Coustmer Name",
      width: 150,
      headerAlign: "center",
      renderCell: (cellValues) => {
        return (
          <div style={{ fontSize: 16, width: "100%", textAlign: "center" }}>
            {cellValues.value}
          </div>
        );
      },
    },
    {
      field: "invoice_no",
      headerName: "Invoice No.",
      width: 150,
      headerAlign: "center",
      renderCell: (cellValues) => {
        return (
          <div style={{ fontSize: 16, width: "100%", textAlign: "center" }}>
            {cellValues.value}
          </div>
        );
      },
    },
    {
      field: "debit_amount",
      headerName: "Debit Amount",
      width: 160,
      headerAlign: "center",
      renderCell: (cellValues) => {
        return (
          <div style={{ fontSize: 16, width: "100%", textAlign: "center" }}>
            {cellValues.value}
          </div>
        );
      },
    },
    {
      field: "credit_amount",
      headerName: "Credit Amount",
      width: 160,
      headerAlign: "center",
      renderCell: (cellValues) => {
        return (
          <div style={{ fontSize: 16, width: "100%", textAlign: "center" }}>
            {cellValues.value}
          </div>
        );
      },
    },
    {
      field: "total_balance",
      headerName: "Total Balance",
      width: 120,
      headerAlign: "center",
      renderCell: (cellValues) => {
        return (
          <div style={{ fontSize: 16, width: "100%", textAlign: "center" }}>
            {cellValues.value}
          </div>
        );
      },
    },
  ]; 

 // Pdf convert
  const print = () => {
    const pdf = new jsPDF("p", "pt", "a4");
  var rows =(mrpStock);
  // eslint-disable-next-line
  var columns = (columns);
  
    pdf.text(235, 40, "Pdf of Digital Ledger");
    pdf.autoTable(columns, rows, {
      startY: 65,
      theme: "grid",
      styles: {
        font: "times",
        halign: "center",
        cellPadding: 3.5,
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
        textColor: [0, 0, 0]
      },
      headStyles: {
        textColor: [0, 0, 0],
        fontStyle: "normal",
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
        fillColor: [166, 204, 247]
      },
      alternateRowStyles: {
        fillColor: [212, 212, 212],
        textColor: [0, 0, 0],
        lineWidth: 0.5,
        lineColor: [0, 0, 0]
      },
      rowStyles: {
        lineWidth: 0.5,
        lineColor: [0, 0, 0]
      },
      tableLineColor: [0, 0, 0]
    });
  
    pdf.save("pdf");
  };
 //Spredsheet convert
  const data = (mrpStock)  
const ExportToExcel = () => {  
  exportFromJSON({ data, fileName, exportType })  
} 


  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={1}
      pr={1}
      mb={noGutter ? 0 : 1}
    >
      <MDBox lineHeight={1.125}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {date}
        </MDTypography>
        <MDTypography variant="caption" fontWeight="regular" color="text">
          {id}
        </MDTypography>
      </MDBox>
      <MDBox display="flex" alignItems="center">
        <MDBox display="flex" alignItems="center" lineHeight={1} ml={3} >

      {/* //Csv Convert */}
            <Icon fontSize="small" sx={{ cursor: "pointer" }}>text_snippet</Icon>&nbsp;
            <CsvDownload 
    data={mrpStock}
    filename="ledger.csv"
    style={{ //pass other props, like styles
      backgroundColor:"#ffffff",
      border:"1px solid #ffffff",
      display:"inline-block",
      cursor:"pointer",
      fontSize:"small",
      fontWeight:"bold",
      color:"#344767",

      textDecoration:"none",

      }}
  >CSV
  </CsvDownload>

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

          <Icon fontSize="small" onClick={ExportToExcel} sx={{ cursor: "pointer" }}>grid_on</Icon>
          <MDTypography variant="button" onClick={ExportToExcel} fontWeight="bold" sx={{ cursor: "pointer" }}>
            &nbsp;Spreadsheet
          </MDTypography>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

          <Icon fontSize="small"  onClick={print} sx={{ cursor: "pointer" }}>picture_as_pdf</Icon>
          <MDTypography variant="button" fontWeight="bold" onClick={print} sx={{ cursor: "pointer" }}>
            &nbsp;PDF
          </MDTypography>

 
  
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Invoice
Invoice.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Invoice
Invoice.propTypes = {
  date: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default Invoice;
