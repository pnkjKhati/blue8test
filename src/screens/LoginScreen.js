import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import auth from "@react-native-firebase/auth";

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpScreen, setOtpScreen] = useState(false);
  const [confirmCode, setConfirmCode] = useState("");
  const [otp, setOtp] = useState("");
  const genrateOtp = async () => {
    try {
      if (phoneNumber) {
        console.log(phoneNumber);
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
      if (confirmation) {
        setConfirmCode(confirmation);
        setOtpScreen(true);
      }
    } catch (error) {
      error;
      console.log(error);
    }
  }

  console.log(otp, "0------");

  return (
    <View style={{ flex: 1 }}>
      {otpScreen
        ? <View style={styles.container}>
            <TextInput
              placeholder="Enter Otp"
              keyboardType="numeric"
              value={otp}
              style={styles.Input}
              onChangeText={e => setOtp(e)}
            />
            <TouchableOpacity style={styles.Btn} onPress={genrateOtp}>
              <Text style={styles.BtnText}>Submit</Text>
            </TouchableOpacity>
          </View>
        : <View style={styles.container}>
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
  }
});
