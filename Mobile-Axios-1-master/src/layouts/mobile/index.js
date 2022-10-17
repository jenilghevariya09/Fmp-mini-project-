import "../../App.css";
import { DropzoneArea } from 'mui-file-dropzone';
import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect } from 'react'
import {

  Card,
  Icon,

} from "@mui/material";
import { HttpClient } from "../../utility/httpclient";
import Footer from "examples/Footer";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import {
  useMaterialUIController,
} from "context";

import MDInput from "components/MDInput";
import exportFromJSON from 'export-from-json'  
import jsPDF from 'jspdf'; 
import 'jspdf-autotable';
import CsvDownload from 'react-json-to-csv'



const fileName = 'Ledger spredsheet'  
const exportType = 'xls'  



const Ledger = (noGutter) => {
  const [mrpStock, setMrpStock] = useState([]);
  const [activeStock, setActiveStock] = useState({});

  const [isActive, setIsActive] = React.useState(false)
 
  function changeFileStatus() {
    setIsActive(prevState => !prevState)
} 

  // Get Data
  const getData = () => {
    HttpClient.post(`/admin/ledgerlist`).then((res) => {
      setMrpStock(res.data);
    });
  }
  useEffect(() => {
    getData()
  }, [])

  // Add Data
  const handleOnChange = (e) => {
    const value = e.target.value
    setActiveStock({ ...activeStock, [e.target.name]: value })
  }

  const handleOnSave = (e) => {
    e.preventDefault()
    const ledgerData = {
      Coustmer_name: activeStock.Coustmer_name,
      invoice_no: activeStock.invoice_no,
      debit_amount: activeStock.debit_amount,
      credit_amount: activeStock.credit_amount,
      total_balance: activeStock.total_balance
    }

    HttpClient.post(`/admin/ledger`, ledgerData).then((res) => {
      getData()
    })
  }

  

  // Delete Stock
  const handleOnDelete = (id) => {
    HttpClient.post(`/admin/ledgerdelete/${id}`).then((res) => {
      setMrpStock(mrpStock.filter((item) => item.id !== id));
      getData()
    });
  }

  const [controller] = useMaterialUIController();
  const { darkMode } = controller;


// eslint-disable-next-line
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
  };
 
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
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 150,
      renderCell: (params) => {
        return (
          <div style={{ fontSize: 16, width: "100%", textAlign: "center" }}>
            <div className="action">
        
              
              <MDButton variant="text" title='Delete oldMobile' color="error" onClick={() => handleOnDelete(params.row.id)}>
                <Icon>delete</Icon>&nbsp;delete
              </MDButton>
            </div>
          </div >
        );
      },
    },
  ];


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
const data = (mrpStock)  
const ExportToExcel = () => {  
  exportFromJSON({ data, fileName, exportType })  
}  

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={3}
                  mt={-3}
                  py={3}
                  px={3}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    <div className="d-flex justify-content-between align-items-center" >
                      <div className="" >Digital Ledger</div>
                      <div className="" style={{float: 'right'}} >
                      <MDButton onClick={changeFileStatus} type="button" className="btn btn-primary " style={{marginRight: '15px'}} variant="gradient" color="light">{isActive?"Cancel":"Add File"}</MDButton>


                      <MDButton type="button" className="btn btn-primary " style={{marginRight: '15px'}} variant="gradient" color="light" data-bs-toggle="modal" data-bs-target="#exampleModal" >Upload Ledger</MDButton>
                      </div>
                    </div>{isActive && <DropzoneArea dropzoneText='Drag and drop a file here or click to browse from your device' dropzoneClass='dropzoneBody' dropzoneParagraphClass="dropzone-text"/> || <MDButton type="button" className="btn btn-primary " style={{marginRight: '15px'}} variant="gradient" color="light" data-bs-toggle="modal" data-bs-target="#exampleModal" >Upload Ledger</MDButton>}
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-body">
                            <form>
                              <Card>
                                <MDBox
                                  variant="gradient"
                                  bgColor="info"
                                  borderRadius="lg"
                                  coloredShadow="info"
                                  mx={1}
                                  mt={-3}
                                  p={2}
                                  textAlign="center"
                                >
                                  <MDTypography variant="h4" fontWeight="medium" color="white" mt={1} sx={{ mt: 1, mb: 1 }}>
                                    Upload Ledger
                                  </MDTypography>
                                </MDBox>
                                <MDBox pt={3} pb={3} px={3}>
                                  <MDBox >
                                    <MDBox mb={2}>
                                      <MDInput type="text" label="Party Name" value={mrpStock.Coustmer_name} id="Coustmer_name" name="Coustmer_name" onChange={handleOnChange} required fullWidth />
                                    </MDBox>
                                    <MDBox mb={2}>
                                      <MDInput type="number" label="Mobile No." value={mrpStock.invoice_no} id="invoice_no" name="invoice_no" onChange={handleOnChange} required fullWidth />
                                    </MDBox>
                                    <MDBox mb={2}>
                                      <MDInput type="text" label="Bill Details" value={mrpStock.debit_amount} id="debit_amount" name="debit_amount" onChange={handleOnChange} required fullWidth />
                                    </MDBox>
                                    <MDBox mb={2}>
                                      <MDInput type="text" label="ID Proof Details" value={mrpStock.credit_amount} id="credit_amount" name="credit_amount" onChange={handleOnChange} required fullWidth />
                                    </MDBox>
                                    <MDBox mb={2}>
                                      <MDInput type="text" label="Model No." value={mrpStock.total_balance} id="total_balance" name="total_balance" onChange={handleOnChange} required fullWidth />
                                    </MDBox>
                                    
                                    <MDBox display="flex" alignItems="center" ml={-1}>
                                    </MDBox>
                                  </MDBox>
                                </MDBox>
                              </Card>
                            </form>
                            <MDBox mt={3} mb={1}>
                              <MDButton variant="gradient" onClick={handleOnSave} color="info" data-bs-dismiss="modal" fullWidth>
                                Upload Ledger
                              </MDButton>
                            </MDBox>
                          </div>
                        </div>
                      </div>
                    </div>
                  </MDTypography>
                </MDBox>
                <div className="" style={{marginInline: '1.5%', width: "100%", marginTop: '1%'}} >
                <MDButton  type="button" className="btn btn-primary " variant="gradient" color="info" style={{marginRight: '15px'}} onClick={print} > <Icon onClick={print} fontSize="small" sx={{ cursor: "pointer" }}>picture_as_pdf</Icon>&nbsp; PDF
                </MDButton>
      
               
                <MDButton  type="button" className="btn btn-primary " variant="gradient" color="info" style={{marginRight: '15px'}} onClick={ExportToExcel} ><Icon fontSize="small"  onClick={ExportToExcel} sx={{ cursor: "pointer" }}>grid_on</Icon>&nbsp; Spredsheet
                </MDButton>

     

        
                  <CsvDownload 
    data={mrpStock}
    filename="ledger.csv"
    style={{ //pass other props, like styles
      boxShadow: "0rem 0.25rem 1.25rem 0rem rgb(0 0 0 / 14%), 0rem 0.4375rem 0.625rem -0.3125rem rgb(0 187 212 / 40%)",
      background:"linear-gradient(195deg, #49a3f1, #1A73E8)",
      borderRadius:"0.5rem",
      border:"1px solid #49a3f1",
      display:"inline-block",
      cursor:"pointer",
      fontSize:"15px",
      fontWeight:"bold",
      color:"#ffffff",
      padding:"6px 24px",
      textDecoration:"none",
      variant: "gradient"
      }}
  >📁CSV
  </CsvDownload>

  </div>

                <MDBox
                  component="li"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  bgColor={darkMode ? "transparent" : "grey-100"}
                  borderRadius="lg"
                  p={3}
                  mb={noGutter ? 0 : 1}
                  mt={2}
                >
                

     
                  <div className="datagrid"  >
                    <DataGrid className="datagrid"
                      sx={{
                        "& .MuiDataGrid-columnHeaderTitleContainer": {
                          display: "flex",
                          justifyContent: "center",
                        },
                      }}
                      rows={mrpStock}
                      disableSelectionOnClick
                      columns={columns}
                      getRowId={(row) => row.id}
                      pageSize={10}
                      rowsPerPageOptions={[10]}
                    // checkboxSelection

                    />
                  </div>
               
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
        <Footer />
      </DashboardLayout>
    </>
  );
}

export default Ledger;