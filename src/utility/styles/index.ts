import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: Dimensions.get('window').height,
    backgroundColor: 'orange',
  },
  welcome: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '50%',
  },
  userImage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'orange',
    height: 65,
  },

  welcomeScreen: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 40,
    height: '80%',
  },
  button: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  buttonText: {
    backgroundColor: colors.BUTTON_COLOR,
    color: 'white',
    width: 80,
    paddingTop: 8,
    paddingBottom: 8,
    textAlign: 'center',
    /*     paddingLeft: 20,
    paddingRight: 20,
 */ borderRadius: 6,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: colors.BUTTON_COLOR,
    margin: 10,
    borderRadius: 10,
    height: 40,
  },
  circle: {
    height: 45,
    width: 45,
    borderRadius: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  justifyBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  flexRow: {
    flexDirection: 'row',
  },
  whiteText: {
    color: 'white',
  },
  buttonColor: {
    backgroundColor: colors.BUTTON_COLOR,
  },
  listItem: {
    backgroundColor: colors.WHITE_COLOR,
    color: 'black',
  },
  borderBottom: {
    borderBottomWidth: 2,
    borderColor: colors.PLACEHOLDER_TEXT_COLOR,
    padding: 10,
    width: '100%',
  },
  searchBorder: {
    borderWidth: 2,
    borderColor: colors.BUTTON_COLOR,
    borderRadius: 6,
    height: 45,
    margin: 40,
  },
  searchButton: {
    backgroundColor: colors.BUTTON_COLOR,
    color: 'white',
    textAlign: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: 50,
  },
  whiteBackground: {
    backgroundColor: 'white',
  },
});
