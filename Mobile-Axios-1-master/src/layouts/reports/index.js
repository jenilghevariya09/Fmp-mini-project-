// @mui material components
import Grid from "@mui/material/Grid";

// FMP Technologies React components
import MDBox from "components/MDBox";

// FMP Technologies React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import MasterCard from "examples/Cards/MasterCard";
// import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Billing page components
// import PaymentMethod from "layouts/billing/components/PaymentMethod";
import Invoices from "layouts/reports/components/Invoices";
// import BillingInformation from "layouts/billing/components/BillingInformation";
// import Transactions from "layouts/billing/components/Transactions";

function Reports() {
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox mt={3}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item lg={12}>
              <Invoices />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Grid>
        <Footer />
      </Grid>
    </DashboardLayout>
  );
}

export default Reports;
