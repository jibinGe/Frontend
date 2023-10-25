import { PDFViewer } from '@react-pdf/renderer';
import './mainReport.css';
import MainReport from './MainReport';
import EmbroData from './data.json';
// Create Document Component
const sliceEmbryoArray = (data) => {
  let newArrayNumber = Math.ceil(data.length / 4);
  let result = [];
  for (let i = 0; i < newArrayNumber; i++) {
    result.push(data.slice(i * 4, (i + 1) * 4));
  }
  return result;
};
const patientData = {
  id: '12341234',
  name: 'Victoria Cameron',
  age: 33,
  DOB: new Date('1989-10-26'),
  retreval: new Date('2022-08-20'),
};
const clinicData = {
  clinicName: 'Test Clinic',
  drName: 'Amy Mathis',
};
const reportData = {
  date: new Date(),
  embryos: '10',
};
const MyDocument = () => (
  <PDFViewer className='pdf-view' showToolbar='true'>
    <MainReport
      patientData={patientData}
      clinicData={clinicData}
      reportData={reportData}
      data={sliceEmbryoArray(EmbroData.embryo_details)}
    />
  </PDFViewer>
);
export default MyDocument;
