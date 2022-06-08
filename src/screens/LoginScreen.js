import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity
} from "react-native";
import React, { useState } from "react";
import auth from "@react-native-firebase/auth";
import { HOME } from "../utils/Constants";

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpScreen, setOtpScreen] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState("");

  const genrateOtp = async () => {
    try {
      if (phoneNumber) {
        signInWithPhoneNumber(`+91 ${phoneNumber}`);
      } else {
        console.log("inncorrect number");
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function signInWithPhoneNumber(phone) {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phone);
      console.log(confirmation, "confirmation");
      if (confirmation) {
        setConfirm(confirmation);
        setOtpScreen(true);
      }
    } catch (error) {
      error;
      console.log(error);
    }
  }

  const LogInAuth = async () => {
    try {
      const res = await confirm.confirm(code);
      console.log(res, "----------><><><><><<><><><>>>");
      if (res) {
        navigation.navigate(HOME);
      }
    } catch (error) {
      Alert.alert("Invalid code.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {otpScreen
        ? <View style={styles.container}>
            <Text style={styles.header}>Login Page</Text>
            <TextInput
              placeholder="Enter Otp"
              keyboardType="numeric"
              value={code}
              style={styles.Input}
              onChangeText={e => setCode(e)}
            />
            <TouchableOpacity style={styles.Btn} onPress={LogInAuth}>
              <Text style={styles.BtnText}>Login</Text>
            </TouchableOpacity>
          </View>
        : <View style={styles.container}>
            <Text style={styles.header}>Login Page</Text>

            <TextInput
              placeholder="Enter Mobile Number"
              keyboardType="numeric"
              value={phoneNumber}
              style={styles.Input}
              onChangeText={e => setPhoneNumber(e)}
            />
            <TouchableOpacity style={styles.Btn} onPress={genrateOtp}>
              <Text style={styles.BtnText}>Get Otp</Text>
            </TouchableOpacity>
          </View>}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  Input: {
    borderColor: "#0071ff",
    borderWidth: 1,
    width: "90%",
    paddingHorizontal: 15,
    borderRadius: 5
  },
  Btn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0071ff",
    width: 150,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 15
  },
  BtnText: {
    fontSize: 18,
    color: "#fff"
  },
  header: {
    fontSize: 25,
    textAlign: "center",
    color: "#0071ff",
    backgroundColor: "#fff",
    marginVertical: 20
  }
});
