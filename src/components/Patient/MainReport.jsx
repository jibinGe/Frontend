import { StyleSheet, Document } from '@react-pdf/renderer';
import OnePage from './PdfReport/onePage';
import TowPage from './PdfReport/TowPage';
import ThreePage from './PdfReport/ThreePage';
import LastPage from './PdfReport/LastPage';
const MainReport = ({ patientData, clinicData, reportData, data }) => {
 

  return (
    <Document style={styles.document}>
      <OnePage patientData={patientData} clinicData={clinicData} reportData={reportData} />
      <TowPage
        patientData={patientData}
        clinicData={clinicData}
        reportData={reportData}
        data={data}
      />

      {data.map((embryos, ind) => {
        return (
          <ThreePage
            ind={ind}
            patientData={patientData}
            clinicData={clinicData}
            reportData={reportData}
            embryos={embryos}
          />
        );
      })}
      <LastPage />
    </Document>
  );
};

const styles = StyleSheet.create({
  document: {
    width: '100%',
    display: 'flex',
    fontFamily: 'Helvetica-Bold',
  },
  page: {
    position: 'relative',
  },
});
export default MainReport;
