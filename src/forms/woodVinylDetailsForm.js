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
import { wood, yesOrNo } from "../constants/dropdownValues";
import { useGetClientProgramDetailsQuery, useUpdateProgramInfoMutation } from "../services/client";
import Loading from "../screens/loading";
import { useForm } from "react-hook-form";
import TextInput from "../components/input";
import MultiLineText from "../components/multiLineText";
import Picker from "../components/picker";
import { toast } from "../components/toast";
import { useSelector } from "react-redux";

export default function WoodVinylDetailsForm({ navigation, programs, clientId }) {
  const { control, errors, handleSubmit, setValue } = useForm();
  const { data, error, isLoading } = useGetClientProgramDetailsQuery({
    program: "wood_vinyl",
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
        await setValue("wood_vinyl", data.program);
      }
    }

    setData();
  }, [data, isLoading])

  if ((programs.Wood === 0 && programs.Vinyl === 0) || error) {
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
      type: "wood_vinyl",
      body: { ...values.wood_vinyl, clientId: clientId },
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
      <Heading p={2}>Wood and Vinyl Program Details</Heading>
      <Divider bg={"coolGray.400"} />

      <FormControl>
        <VStack p={4}>
          <Text fontSize={"lg"} fontWeight={"bold"}>
            Preferences
          </Text>
          <Divider bg={"coolGray.400"} my={2} />

          <Picker
            choices={wood.glueProducts}
            control={control}
            field={"wood_vinyl.preferredGlueProducts"}
            title={"Preferred Glue Products"}
            isDisabled={!client.permissions.pages["ProgramDetails"].edit}
          />

          <TextInput
            control={control}
            field={"wood_vinyl.otherGlueProducts"}
            title={"Other Glue Product"}
            isDisabled={!client.permissions.pages["ProgramDetails"].edit}
          />

          <Picker
            choices={wood.stainOrPrimed}
            control={control}
            field={"wood_vinyl.stainedOrPrimed"}
            title={"Stained or Primed?"}
            isDisabled={!client.permissions.pages["ProgramDetails"].edit}
          />
        </VStack>

        <VStack p={4}>
          <Text fontSize={"lg"} fontWeight={"bold"}>
            Specifications
          </Text>
          <Divider bg={"coolGray.400"} mb={2} />

          <Picker
            choices={yesOrNo}
            control={control}
            field={"wood_vinyl.transitionStripsStandard"}
            title={"Are Transition Strips Standard?"}
            isDisabled={!client.permissions.pages["ProgramDetails"].edit}
          />

          <Picker
            choices={yesOrNo}
            control={control}
            field={"wood_vinyl.hvacRequirement"}
            title={"HVAC Requirements?"}
            isDisabled={!client.permissions.pages["ProgramDetails"].edit}
          />

          <Picker
            choices={yesOrNo}
            control={control}
            field={"wood_vinyl.MCInstalledTrim"}
            title={"MC Surfaces Install Wood Trim?"}
            isDisabled={!client.permissions.pages["ProgramDetails"].edit}
          />

          <Picker
            choices={wood.subfloorConstruction}
            control={control}
            field={"wood_vinyl.secondFloorConstruction"}
            title={"2nd Story Subfloor Construction"}
            isDisabled={!client.permissions.pages["ProgramDetails"].edit}
          />
        </VStack>

        <VStack p={4}>
          <Text fontSize={"lg"} fontWeight={"bold"}>
            General
          </Text>
          <Divider bg={"coolGray.400"} mb={2} />

          <Picker
            choices={wood.takeoffResp}
            control={control}
            field={"wood_vinyl.takeoffResponsibility"}
            title={"Who Will Be Doing Takeoffs?"}
            isDisabled={!client.permissions.pages["ProgramDetails"].edit}
          />

          <TextInput
            control={control}
            field={"wood_vinyl.wasteFactor"}
            title={"Waste Factor Percentage"}
            isDisabled={!client.permissions.pages["ProgramDetails"].edit}
          />

          <VStack mb={2}>
            <MultiLineText
              control={control}
              field={"wood_vinyl.notes"}
              title={"Notes"}
              isDisabled={!client.permissions.pages["ProgramDetails"].edit}
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
