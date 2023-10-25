import { Page, StyleSheet, View, Image, Text } from '@react-pdf/renderer';
import lastPage from '../img/lastPage.png';

const LastPage = ({ patientData, clinicData, reportData }) => {
  return (
    <Page size='A4' style={styles.page}>
      <View style={styles.ImgBox}>
        <Image style={styles.Img} src={lastPage} />
      </View>
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
  ImgBox: {
    width: '100%',
    height: '100vh',
  },
});
export default LastPage;
