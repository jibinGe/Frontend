import { View, StyleSheet, Text } from '@react-pdf/renderer';

const FooterBox = () => {
  return (
    <View style={styles.footerBox}>
      <Text>Patient</Text>
      <View>
        <Text>Patient ID</Text>
        <Text>{}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  footerBox: {
    display: 'felx',
    flexDirection: 'column',
  },
});
export default FooterBox;
