import { Page, StyleSheet, View, Image, Text,Font  } from '@react-pdf/renderer';
import Footer from './Footer';
import backGround from '../img/background.png';
import Logo1 from '../img/logo1.png';
import Motherbg1 from '../img/motherbg1.png';
import Wave from '../img/wave.svg';
const OnePage = ({ patientData, clinicData, reportData }) => {
  Font.register({
    family: 'Inter',
    src: '/Inter-Regular.ttf',  // Adjust the path as necessary
  });
  return (
    <Page size='A4' style={styles.page} wrap>
      <View style={styles.Img}>
        <Image style={styles.bg} src={backGround} />
        <View style={styles.oneImg}>
          <Image src={Logo1} />
          <Image style={styles.mainImg} src={Motherbg1} />
        </View>
        <View style={styles.title}>
          <Text>Artificial Intelligence enabled embryo selection for</Text>
          <Text>high IVF success rate</Text>
        </View>
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
    alignItems: 'center',
  },
  Img: {
    height: '80vh',
    width: '100%',
    position: 'relative',
    display: 'flex',
    // justifyContent: 'space-evenly',
  },
  mainImg: {
    flexBasis: 650,
  },
  bg: {
    position: 'absolute',
    left: 0,
    height: '80vh',
    width: '100%',
    zIndex: 3,
  },

  oneImg: {
    padding: 30,
    height: '85vh',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    verticalAlign: 'top',
    fontSize: '16px',
    fontFamily: 'Inter',
    lineHeight: '30%',
    color: '#010a18',
  },
});
export default OnePage;
