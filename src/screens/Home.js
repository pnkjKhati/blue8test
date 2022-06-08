import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOGIN, SPLASH } from "../utils/Constants";

const Home = ({ navigation }) => {
  const goto = () => {
    navigation.navigate(SPLASH, { click: { a: "true" } });
  };

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate(LOGIN);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={styles.buttons}>
      <Text style={styles.header}>Home Page</Text>
      <TouchableOpacity onPress={goto}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={clearAll} style={styles.Btn}>
        <Text style={styles.BtnText}>LogOut</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    textAlign: "center",
    color: "#000"
  },
  buttons: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
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
