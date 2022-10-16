import "../../App.css";
import { DataGrid } from "@mui/x-data-grid";
import {
} from "@mui/icons-material";
import React, { useState, useEffect } from 'react'
import {
  Box,
  Card,
  Icon,
  Modal,
} from "@mui/material";
import { HttpClient } from "../../utility/httpclient";
import Footer from "examples/Footer";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import {
  useMaterialUIController,
  // mrpStockContext,
} from "context";
const BranchItem = (noGutter) => {
  const [mrpStock, setMrpStock] = useState([]);
  const [activeStock, setActiveStock] = useState({});

  // Get Data
  const getData = () => {
    HttpClient.post(`/admin/brancheslist`).then((res) => {
      setMrpStock(res.data);
    });
  }
  useEffect(() => {
    getData()
  }, [])

  // Add Data
  // const [addMrpStock, setAddMrpStock] = useState({ branch_name: '', contact_name: '', display_name: '', gstno: '', contact_mobile: '' })
  const handleOnChange = (e) => {
    const value = e.target.value
    setActiveStock({ ...activeStock, [e.target.name]: value })
    //  
  }

  const handleOnSave = (e) => {
    //  
    e.preventDefault()

    const mrpStockData = {
      branch_name: activeStock.branch_name,
      contact_name: activeStock.contact_name,
      display_name: activeStock.display_name,
      gstno: activeStock.gstno,
      contact_mobile: activeStock.contact_mobile,
      work_phone: activeStock.work_phone,
      address: activeStock.address
    }
    HttpClient.post(`/admin/branches`, mrpStockData).then((res) => {

      getData()
    })
  }

  // Edit Stock
  const handleEdit = (row) => {
    const edata = {
      branch_name: row.branch_name,
      contact_name: row.contact_name,
      display_name: row.display_name,
      gstno: row.gstno,
      contact_mobile: row.contact_mobile,
      work_phone: row.work_phone,
      address: row.address
    }

    HttpClient.post(`/admin/branchesupdate/${row.id}`, edata).then((res) => {
      getData()
    });
  }

  // Delete Stock
  const handleOnDelete = (id) => {
    HttpClient.post(`/admin/branchesdelete/${id}`).then((res) => {
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
    left: '70%',
    transform: 'translate(-50%, -50%)',
    width: 450,
  };

  const columns = [
    {
      field: "branch_name",
      headerName: "Branch Name",
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
      field: "contact_name",
      headerName: "Contact Name",
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
      field: "display_name",
      headerName: "Display Name",
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
      field: "gstno",
      headerName: "GST No.",
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
      field: "contact_mobile",
      headerName: "Contact Mobile",
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
      field: "work_phone",
      headerName: "Work Phone",
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
      field: "address",
      headerName: "Address",
      width: 140,
      renderCell: (cellValues) => {
        return (
          <div style={{ fontSize: 16, width: "100%", textAlign: "center" }}>
            {cellValues.value}
          </div>
        );
      },
    },
    // {
    //   field: "contact_name",
    //   headerName: "Mobile No.",
    //   width: 130,
    //   headerAlign: "center",
    //   renderCell: (cellValues) => {
    //     return (
    //       <div style={{ fontSize: 16, width: "100%", textAlign: "center" }} >
    //         {cellValues.value}
    //       </div>
    //     );
    //   },
    // },
    // {
    //   field: "display_name",
    //   headerName: "Model No.",
    //   width: 140,
    //   headerAlign: "center",
    //   renderCell: (cellValues) => {
    //     return (
    //       <div style={{ fontSize: 16, width: "100%", textAlign: "center" }}>
    //         {cellValues.value}
    //       </div>
    //     );
    //   },
    // },
    // {
    //   field: "gstno",
    //   headerName: "IMEI No.",
    //   width: 150,
    //   headerAlign: "center",
    //   renderCell: (cellValues) => {
    //     return (
    //       <div style={{ fontSize: 16, width: "100%", textAlign: "center" }}>
    //         {cellValues.value}
    //       </div>
    //     );
    //   },
    // },
    // {
    //   field: "contact_mobile",
    //   headerName: "Purchase Price",
    //   width: 125,
    //   headerAlign: "center",
    //   renderCell: (cellValues) => {
    //     return (
    //       <div style={{ fontSize: 16, width: "100%", textAlign: "center" }}>
    //         {cellValues.value}
    //       </div>
    //     );
    //   },
    // },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 205,
      renderCell: (params) => {
        return (
          <div style={{ fontSize: 16, width: "100%", textAlign: "center" }}>
            <div className="action">
              <MDButton variant="text" color={darkMode ? "white" : "dark"} onClick={() => { handleOpenModal(params) }} >
                <Icon>edit</Icon>&nbsp;edit
              </MDButton>
              <MDButton variant="text" title='Delete mrpStock' color="error" onClick={() => handleOnDelete(params.row.id)}>
                <Icon>delete</Icon>&nbsp;delete
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
                        Edit Branch
                      </MDTypography>
                    </MDBox>
                    <MDBox pt={3} pb={3} px={3} color="white" >
                      <MDBox >
                        <MDBox mb={2} >
                          <MDTypography variant="subtitle2" fontWeight='regular' >Branch Name:</MDTypography>
                          <MDInput type="text" value={activeStock.branch_name} id="branch_name" name="branch_name" onChange={handleOnChange} required fullWidth />
                        </MDBox>
                        <MDBox mb={2}>
                          <MDTypography variant="subtitle2" fontWeight='regular' >Contact Name:</MDTypography>
                          <MDInput type="text" value={activeStock.contact_name} id="contact_name" name="contact_name" onChange={handleOnChange} required fullWidth />
                        </MDBox>
                        <MDBox mb={2}>
                          <MDTypography variant="subtitle2" fontWeight='regular' >Display Name:</MDTypography>
                          <MDInput type="text" value={activeStock.display_name} id="display_name" name="display_name" onChange={handleOnChange} required fullWidth />
                        </MDBox>
                        <MDBox mb={2}>
                          <MDTypography variant="subtitle2" fontWeight='regular' >GST No.:</MDTypography>
                          <MDInput type="text" value={activeStock.gstno} id="gstno" name="gstno" onChange={handleOnChange} required fullWidth />
                        </MDBox>
                        <MDBox mb={2}>
                          <MDTypography variant="subtitle2" fontWeight='regular' >Contact Mobile:</MDTypography>
                          <MDInput type="text" value={activeStock.contact_mobile} id="contact_mobile" name="contact_mobile" onChange={handleOnChange} required fullWidth />
                        </MDBox>
                        <MDBox mb={2}>
                          <MDTypography variant="subtitle2" fontWeight='regular' >Work Phone:</MDTypography>
                          <MDInput type="text" value={activeStock.work_phone} id="work_phone" name="work_phone" onChange={handleOnChange} required fullWidth />
                        </MDBox>
                        <MDBox mb={2}>
                          <MDTypography variant="subtitle2" fontWeight='regular' >Address:</MDTypography>
                          <MDInput type="text" value={activeStock.address} id="address" name="address" onChange={handleOnChange} required fullWidth />
                        </MDBox>
                      </MDBox>
                      <MDBox onClick={handleCloseModal}>
                        <MDButton variant="gradient" onClick={() => handleEdit(activeStock)} color="info" fullWidth>
                          Update Branch
                        </MDButton>
                      </MDBox>
                    </MDBox>
                  </div>
                </Box>
              </Modal>

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
                      <div className="">Branch Management</div>
                      <MDButton type="button" className="btn btn-primary " variant="gradient" color='light' data-bs-toggle="modal" data-bs-target="#exampleModal" >Add Branch</MDButton>
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
                                    Add Branch
                                  </MDTypography>
                                </MDBox>
                                <MDBox pt={3} pb={3} px={3} color="white">
                                  {/* <MDBox > */}
                                    <MDBox mb={2}>
                                      <MDInput type="text" label="Branch Name" value={mrpStock.branch_name} id="branch_name" name="branch_name" onChange={handleOnChange} required fullWidth />
                                    </MDBox>
                                    <MDBox mb={2}>
                                      <MDInput type="text" label="Contact Name" value={mrpStock.contact_name} id="contact_name" name="contact_name" onChange={handleOnChange} required fullWidth />
                                    </MDBox>
                                    <MDBox mb={2}>
                                      <MDInput type="text" label="Display Name" value={mrpStock.display_name} id="display_name" name="display_name" onChange={handleOnChange} required fullWidth />
                                    </MDBox>
                                    <MDBox mb={2}>
                                      <MDInput type="text" label="GST No." value={mrpStock.gstno} id="gstno" name="gstno" onChange={handleOnChange} required fullWidth />
                                    </MDBox>
                                    <MDBox mb={2}>
                                      <MDInput type="text" label="Contact Mobile" value={mrpStock.contact_mobile} id="contact_mobile" name="contact_mobile" onChange={handleOnChange} required fullWidth />
                                    </MDBox>
                                    <MDBox mb={2}>
                                      <MDInput type="text" label="Work Phone" value={mrpStock.work_phone} id="work_phone" name="work_phone" onChange={handleOnChange} required fullWidth />
                                    </MDBox>
                                    <MDBox mb={2}>
                                      <MDInput type="text" label="Address" value={mrpStock.address} id="address" name="address" onChange={handleOnChange} required fullWidth />
                                    </MDBox>
                                    <MDButton variant="gradient" onClick={handleOnSave} color="info" data-bs-dismiss="modal" fullWidth>
                                      Add Branch
                                    </MDButton>
                                  {/* </MDBox> */}
                                </MDBox>
                              </Card>
                            </form>
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

export default BranchItem;