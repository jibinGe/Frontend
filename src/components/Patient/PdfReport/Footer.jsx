import { View, StyleSheet, Text } from '@react-pdf/renderer';
const dateFormat = (date) => {
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
};
const formateDate = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-GB");

  return formattedDate;
};
function calculate_age(dob) {
  dob = new Date(dob);
  var diff_ms = Date.now() - dob.getTime();
  var age_dt = new Date(diff_ms);

  return Math.abs(age_dt.getUTCFullYear() - 1970);
}
const Footer = ({ patientData, clinicData, reportData }) => {
  return (
    <View style={styles.footer}>
      <View style={styles.box}>
        <Text style={styles.h1}>Patient</Text>
        <View style={styles.oneInfBox}>
          <Text style={styles.infTitle}>Patient ID</Text>
          <Text style={styles.inf}>{patientData.id}</Text>
        </View>
        <View style={styles.oneInfBox}>
          <Text style={styles.infTitle}>Name</Text>
          <Text style={styles.inf}>{patientData.name}</Text>
        </View>
        <View style={styles.oneInfBox}>
          <Text style={styles.infTitle}>Age</Text>
          <Text style={styles.inf}>{calculate_age(patientData.DOB)}</Text>
        </View>
        <View style={styles.oneInfBox}>
          <Text style={styles.infTitle}>DOB</Text>
          <Text style={styles.inf}>{formateDate(patientData.DOB)}</Text>
        </View>
        <View style={styles.oneInfBox}>
          <Text style={styles.infTitle}>Retrieval</Text>
          <Text style={styles.inf}>{formateDate(patientData.retreval)}</Text>
        </View>
      </View>
      <View style={styles.box}>
        <Text style={styles.h1}>Clinic</Text>
        <View style={styles.oneInfBox}>
          <Text style={styles.infTitle}>Clinic Name</Text>
          <Text style={styles.inf}>{clinicData.clinicName}</Text>
        </View>
        <View style={styles.oneInfBox}>
          <Text style={styles.infTitle}>Dr. Name</Text>
          <Text style={styles.inf}>{clinicData.drName}</Text>
        </View>
      </View>
      <View style={styles.box}>
        <Text style={styles.h1}>Report</Text>
        <View style={styles.oneInfBox}>
          <Text style={styles.infTitle}>Data</Text>
          <Text style={styles.inf}>{formateDate(reportData.date)}</Text>
        </View>
        <View style={styles.oneInfBox}>
          <Text style={styles.infTitle}>Embryos</Text>
          <Text style={styles.inf}>{reportData.embryos}</Text>
        </View>
        <View style={styles.oneInfBox}>
          <Text style={styles.infTitle}>Page</Text>
          {/* <Text style={styles.inf}>{pageNumber}</Text> */}
          <Text
            style={styles.inf}
            render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
            fixed
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    display: 'felx',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: '20px 25px',
    bottom: 0,
    height: 150,
    backgroundColor: '#e5fbff',
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8, 
  },
  h1: {
    fontSize: 16,
    fontWeight: 'extrabold',
      
  },
  oneInfBox: {
    display: 'flex',
    gap: 30,
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 8,
  },
  infTitle: {
    flexBasis: 60,
    color: '#859397',
  },
  inf: {
    flexBasis: 120,
  },
});
export default Footer;
