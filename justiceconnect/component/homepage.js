// component/HomeScreen.js
import React, { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import HomeScreenUI from "./ui/homepage.js";

export default function HomeScreen() {
  const [message, setMessage] = useState("");
  const navigation = useNavigation();

  const handleHamburger = () => {
    Alert.alert("Hamburger", "hamburger successfully opened");
  };

  return (
    <HomeScreenUI
      message={message}
      setMessage={setMessage}
      handleHamburger={handleHamburger}
      navigation={navigation}
    />
  );
}
