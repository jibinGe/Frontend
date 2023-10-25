import { Page, StyleSheet, View, Image, Text } from '@react-pdf/renderer';
import Footer from './Footer';
import DinamicGen from './DinamicGen';
import Chart from '../img/chart.png';

const TowPage = ({ patientData, clinicData, reportData, data }) => {
  return (
    <Page size='A4' style={styles.page}>
      <View style={styles.all}>
        <View style={styles.pargBox}>
          <Text style={styles.paargTitle}>How Genesys ‘Miraclè’ works</Text>
          <Text style={styles.p}>
            Our Advanced AI and proprietary machine learning algorithm can identify very complex and
            intricate features of embryo which indicates its quality, viability and likelihood of
            leading to a successful pregnancy. The AI assesses various complex patterns and
            morphological features which are very difficult for the human eye to see. These various
            factors are combined together to give an overall quality assessment with implantation
            potential score.
          </Text>
        </View>
        <View style={styles.pargBox}>
          <Text style={styles.paargTitle}>What does report tells about your Embryos?</Text>
          <Text style={styles.p}>
            Genesys ‘Miracle’ gives an embryo quality confidence score from 0 to 100.
          </Text>
          <Image src={Chart} />
          <View style={styles.chartText}>
            <View style={styles.oneChartText}>
              <Text style={styles.p}>Less confident that embryo </Text>
              <Text style={styles.p}>might result in pregnancy </Text>
            </View>
            <View style={styles.oneChartText}>
              <Text style={styles.p}>Less confident that embryo </Text>
              <Text style={styles.p}>could result in pregnancy </Text>
            </View>
            <View style={styles.oneChartText}>
              <Text style={styles.p}>More confident that embryo </Text>
              <Text style={styles.p}>could result in pregnancy </Text>
            </View>
          </View>
        </View>
        <View style={styles.pargBox}>
          <Text style={styles.paargTitle}>Genesys Miraclè’s evaluation of your embryos</Text>
          {/* <Image style={{ position: 'absolute', top: 60 }} src={genesys} /> */}
          <DinamicGen data={data} />
        </View>
        <Text style={styles.discrbtion}>
          Disclaimer: The confidence score reflects the confidence of the AI model that the embryo
          may or may not result in clinical pregnancy. It does not provide any information on the
          probability of a live birth. The accuracy of Genesys ‘Miraclè’ prediction does not take
          into account any patient-specific factors that may influence pregnancy outcome.
        </Text>
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
  all: {
    height: '100vh',
    padding: '20px 30px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
  },
  pargBox: {
    flexDirection: 'column',
  },
  paargTitle: {
    padding: '20px 0px',
    fontSize: 18,
    fontWeight: 800,
    color: '#00d2fe',
  },
  p: {
    fontSize: 13,
    fontFamily: 'Helvetica',
  },
  discrbtion: {
    fontSize: 8,
    position: 'absolute',
    bottom: 10,
    color: '#859397',
    lineHeight: 1.7,
  },
  chartText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '0 15px',
  },
  oneChartText: {
    display: 'flex',
    flexDirection: 'column',
    gap: 7,
  },
});
export default TowPage;
