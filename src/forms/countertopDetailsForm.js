import React from "react";
import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  Heading,
  Input,
  Text,
  VStack,
} from "native-base";
import { countertops, yesOrNo } from "../constants/dropdownValues";
import Loading from "../screens/loading";
import {
  useGetClientProgramDetailsQuery,
  useUpdateProgramInfoMutation,
} from "../services/client";
import Picker from "../components/picker";
import { useForm } from "react-hook-form";
import TextInput from "../components/input";
import MultiLineText from "../components/multiLineText";
import { toast } from "../components/toast";
import { useSelector } from "react-redux";

export default function CountertopDetailsForm({ programs, clientId }) {
  const { control, errors, handleSubmit, setValue } = useForm();
  const { data, error, isLoading } = useGetClientProgramDetailsQuery({
    program: "countertops",
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
        await setValue("countertops", data.program);
      }
    }

    setData();
  }, [data, isLoading])

  if (programs.Countertops === 0 || programs.Countertops === null || error) {
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
      type: "countertops",
      body: { ...values.countertops, clientId: clientId },
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
      <Heading p={2}>Countertop Program Details</Heading>
      <Divider bg={"coolGray.400"} />

      <FormControl>
        <VStack p={4}>
          <Text fontSize={"lg"} fontWeight={"bold"}>
            Preferences
          </Text>
          <Divider bg={"coolGray.400"} my={2} />

          <Picker
            choices={countertops.materialThickness}
            control={control}
            field={"countertops.preferredMaterialThickness"}
            title={"Preferred Material Thickness"}
            isDisabled={!client.permissions.pages["ProgramDetails"].edit}
          />

          <Picker
            choices={countertops.edges}
            control={control}
            field={"countertops.preferredEdge"}
            title={"Preferred Edge"}
            isDisabled={!client.permissions.pages["ProgramDetails"].edit}
          />
        </VStack>

        <VStack p={4}>
          <Text fontSize={"lg"} fontWeight={"bold"}>
            Specifications
          </Text>
          <Divider bg={"coolGray.400"} mb={2} />

          <Picker
            choices={countertops.standardOrOption}
            control={control}
            field={"countertops.waterfallEdgeStandard"}
            title={"Waterfall Sides - Std. or Option?"}
            isDisabled={!client.permissions.pages["ProgramDetails"].edit}
          />

          <Picker
            choices={yesOrNo}
            control={control}
            field={"countertops.faucetHoles"}
            title={"Faucet Holes?"}
            isDisabled={!client.permissions.pages["ProgramDetails"].edit}
          />

          <TextInput
            control={control}
            field={"countertops.stoveRangeSpecifications"}
            title={"Stove Range Specs."}
            isDisabled={!client.permissions.pages["ProgramDetails"].edit}
          />
        </VStack>

        <VStack p={4}>
          <Text fontSize={"lg"} fontWeight={"bold"}>
            General
          </Text>
          <Divider bg={"coolGray.400"} mb={2} />

          <Picker
            choices={countertops.takeoffResp}
            control={control}
            field={"countertops.takeoffResponsibility"}
            title={"Who Will Be Doing Takeoffs?"}
            isDisabled={!client.permissions.pages["ProgramDetails"].edit}
          />

          <FormControl.Label>Waste Factor Percentage</FormControl.Label>
          <Input />

          <VStack mb={2}>
            <MultiLineText
              control={control}
              field={"countertops.notes"}
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
