import React from "react";
import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  Heading,
  Text,
  VStack,
} from "native-base";
import { cabinets, yesOrNo } from "../constants/dropdownValues";
import {
  useGetClientProgramDetailsQuery,
  useUpdateProgramInfoMutation,
} from "../services/client";
import Loading from "../screens/loading";
import TextInput from "../components/input";
import { useForm } from "react-hook-form";
import MultiLineText from "../components/multiLineText";
import Picker from "../components/picker";
import { useSelector } from "react-redux";
import { toast } from "../components/toast";

export default function CabinetDetailsForm({ navigation, programs, clientId }) {
  const { control, errors, handleSubmit, setValue } = useForm();
  const { data, error, isLoading } = useGetClientProgramDetailsQuery({
    program: "cabinets",
    clientId: clientId,
  });
  const [updateInfo, result] = useUpdateProgramInfoMutation();
  const [loading, setLoading] = React.useState(false);
  const client = useSelector(state => state.client);

  React.useEffect(() => {
    const setData = async() => {
      if (data === undefined || isLoading) {
        return <Loading />;
      } else {
        await setValue("cabinets", data.program);
      }
    }

    setData();
  }, [data, isLoading])

  if (programs.Cabinets === 0 || programs.Cabinets === null || error) {
    return (
      <Center h={"100%"}>
        <Text>Program has not been included in client selections.</Text>
        <Text>If you believe this is an error, please contact Support.</Text>
      </Center>
    );
  }

  const onSubmit = values => {
    setLoading(true);

    updateInfo({
      type: "cabinets",
      body: { ...values.cabinets, clientId: clientId },
    })
      .unwrap()
      .then(res => {
        setLoading(false);
        toast.success({
          title: "Success!",
          message: "Program Data Successfully Updated",
        });
      });
  };

  return (
    <Box
      alignItems={"center"}
      borderColor={"coolGray.600"}
      borderRadius={"md"}
      borderWidth={1}
      m={2}
      mb={20}>
      <Heading p={2}>Cabinet Program Details</Heading>
      <Divider bg={"coolGray.400"} />

      <FormControl>
        <VStack p={4}>
          <Text fontSize={"lg"} fontWeight={"bold"}>
            Preferences
          </Text>
          <Divider bg={"coolGray.400"} my={2} />

          <TextInput
            control={control}
            field={"cabinets.preferredColors"}
            title={"Preferred Colors"}
            //isDisabled={!client.permissions.pages["ProgramDetails"].edit}
          />

          <TextInput
            control={control}
            field={"cabinets.preferredStyle"}
            title={"Preferred Style"}
            //isDisabled={!client.permissions.pages["ProgramDetails"].edit}
          />

          <TextInput
            control={control}
            field={"cabinets.overlay"}
            title={"Overlay"}
            //isDisabled={!client.permissions.pages["ProgramDetails"].edit}
          />

          <TextInput
            control={control}
            field={"cabinets.preferredColors"}
            title={"Preferred Colors"}
            //isDisabled={!client.permissions.pages["ProgramDetails"].edit}
          />

          <TextInput
            control={control}
            field={"cabinets.preferredCrown"}
            title={"Preferences on Crown"}
            //isDisabled={!client.permissions.pages["ProgramDetails"].edit}
          />

          <Picker
            choices={cabinets.bidTypes}
            control={control}
            field={"cabinets.bidType"}
            title={"Bid Type Preferences"}
            //isDisabled={!client.permissions.pages["ProgramDetails"].edit}
          />
        </VStack>

        <VStack p={4}>
          <Text fontSize={"lg"} fontWeight={"bold"}>
            Specifications
          </Text>
          <Divider bg={"coolGray.400"} mb={2} />
          <TextInput
            control={control}
            field={"cabinets.upperCabinetSpecs"}
            title={"Upper Cabinet Standard Specs."}
            //isDisabled={!client.permissions.pages["ProgramDetails"].edit}
          />

          <TextInput
            control={control}
            field={"cabinets.vanityHeightSpecs"}
            title={"Vanity Height Standard Specs."}
            //isDisabled={!client.permissions.pages["ProgramDetails"].edit}
          />

          <Picker
            choices={yesOrNo}
            control={control}
            field={"cabinets.softCloseStandard"}
            title={"Is Soft Close Standard?"}
            //isDisabled={!client.permissions.pages["ProgramDetails"].edit}
          />

          <TextInput
            control={control}
            field={"cabinets.areasOptionedOut"}
            title={"Are Areas Optioned Out?"}
            //isDisabled={!client.permissions.pages["ProgramDetails"].edit}
          />
        </VStack>

        <VStack p={4}>
          <Text fontSize={"lg"} fontWeight={"bold"}>
            General
          </Text>
          <Divider bg={"coolGray.400"} mb={2} />

          <VStack mb={2}>
            <MultiLineText
              control={control}
              field={"cabinets.notes"}
              title={"Notes"}
              //isDisabled={!client.permissions.pages["ProgramDetails"].edit}
            />
          </VStack>
        </VStack>

        <Divider bg={"coolGray.400"} />

        <Center>
          <Button
            _loading={{
              bg: "success.400",
            }}
            bg={"success.400"}
            isLoading={loading}
            isLoadingText={"Submitting"}
            m={5}
            onPress={handleSubmit(onSubmit)}
            width={"35%"}>
            Save
          </Button>
        </Center>
      </FormControl>
    </Box>
  );
}
