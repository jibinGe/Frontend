import React from 'react';
import { Page, StyleSheet, View, Image, Text } from '@react-pdf/renderer';

const filterData = (data) => {
  const sprintData = [];
  data.forEach((item) => {
    sprintData.push(...item);
  });
  const poor = sprintData
    .filter((item) => item.embryo_state === 'poor')
    .map((item) => {
      return item.percentage;
    });
  const fair = sprintData
    .filter((item) => item.embryo_state === 'fair')
    .map((item) => {
      return item.percentage - 50;
    });
  const good = sprintData
    .filter((item) => item.embryo_state === 'good')
    .map((item) => {
      console.log("good" + item.percentage - 25);
      return item.percentage - 25;
    });
   
  return {
   
    genNum: sprintData.length,
    poor,
    fair,
    good,
  };
};
const DinaGenesys = ({ data }) => {
  const _data = filterData(data);
  return (
    <View style={styles.genBox}>
      <View style={styles.embNumBox}>
        <Text style={styles.embNumtitle}> You have</Text>
        <View style={styles.embNum}>
          <Text>{_data.genNum}</Text>
        </View>
        <Text style={styles.embNumtext}>
          mature embryos (blastocysts) from this cycle that were evaluated.
        </Text>
      </View>
      <View style={styles.classBox}>
        <Text style={styles.classBoxtitle}>This is how many embryos you have in each bracket.</Text>
        <View style={styles.oneClassBox}>
          <View style={styles.oneClassGrad}>
            <View style={{ ...styles.gradNum, backgroundColor: '#b6d3fc' }}>
              <Text> {_data.poor.length}</Text>
              <Text> Poor</Text>
            </View>
            <View style={styles.chartgradent}>
              <Text>0</Text>
              <Text>50</Text>
            </View>

            <View style={{ ...styles.chartGrad, backgroundColor: '#b6d3fc' }}>
              {_data.poor.map((item, ind) => {
                return (
                  <Text
                    key={`poor-${ind}`}
                    style={{
                      backgroundColor: '#ddd',
                      aspectRatio: 1,
                      border: '1.5px solid #000',
                      borderRadius: 8,
                      height: 17,
                      position: 'absolute',
                      top: '-2.5px',
                      left: `${item}%`,
                    }}
                  ></Text>
                );
              })}
            </View>
          </View>
          <View style={styles.oneClassGrad}>
            <View style={{ ...styles.gradNum, backgroundColor: '#85b5f9' }}>
              <Text> {_data.fair.length}</Text>
              <Text> Fair</Text>
            </View>
            <View style={styles.chartgradent}>
              <Text>51</Text>
              <Text>75</Text>
            </View>
            <View style={{ ...styles.chartGrad, backgroundColor: '#85b5f9' }}>
              {_data.fair.map((item, ind) => {
                return (
                  <Text
                    key={`fair-${ind}`}
                    style={{
                      backgroundColor: '#ddd',
                      aspectRatio: 1,
                      border: '1.5px solid #000',
                      borderRadius: 8,
                      height: 17,
                      position: 'absolute',
                      top: '-2.5px',
                      left: `${item}%`,
                    }}
                  ></Text>
                );
              })}
            </View>
          </View>
          <View style={styles.oneClassGrad}>
            <View style={styles.gradNum}>
              <Text> {_data.good.length}</Text>
              <Text> Good</Text>
            </View>
            <View style={styles.chartgradent}>
              <Text>75</Text>
              <Text>100</Text>
            </View>
            <View style={styles.chartGrad}>
              {_data.good.map((item, ind) => {
                return (
                  <Text
                    key={`fair-${ind}`}
                    style={{
                      backgroundColor: '#ddd',
                      aspectRatio: 1,
                      border: '1.5px solid #000',
                      borderRadius: 8,
                      height: 17,
                      position: 'absolute',
                      top: '-2.5px',
                      left: `${item}%`,
                    }}
                  ></Text>
                );
              })}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  genBox: {
    height: 220,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 14,
  },
  embNumBox: {
    padding: '10px',
    width: '25%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRight: '1px solid #ddd',
  },
  embNum: {
    padding: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
    backgroundColor: '#cee1fd',
    border: '1.5px solid #e5fb9',
    borderRadius: '65%',
    fontSize: 32,
    color: '#2279f5',
  },
  embNumtext: {
    textAlign: 'center',
    fontFamily: 'Helvetica',
    fontSize: 12,
    lineHeight: 1.6,
  },
  classBox: {
    width: '75%',
    padding: '0px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: 25,
  },
  oneClassBox: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  oneClassGrad: {
    width: '35%',
    flexShrink: 3,
    display: 'flex',
    flexDirection: 'column',
  },
  gradNum: {
    aspectRatio: 1,
    backgroundColor: '#468ff7',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 7,
    fontSize: 15,
    borderRadius: 10,
  },
  chartgradent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontFamily: 'Helvetica',
    color: '#6c7c93',
    fontSize: 12,
    marginTop: 7,
  },
  chartGrad: {
    position: 'relative',
    backgroundColor: '#468ff7',
    minHeight: 12,
    maxHeight: 12,
    borderRadius: 10,
    marginTop: 20,
  },
});
export default DinaGenesys;
