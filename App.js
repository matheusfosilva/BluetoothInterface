import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text
} from 'react-native';
import App from "react-native-ble-manager/example/App";

import right from "./assets/rightButton.png"
import left from "./assets/leftButton.png"
import front from "./assets/frontButton.png"
import back from "./assets/backButton.png"
import icon from "./assets/justDog.png"


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      
        <View style={styles.header}>
          <Image style={styles.headerIcon} source={icon} />
          <Text style={styles.headerText}>MotorPet</Text>
        </View>
     
      <View style={styles.principalView}>

        <TouchableOpacity>
          <Image style={styles.button} source={front} />
        </TouchableOpacity>

        <View style={styles.aroundView}>

          <TouchableOpacity>
            <Image style={styles.button} source={left} />
          </TouchableOpacity>

          <TouchableOpacity>
            <Image style={styles.button} source={right} />
          </TouchableOpacity>

        </View>

        <TouchableOpacity>
          <Image style={styles.button} source={back} />
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5a142'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '12%',
    backgroundColor: 'black',
    alignItems: 'flex-end',
    paddingBottom: 10
  },
  headerText: {
    color: '#f5a142',
    fontSize: 40,
    fontWeight: '900',
    paddingLeft: 15,
    paddingTop: 30
  },
  headerIcon: {
    width: 100,
    height: 100
  },
  principalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 15
  },
  aroundView: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  button: {
    width: 100,
    height: 100,
    marginLeft: 55,
    marginRight: 45
  }
});
