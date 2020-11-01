import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 5,
    width: '90%',
    fontSize: 14,
    lineHeight: 24,
    fontWeight: '400',
    fontFamily: 'Roboto',
  },
  lineBlock: {
    marginRight: 20,
  },
  line: {
    width: 2,
    marginTop: 10,
  },
  titleBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleBlockBottom: {
    marginTop: 20,
  },
  titleBefore: {
    width: 8,
    height: 8,
    borderRadius: 30,
    marginLeft: -25,
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    width: '100%',
  },
  stationBlock: {
    marginTop: 22,
    marginBottom: 16,
  },
  stationBlockClose: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stationBlockOpen: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  stationBlockOpenStation: {
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  stationBefore: {
    width: 8,
    height: 8,
    borderRadius: 30,
    borderWidth: 2,
    backgroundColor: '#fff',
    marginLeft: -25,
    marginRight: 16,
  },
  textBlock: {
    paddingTop: 3,
    paddingBottom: 3,
  },
  branchBlock: {
    paddingTop: 8,
    paddingBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  stationText: {
    color: "#2F80ED",
  },
  text: {
    color: "#5A5A5A",
  }
});

export default styles;
