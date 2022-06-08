import { StyleSheet, Text, View, Image } from "react-native";
import { HOME, LOGIN } from "../utils/Constants";
import React, { useEffect, useState } from "react";

const SplashScreen = ({ navigation, route }) => {
  const {params={click:false}} = route
  useEffect(
    () => {
      if (params?.click) {
        setTimeout(() => {
          navigation.navigate(HOME);
        }, 3000);
      } else {
        setTimeout(() => {
          navigation.navigate(LOGIN);
        }, 3000);
      }
    },
    [params.click]
  );

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  }
});
