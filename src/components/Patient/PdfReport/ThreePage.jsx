import { Page, StyleSheet, View, Image, Text } from '@react-pdf/renderer';
import Footer from './Footer';
import backGround from '../img/background.png';
import Logo1 from '../img/logo1.png';
import Motherbg1 from '../img/motherbg1.png';
import OneEmbryo from './OneEmbryo';

const ThreePage = ({ patientData, clinicData, reportData, embryos, ind }) => {
  return (
    <Page size='A4' style={styles.page} key={`threePage-${ind}`}>
      <View style={styles.embryo}>
        <Text style={styles.pageTitle}>How each embryo scored</Text>
        {embryos.map((embryo, embind) => {
          return <OneEmbryo embryo={embryo} embind={embind} patientData={patientData} />;
        })}
      </View>
      <Footer patientData={patientData} clinicData={clinicData} reportData={reportData} />
    </Page>
  );
};

const styles = StyleSheet.create({
  page: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: 30,
    // alignItems: 'center',
  },
  embryo: {
    padding: '20px 30px',
    gap: 30,
  },
  pageTitle: {
    padding: '20px 0px',
    fontSize: 18,
    fontWeight: 800,
    color: '#00d2fe',
  },
});
export default ThreePage;
