import "../../App.css";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect } from 'react'
import {
  Box,
  Card,
  Icon,
  Modal
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
  useMaterialUIController
} from "context";
import MDInput from "components/MDInput";
const StockTransfer = (noGutter) => {
  const [mrpStock, setMrpStock] = useState([]);
  const [activeStock, setActiveStock] = useState({});

  // Get Data
  const getData = () => {
    HttpClient.post(`/admin/stock_transferlist`).then((res) => {
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
  //   const [addStockTransfer, setAddStockTransfer] = useState({ Branch_name: '', Stock_name: '', Stock_quantity: '' })
  const handleOnSave = (e) => {
    e.preventDefault()
    const stockTransferData = {
      Branch_name: activeStock.Branch_name,
      Stock_name: activeStock.Stock_name,
      Stock_quantity: activeStock.Stock_quantity,
    }

    HttpClient.post(`/admin/stock_transfer`, stockTransferData).then((res) => {
      getData()
    })
  }

  // Edit Stock
  const handleEdit = (row) => {
    const edata = {
      Branch_name: row.Branch_name,
      Stock_name: row.Stock_name,
      Stock_quantity: row.Stock_quantity
    }
    HttpClient.post(`/admin/stock_transferupdate/${row.id}`, edata).then((res) => {
      getData()
    });
  }

  // Delete Stock
  const handleOnDelete = (id) => {
    HttpClient.post(`/admin/stock_transferdelete/${id}`).then((res) => {
      setMrpStock(mrpStock.filter((item) => item.id !== id));
      getData()
    });
  }

  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = (row) => { setOpenModal(true); setActiveStock(row.row); };
  const handleCloseModal = () => setOpenModal(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
  };

  const columns = [
    {
      field: "Branch_name",
      headerName: "Branch Name",
      width: 200,
      renderCell: (cellValues) => {
        return (
          <div style={{ fontSize: 16, width: "100%", textAlign: "center" }}>
            {cellValues.value}
          </div>
        );
      },
    },
    {
      field: "Stock_name",
      headerName: "Stock Name",
      width: 200,
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
      field: "Stock_quantity",
      headerName: "Stock Quantity",
      width: 140,
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
      width: 200,
      renderCell: (params) => {
        return (
          <div style={{ fontSize: 16, width: "100%", textAlign: "center" }}>
            <div className="action">
              <MDButton variant="text" color={darkMode ? "white" : "dark"} onClick={() => { handleOpenModal(params) }} >
                <Icon>edit</Icon>&nbsp;edit
              </MDButton>
              <Modal
                // keepMounted
                open={openModal}
                onClose={handleCloseModal}
                bodyStyle={{ margin: 0, padding: 0 }}
                style={{ width: '200px', marginLeft: '40%', backgroundColor: 'transparent' }}
                titleStyle={{ paddingTop: '0px', paddingLeft: '45px', fontSize: '15px', lineHeight: '40px' }}

              >
                <Box sx={style}
                >
                  {/* <div className="modal-dialog"> */}
                  <div className="modal-content">
                    {/* <div className="modal-body"> */}
                    <MDBox
                      variant="gradient"
                      bgColor="info"
                      borderRadius="lg"
                      coloredShadow="info"
                      mx={1}
                      mt={-5}
                      p={2}
                      textAlign="center"
                    >
                      <MDTypography variant="h4" fontWeight="medium" color="white" mt={1} sx={{ mt: 1, mb: 1 }}>
                        Edit Stock
                      </MDTypography>
                    </MDBox>
                    <MDBox pt={3} pb={3} px={3} color="white" >
                      <MDBox >
                        <MDBox mb={2}>
                          <MDTypography variant="subtitle2" fontWeight='regular' color={darkMode ? "white" : "dark"} >Branch Name:</MDTypography>
                          <MDInput type="text" value={activeStock.Branch_name} id="Branch_name" name="Branch_name" onChange={handleOnChange} required fullWidth />
                        </MDBox>
                        <MDBox mb={2}>
                          <MDTypography variant="subtitle2" fontWeight='regular' color={darkMode ? "white" : "dark"} >Stock Name:</MDTypography>
                          <MDInput type="text" value={activeStock.Stock_name} id="Stock_name" name="Stock_name" onChange={handleOnChange} required fullWidth />
                        </MDBox>
                        <MDBox mb={2}>
                          <MDTypography variant="subtitle2" fontWeight='regular' color={darkMode ? "white" : "dark"} >Stock Quantity:</MDTypography>
                          <MDInput type="number" value={activeStock.Stock_quantity} id="Stock_quantity" name="Stock_quantity" onChange={handleOnChange} required fullWidth />
                        </MDBox>
                      </MDBox>
                      <MDBox onClick={handleCloseModal}>
                        <MDButton variant="gradient" onClick={() => handleEdit(activeStock)} color="info" fullWidth>
                          Update Transfer Stock
                        </MDButton>
                      </MDBox>
                    </MDBox>
                  </div>
                  {/* </div> */}
                  {/* </div> */}
                </Box>
              </Modal>
              <MDButton variant="text" title='Delete StockTransfer' color="error" onClick={() => handleOnDelete(params.row.id)}> {/* onClick={() => { deleteStockTransfer(StockTransfer._id) }} */}
                <Icon>delete</Icon>&nbsp;delete
              </MDButton>
            </div>
          </div>
        );
      },
    },
  ];

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
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="">Stock Transfer</div>
                      <MDButton type="button" className="btn btn-primary " style={{ float: 'right' }} variant="gradient" color="light" data-bs-toggle="modal" data-bs-target="#exampleModal" >Add Stock Transfer</MDButton>
                    </div>
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
                                    Add Stock Transfer
                                  </MDTypography>
                                </MDBox>
                                <MDBox pt={3} pb={3} px={3}>
                                  <MDBox >
                                    <MDBox mb={2}>
                                      <MDInput type="text" label="Brach Name" value={mrpStock.Branch_name} id="Branch_name" name="Branch_name" onChange={handleOnChange} required fullWidth />
                                    </MDBox>
                                    <MDBox mb={2}>
                                      <MDInput type="text" label="Stock Name" value={mrpStock.Stock_name} id="Stock_name" name="Stock_name" onChange={handleOnChange} required fullWidth />
                                    </MDBox>
                                    <MDBox mb={2}>
                                      <MDInput type="number" label="Stock Quantity" value={mrpStock.Stock_quantity} id="Stock_quantity" name="Stock_quantity" onChange={handleOnChange} required fullWidth />
                                    </MDBox>
                                    <MDBox display="flex" alignItems="center" ml={-1}>
                                    </MDBox>
                                  </MDBox>
                                </MDBox>
                              </Card>
                            </form>
                            <MDBox mt={3} mb={1}>
                              <MDButton variant="gradient" onClick={handleOnSave} color="info" data-bs-dismiss='modal' fullWidth>
                                Add Stock Transfer
                              </MDButton>
                            </MDBox>
                          </div>
                        </div>
                      </div>
                    </div>
                  </MDTypography>
                </MDBox>
                <MDBox
                  component="li"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  bgColor={darkMode ? "transparent" : "grey-100"}
                  color={darkMode ? "white" : "dark"}
                  borderRadius="lg"
                  p={3}
                  mb={noGutter ? 0 : 1}
                  mt={2}
                >
                  <div className="datagrid" >
                    <DataGrid className="datagrid" color={darkMode ? "white" : "dark"}
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

export default StockTransfer;