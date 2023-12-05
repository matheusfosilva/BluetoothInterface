import * as React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Platform,
  PermissionsAndroid,
} from "react-native";
import { BleManager } from "react-native-ble-plx";

import right from "./assets/rightButton.png";
import left from "./assets/leftButton.png";
import front from "./assets/frontButton.png";
import back from "./assets/backButton.png";
import icon from "./assets/justDog.png";

const manager = new BleManager();

const ConnectionStatus = {
  DISCONNECTED: "desconectado",
  CONNECTING: "conectando",
  CONNECTED: "conectado",
};

const SerialServiceUUID = "0000dfb0-0000-1000-8000-00805f9b34fb";
const SerialCharacteristicUUID = "0000dfb1-0000-1000-8000-00805f9b34fb";

const requestBluetoothPermission = async () => {
  if (
    Platform.OS === "android" &&
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  ) {
    const apiLevel = parseInt(Platform.Version.toString(), 10);

    if (apiLevel < 31) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    if (
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN &&
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
    ) {
      const result = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);

      return (
        result["android.permission.BLUETOOTH_CONNECT"] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        result["android.permission.BLUETOOTH_SCAN"] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        result["android.permission.ACCESS_FINE_LOCATION"] ===
          PermissionsAndroid.RESULTS.GRANTED
      );
    }
  }

  this.showErrorToast("Permission have not been granted");

  return false;
};

export default function App() {
  const [connectionStatus, setConnectionStatus] = React.useState(
    ConnectionStatus.DISCONNECTED
  );
  const [device, setDevice] = React.useState(null);

  function scanAndConnect() {
    manager.startDeviceScan(null, null, async (error, device) => {
      setConnectionStatus(ConnectionStatus.CONNECTING);
      if (error) {
        // Handle error (scanning will be stopped automatically)
        return;
      }

      // Check if it is a device you are looking for based on advertisement data
      console.log("🚀 ~ manager.startDeviceScan ~ device:", device.name);
      // or other criteria.
      if (device.name === "HC-05") {
        // Stop scanning as it's not necessary if you are scanning for one device.
        manager.stopDeviceScan();

        // Proceed with connection on Gamesir-X2_EF device.
        try {
          await manager.connectToDevice(device.id);

          setDevice(device);

          await manager.discoverAllServicesAndCharacteristicsForDevice(
            device.id
          );
        } catch (err) {
          console.log("🚀 ~ manager.startDeviceScan ~ err:", err);
        }
        setConnectionStatus(ConnectionStatus.CONNECTED);
      }
    });
  }

  React.useEffect(() => {
    const requestBluetoothPermission = async () => {
      if (
        Platform.OS === "android" &&
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      ) {
        const apiLevel = parseInt(Platform.Version.toString(), 10);

        if (apiLevel < 31) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        if (
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN &&
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
        ) {
          const result = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ]);

          return (
            result["android.permission.BLUETOOTH_CONNECT"] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            result["android.permission.BLUETOOTH_SCAN"] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            result["android.permission.ACCESS_FINE_LOCATION"] ===
              PermissionsAndroid.RESULTS.GRANTED
          );
        }
      }

      showErrorToast("Permission have not been granted");

      return false;
    };

    const fetchData = async () => {
      let result;
      try {
        result = await requestBluetoothPermission();
      } catch (error) {
        console.log("🚀 ~ React.useEffect ~ error", error);
      }
      console.log("🚀 ~ React.useEffect ~ result:", result);
      if (result) {
        scanAndConnect();
      }
    };

    fetchData();
  }, []);

  const onPressFront = () => {
    const msg = base64.encode("1");

    BleManager.writeCharacteristicWithResponseForDevice(
      device.id,
      SerialServiceUUID,
      SerialCharacteristicUUID,
      msg
    )
      .then((resp) => {
        console.log("WRITE resp = ", resp);
      })
      .catch((err) => {
        console.log("WRITE err = ", err);
      });
  };

  const onPressBack = () => {
    const msg = base64.encode("2");

    BleManager.writeCharacteristicWithResponseForDevice(
      device.id,
      SerialServiceUUID,
      SerialCharacteristicUUID,
      msg
    )
      .then((resp) => {
        console.log("WRITE resp = ", resp);
      })
      .catch((err) => {
        console.log("WRITE err = ", err);
      });
  };

  const onPressLeft = () => {
    const msg = base64.encode("3");

    BleManager.writeCharacteristicWithResponseForDevice(
      device.id,
      SerialServiceUUID,
      SerialCharacteristicUUID,
      msg
    )
      .then((resp) => {
        console.log("WRITE resp = ", resp);
      })
      .catch((err) => {
        console.log("WRITE err = ", err);
      });
  };

  const onPressRIght = () => {
    const msg = base64.encode("4");

    BleManager.writeCharacteristicWithResponseForDevice(
      device.id,
      SerialServiceUUID,
      SerialCharacteristicUUID,
      msg
    )
      .then((resp) => {
        console.log("WRITE resp = ", resp);
      })
      .catch((err) => {
        console.log("WRITE err = ", err);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.headerIcon} source={icon} />
        <Text style={styles.headerText}>MotorPet</Text>
      </View>

      <View style={styles.connectionStatus}>
        <Text
          style={{
            color: "black",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Status do dispositivo:{" "}
          <Text
            style={{
              color: "black",
              fontSize: 18,
              fontWeight: "normal",
            }}
          >
            {connectionStatus}
          </Text>
        </Text>
      </View>
      <View style={styles.principalView}>
        <TouchableOpacity onPress={onPressFront}>
          <Image style={styles.button} source={front} />
        </TouchableOpacity>

        <View style={styles.aroundView}>
          <TouchableOpacity onPress={onPressLeft}>
            <Image style={styles.button} source={left} />
          </TouchableOpacity>

          <TouchableOpacity onPress={onPressRIght}>
            <Image style={styles.button} source={right} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={onPressBacks}>
          <Image style={styles.button} source={back} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5a142",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "12%",
    backgroundColor: "black",
    alignItems: "flex-end",
    paddingBottom: 10,
  },
  headerText: {
    color: "#f5a142",
    fontSize: 40,
    fontWeight: "900",
    paddingLeft: 15,
    paddingTop: 30,
  },
  headerIcon: {
    width: 100,
    height: 100,
  },
  principalView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: 15,
  },
  aroundView: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  button: {
    width: 100,
    height: 100,
    marginLeft: 55,
    marginRight: 45,
  },
  connectionStatus: {
    width: "100%",
    marginVertical: 10,
    alignItems: "center",
  },
});
