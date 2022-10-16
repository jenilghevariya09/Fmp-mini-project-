import {
  React,
  useState,
} from 'react'

import {
  // useNavigate,
  // Navigate,
  // useState
  Link,
} from "react-router-dom";
// import useAuth from '../GuardedRoute'

// @mui material components
import Card from "@mui/material/Card";


// FMP Technologies React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { HttpClient } from 'utility/httpclient';
import { setAuthToken } from 'utility/token.utils';

// Redux
// import { useDispatch } from 'react-redux';
// import { login } from './userSlice'


function SignIn() {

  // const dispatch1 = useDispatch()

  const [credentials, setCredentials] = useState({ email: '', password: '', socket_id: 'df' })
  // const navigate = useNavigate();
  const handleOnClick = async (e) => {
    e.preventDefault();
    HttpClient.post("admin/branchlogin", credentials).then((res) => {
      // debugger
      if (res.success==="true") {

        localStorage.setItem("logindata", JSON.stringify(res.payload))
        setAuthToken(res.payload.access_token);
        // dispatch1(login(res.payload))
        // eslint-disable-next-line no-restricted-globals
        location.href = '/';
      }
      else {
        alert("Invalid credentials");
        // console.log('invalid pass')
      }
    })
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1} sx={{ mt: 1, mb: 1 }}>
            Branch Login
          </MDTypography>
        </MDBox>
        <MDBox pt={3} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="email" label="Email" name='email' value={credentials.email} onChange={onChange} fullWidth />
            </MDBox>

            <MDBox mb={2}>
              <MDInput type="password" label="Password" name='password' value={credentials.password} onChange={onChange} fullWidth />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
            </MDBox>

            <MDBox mt={2} mb={1}>
              <MDButton variant="gradient" color="info" onClick={handleOnClick} fullWidth>
                Login
              </MDButton>
            </MDBox>
          </MDBox>
          <Link className='mx-2' style={{ fontSize: '75%'}} to="/adminlogin">Admin Login</Link>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default SignIn;
