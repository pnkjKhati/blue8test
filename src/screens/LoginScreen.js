import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import React, { useState , useEffect} from "react";
import auth from "@react-native-firebase/auth";
import { HOME } from "../utils/Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpScreen, setOtpScreen] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    getToken()
  }, [])
  

  const genrateOtp = async () => {
    setIsLoading(true)
    try {
      if (phoneNumber) {
        signInWithPhoneNumber(`+91 ${phoneNumber}`);
      } else {
        console.log("inncorrect number");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  };

  async function signInWithPhoneNumber(phone) {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phone);
      console.log(confirmation, "confirmation");
      if (confirmation) {
        setConfirm(confirmation);
        setOtpScreen(true);
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error);
    }
  }

  const LogInAuth = async () => {
    setIsLoading(true)
    try {
      const res = await confirm.confirm(code);
      if (res) {
        await AsyncStorage.setItem('token', res?.user?._user.uid)
        navigation.navigate(HOME);
      }
    } catch (error) {
      Alert.alert("Invalid code.");
      setIsLoading(false)
    }
  };


  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token')
      if(value !== null) {
        navigation.navigate(HOME)
      }
    } catch(e) {
      console.log(e)
    }
  }

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
            {isLoading ?<ActivityIndicator size="small" color="red" />:
              <Text style={styles.BtnText}>Login</Text>}
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
            {isLoading ?<ActivityIndicator size="small" color="red" />:
              <Text style={styles.BtnText}>Get Otp</Text>}
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
