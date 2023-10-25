import { Page, StyleSheet, View, Image, Text } from '@react-pdf/renderer';
import React from 'react';
import Ebryo from '../img/embryo-no.png';
const OneEmbryo = ({ embryo, embind ,patientData }) => {
  return (
    <View style={styles.embryoBox} key={`emp-${embind}`}>
      <Image style={styles.embryoImg} src={embryo.embryo_link} cache={false} />
      <View style={{ ...styles.indecatorBox, opacity: Number(embryo.percentage) / 100 }}></View>
      <View style={styles.ScoreBox}>
        <Text style={styles.scoreTitile}>Embryo Score</Text>
        <Text style={styles.score}>
          {Math.round((embryo.percentage + Number.EPSILON) * 100) / 100}/100
        </Text>
      </View>
      <View style={styles.InfoBox}>
        <View style={styles.oneInfBox}>
          <Text style={styles.infTitle}>Embryo No.</Text>
          <Text style={styles.inf}>{embryo.embryo_number}</Text>
        </View>
        <View style={styles.oneInfBox}>
          <Text style={styles.infTitle}>Embryo Age</Text>
          <Text style={styles.inf}>{embryo.embryo_age}</Text>
        </View>
        <View style={styles.oneInfBox}>
          <Text style={styles.infTitle}>Patient ID</Text>
          <Text style={styles.inf}>{patientData.id}</Text>
        </View>
        <View style={styles.oneInfBox}>
          <Text style={styles.infTitle}>Cycle ID</Text>
          <Text style={styles.inf}>{embryo.cycle_id}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  embryoBox: {
    display: 'flex',
    maxHeight: '13vh',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  embryoImg: {
    maxWidth: 130,
    aspectRatio: 1,
    alignSelf: 'stretch',
    borderRadius: 10,
  },
  InfoBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  ScoreBox: {
    padding: '20px 60px 20px 20px',
    color: '#000',
    fontSize: 17,
  },
  score: {
    marginTop: 10,
    fontSize: 30,
  },
  indecatorBox: {
    minWidth: 40,
    backgroundColor: '#468ff7',
    alignSelf: 'stretch',
    borderRadius: 8,
  },
  oneInfBox: {
    display: 'flex',
    gap: 30,
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 10,
  },
  infTitle: {
    flexBasis: 60,
    color: '#859397',
  },
  inf: {
    flexBasis: 60,
    color: '#000',
  },
});
export default OneEmbryo;
