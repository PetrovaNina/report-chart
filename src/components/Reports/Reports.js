import { Box, Container, FormHelperText } from "@material-ui/core";
import ReportCard from "./ReportCard/ReportCard";

const Reports = () => (
  <Container fixed style={{ maxWidth: "1120px", padding: "32px" }}>
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: "30px", justifyContent: "center" }}>
      <ReportCard />
      <ReportCard />
      <ReportCard />
      <ReportCard />
    </Box>
  </Container>
);

export default Reports;
