import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import screens from "../utils/Imported";
import { SPLASH, HOME, LOGIN } from "../utils/Constants";
const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={SPLASH}
        component={screens.splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={LOGIN}
        component={screens.login}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={HOME} component={screens.home} />
    </Stack.Navigator>
  );
}

export default StackNavigator;
