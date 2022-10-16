import "../../App.css";
import './stock.css'
import { DataGrid } from "@mui/x-data-grid";
import {
} from "@mui/icons-material";
import React, { useState, useEffect } from 'react'
import {
  Box,
  Card,
  FormControl,
  Icon,
  InputLabel,
  MenuItem,
  Modal,
  Select,
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
  // mrpStockContext,
} from "context";
import MDInput from "components/MDInput";
const MrpStockItem = (noGutter) => {
  const [mrpStock, setMrpStock] = useState([]);
  // const [putActiveStock, setPutActiveStock] = useState({})
  const [activeStock, setActiveStock] = useState({});

  const [branch, setBranch] = useState(''); //For Dropdown Menu
  const handleChange = (event) => {
    setBranch(event.target.value);
  };

  const [branchNames, setBranchNames] = useState([]);

  // Get Branch Data
  const getBranchData = () => {
    HttpClient.post(`/admin/brancheslist`).then((res) => {
      // debugger
      setBranchNames(res.data);
      // debugger
    });
  }


  // Get Data
  const getData = () => {
    HttpClient.post(`/admin/mrp_stocklist`).then((res) => {
      setMrpStock(res.data);
    });
  }
  useEffect(() => {
    getData()
  }, [])

  // Add Data
  const handleOnChange = (e) => {
    const value = e.target.value
    // getActiveStock({ ...getActiveStock, [e.target.name]: value })
    setActiveStock({ ...activeStock, [e.target.name]: value })
    //  
  }

  const handleOnSave = (e) => {
    //  
    e.preventDefault()

    const mrpStockData = {
      party_name: activeStock.party_name,
      mobile_no: activeStock.mobile_no,
      model_no: activeStock.model_no,
      imei_no: activeStock.imei_no,
      purchase_price: activeStock.purchase_price
    }

    HttpClient.post(`/admin/mrp_stock`, mrpStockData).then((res) => {

      getData()
    })
  }

  // Edit Stock
  const handleEdit = (row) => {
    const edata = {
      party_name: row.party_name,
      mobile_no: row.mobile_no,
      model_no: row.model_no,
      imei_no: row.imei_no,
      purchase_price: row.purchase_price
    }

    HttpClient.post(`/admin/mrp_stockupdate/${row.id}`, edata).then((res) => {
      getData()
    });
  }

  // Delete Stock
  const handleOnDelete = (id) => {
    HttpClient.post(`/admin/mrp_stockdelete/${id}`).then((res) => {
      //  
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
      field: "party_name",
      headerName: "Party Name",
      width: 140,
      renderCell: (cellValues) => {
        return (
          <div style={{ fontSize: 16, width: "100%", textAlign: "center" }}>
            {cellValues.value}
          </div>
        );
      },
    },
    {
      field: "mobile_no",
      headerName: "Mobile No.",
      width: 130,
      headerAlign: "center",
      renderCell: (cellValues) => {
        return (
          <div style={{ fontSize: 16, width: "100%", textAlign: "center" }} >
            {cellValues.value}
          </div>
        );
      },
    },
    {
      field: "model_no",
      headerName: "Model No.",
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
      field: "imei_no",
      headerName: "IMEI No.",
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
      field: "purchase_price",
      headerName: "Purchase Price",
      width: 125,
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
                        <MDBox mb={2} >
                          <MDTypography variant="subtitle2" fontWeight='regular' color={darkMode ? "white" : "dark"} >Party Name:</MDTypography>
                          <MDInput type="text" value={activeStock.party_name} id="party_name" name="party_name" onChange={handleOnChange} required fullWidth />
                        </MDBox>
                        <MDBox mb={2}>
                          <MDTypography variant="subtitle2" fontWeight='regular' color={darkMode ? "white" : "dark"} >Mobile No.:</MDTypography>
                          <MDInput type="number" value={activeStock.mobile_no} id="mobile_no" name="mobile_no" onChange={handleOnChange} required fullWidth />
                        </MDBox>
                        <MDBox mb={2}>
                          <MDTypography variant="subtitle2" fontWeight='regular' color={darkMode ? "white" : "dark"} >Model No.:</MDTypography>
                          <MDInput type="text" value={activeStock.model_no} id="model_no" name="model_no" onChange={handleOnChange} required fullWidth />
                        </MDBox>
                        <MDBox mb={2}>
                          <MDTypography variant="subtitle2" fontWeight='regular' color={darkMode ? "white" : "dark"} >IMEI No.:</MDTypography>
                          <MDInput type="text" value={activeStock.imei_no} id="imei_no" name="imei_no" onChange={handleOnChange} required fullWidth />
                        </MDBox>
                        <MDBox mb={2}>
                          <MDTypography variant="subtitle2" fontWeight='regular' color={darkMode ? "white" : "dark"} >Purchase Price:</MDTypography>
                          <MDInput type="number" value={activeStock.purchase_price} id="purchase_price" name="purchase_price" onChange={handleOnChange} required fullWidth />
                        </MDBox>
                      </MDBox>
                      <MDBox onClick={handleCloseModal}>
                        <MDButton variant="gradient" onClick={() => handleEdit(activeStock)} color="info" fullWidth>
                          Update Stock
                        </MDButton>
                      </MDBox>
                    </MDBox>
                  </div>
                  {/* </div> */}
                  {/* </div> */}
                </Box>
              </Modal>
              <MDButton variant="text" title='Delete mrpStock' color="error" onClick={() => handleOnDelete(params.row.id)}>
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
                      <div className="" style={{ float: 'right' }}>Stock Management</div>
                      <MDButton type="button" className="btn btn-primary " variant="gradient" color='light' data-bs-toggle="modal" data-bs-target="#exampleModal" >Add Stock</MDButton>
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
                                    Add Stock
                                  </MDTypography>
                                </MDBox>
                                <MDBox pt={3} pb={3} px={3} color="white">
                                  <MDBox >
                                    <MDBox mb={2}>
                                      <MDInput type="text" label="Party Name " value={mrpStock.party_name} id="party_name" name="party_name" onChange={handleOnChange} required fullWidth />
                                    </MDBox>
                                    <MDBox mb={2}>
                                      <MDInput type="number" label="Mobile No." value={mrpStock.mobile_no} id="mobile_no" name="mobile_no" onChange={handleOnChange} required fullWidth />
                                    </MDBox>
                                    <MDBox mb={2}>
                                      <MDInput type="text" label="Model No." value={mrpStock.model_no} id="model_no" name="model_no" onChange={handleOnChange} required fullWidth />
                                    </MDBox>
                                    <MDBox mb={2}>
                                      <MDInput type="text" label="IMEI No." value={mrpStock.imei_no} id="imei_no" name="imei_no" onChange={handleOnChange} required fullWidth />
                                    </MDBox>
                                    <MDBox mb={2}>
                                      <MDInput type="number" label="Purchase Price" value={mrpStock.purchase_price} id="purchase_price" name="purchase_price" onChange={handleOnChange} required fullWidth />
                                    </MDBox>
                                  </MDBox>
                                </MDBox>
                              </Card>
                            </form>
                            <MDBox mt={3} mb={1}>
                              <MDButton variant="gradient" onClick={handleOnSave} color="info" data-bs-dismiss="modal" fullWidth>
                                Add Stock
                              </MDButton>
                            </MDBox>
                          </div>
                        </div>
                      </div>
                    </div>
                  </MDTypography>
                </MDBox>
                <div className="mt-3 mx-4">
                  <FormControl sx={{ m: 1, minWidth: 73, height: '43px' }} >
                    <InputLabel id="demo-simple-select-autowidth-label">Branch</InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={branch}
                      onChange={handleChange}
                      autoWidth
                      label="Branch"
                      
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {branchNames.map((branch) => <MenuItem key={branch.id} value={branch.id}>{branch.branch_name} </MenuItem>)}
                    </Select>
                  </FormControl>
                  <MDButton variant="text mt-3" color={darkMode ? "white" : "dark"} >
                    transfer stock &nbsp;<Icon>send</Icon>&nbsp;
                  </MDButton>
                </div>
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
                  <div className="datagrid" onClick={getBranchData}>
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
                      checkboxSelection

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

export default MrpStockItem;