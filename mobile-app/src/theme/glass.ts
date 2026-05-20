import { ViewStyle } from 'react-native';
import Colors from './colors';

const Glass: ViewStyle = {
  backgroundColor: Colors.glass,
  borderWidth: 1,
  borderColor: Colors.glassBorder,
  borderRadius: 24,

  shadowColor: Colors.shadow,
  shadowOffset: {
    width: 0,
    height: 10,
  },
  shadowOpacity: 0.25,
  shadowRadius: 20,

  elevation: 12,
};

export default Glass;