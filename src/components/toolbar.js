import React from "react";
import { Box, Divider, IconButton, Image, VStack } from "native-base";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useDispatch } from "react-redux";
import { clearToken } from "../features/auth/authSlice";

export default function Toolbar({ navigation, route }) {
  const dispatch = useDispatch();

  const NavIcon = () => {
    if (
      (route !== undefined && route.name === "ClientDetails") ||
      (route !== undefined && route.name === "ProgramDetails") ||
      (route !== undefined && route.name === "ProgramPricing") ||
      (route !== undefined && route.name === "Help")
    ) {
      return (
        <IconButton
          icon={
            <FontAwesome5
              name={"arrow-left"}
              size={20}
              color={"#fafaf9"}
            />
          }
          width={"100%"}
          my={1}
          onPress={() => navigation.goBack()}
        />
      );
    }

    return (
      <IconButton
        icon={
          <FontAwesome5 name={"home"} size={20} color={"#fafaf9"} />
        }
        width={"100%"}
        my={1}
        onPress={() => navigation.popToTop()}
      />
    );
  };

  return (
    <VStack
      alignItems={"center"}
      bg={"coolGray.800"}
      borderRightRadius={"md"}
      my={2}
      p={1}
      maxWidth={"5%"}>

      <Image
        alt={"Logo"}
        borderRadius={"md"}
        size={50}
        source={require("./logo.png")}
        my={1}
      />

      <Divider />

      <React.Fragment>
        <NavIcon />

        <IconButton
          icon={<FontAwesome5 name={"question"} size={20} color={"#fafaf9"} />}
          width={"100%"}
          my={1}
          onPress={() => navigation.push("Help")}
        />
      </React.Fragment>

      <IconButton
        icon={
          <FontAwesome5
            name={"sign-out-alt"}
            size={20}
            color={"#dc2626"}
          />
        }
        width={"100%"}
        my={1}
        mb={10}
        onPress={() => dispatch(clearToken())}
      />
    </VStack>
  );
}
