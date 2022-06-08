import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SPLASH } from "../utils/Constants";

const Home = ({ navigation }) => {
  const goto = () => {
    navigation.navigate(SPLASH);
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <TouchableOpacity style={styles.buttons} onPress={goto}>
        <Text style={styles.header}>Home</Text>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />
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
    justifyContent: "center",
    alignItems: "center"
  }
});
