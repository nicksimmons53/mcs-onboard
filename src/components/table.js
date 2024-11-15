import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { FlatList, Text, StyleSheet, View, TextInput } from "react-native";
import IconButton from "../components/iconButton";
import Divider from "../components/divider";
import { AlertNotification } from "./alert";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import Input from "../components/input";
import { ErrorMessage } from "@hookform/error-message";

// TODO:
//        - add functionality to "add" row
//        - add functionality to "edit" row
//        - add functionality to "delete" row
export default function Table({
  title,
  columns,
  data,
  columnStyle,
  action,
  rowAction,
  alertHeader,
  alertBody,
  fields,
  position,
  setIndex,
  deleteRow,
  children,
  Form,
  editInfo,
  deleteInfo,
  control,
  onSubmit,
  onAdd,
  onEdit,
  onDelete,
  onCancel,
}) {
  const [alert, showAlert] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [height, setHeight] = React.useState(0);
  const animatedHeight = useSharedValue(0);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);

  const onLayout = (event) => {
    const onLayoutHeight = event.nativeEvent.layout.height;

    if (onLayoutHeight > 0 && height !== onLayoutHeight) {
      setHeight(onLayoutHeight);
    }
  };

  const collapsibleStyle = useAnimatedStyle(() => {
    animatedHeight.value = isOpen ? withTiming(height) : withTiming(0);

    return {
      height: animatedHeight.value,
    };
  }, [isOpen, height]);

  const TableEnd = () => (
    <View className={"bg-gray-800 items-center rounded-r-lg -ml-2 pl-2 flex-1"}>
      {[{}, {}].concat(data).map((item, index) => {
        if (index === 0 || index === 1) {
          return (
            <View flex={1}>
            </View>
          );
        } else {
          return (
            <React.Fragment>
              <Divider />
              <View key={item.id} className={"items-center"}>
                <IconButton
                  icon={
                    <FontAwesome5
                      name={"ellipsis-h"}
                      size={18}
                      color={"#fafaf9"}
                      className={"m-2"}
                    />
                  }
                  onPress={() => console.log("PRESSED")}
                />
              </View>
            </React.Fragment>
          );
        }
      })}

      {isOpen && <Divider />}
    </View>
  );

  return (
    <View className={"flex-col"}>
      <View className={"flex-row z-20"}>
        <View className={`${isEditing ? "border-orange-500" : "border-gray-800"} bg-gray-100 border rounded-lg flex-1 m-1 mt-2 ${isOpen ? "-mb-2" : "mb-0"}`}>
          <FlatList
            data={data}
            ListHeaderComponent={
              <Header
                title={title}
                columns={columns}
                addAction={() => setIsOpen(!isOpen)}
                style={columnStyle}
                Form={Form}
                isOpen={isOpen}
                editInfo={editInfo}
                isEditing={isEditing}
                editAction={() => setIsEditing(!isEditing)}
                selectedItems={selectedItems}
                deleteInfo={deleteInfo}
                onDelete={onDelete}
                onEdit={onEdit}
                onCancel={onCancel}
              />
            }
            ItemSeparatorComponent={<Divider />}
            scrollEnabled={false}
            keyExtractor={(item, index) => index}
            ListEmptyComponent={
              <View className={"flex-row justify-center"}>
                <Text className={"font-quicksand font-bold text-orange-500 p-2"}>
                  No Data Found
                </Text>
              </View>
            }
            renderItem={({ item, index }) => {
              let rowStyle = `flex-row items-center`;

              return (
                <View className={rowStyle} key={index}>
                  {(editInfo || deleteInfo) &&
                    <React.Fragment>
                      <IconButton
                        icon={
                          <FontAwesome5
                            name={selectedItems.some(obj => obj.id === item.id) ? "check-square" : "square"}
                            size={22}
                            color={selectedItems.some(obj => obj.id === item.id) ? "#F97316" : "#172554"}
                            className={"w-6 mx-2"}
                          />
                        }
                        onPress={() => {
                          if (selectedItems.some(obj => obj.id === item.id)) {
                            setSelectedItems(previousSelectedItems => previousSelectedItems.filter(row => row.id != item.id));
                          } else {
                            setSelectedItems([...selectedItems, item])
                          }
                        }}
                      />
                      <Divider orientation={"vertical"} />
                    </React.Fragment>
                  }

                  {columns.map((cell, cellIndex) => {
                    if (isEditing) {
                      return (
                        <Input
                          control={control}
                          field={`${title.toLowerCase()}.${index}.${cell.toLowerCase().replace(/\s/g, "")}`}
                          textStyle={"color-white"}
                          inputStyle={`bg-gray-100 rounded-lg pl-1 m-0 border-0`}
                          containerStyle={`${columnStyle[cellIndex]} mr-2 p-0 my-0`}
                          cursorColor={"#F97316"}
                        />
                      )
                    }
                    return (
                      <Cell
                        data={item[cell.toLowerCase().replace(/\s/g, "")]}
                        index={cellIndex}
                        key={cellIndex}
                        style={columnStyle[cellIndex]}
                      />
                    );
                  })}
                </View>
              );
            }}
          />
        </View>

        {/*<TableEnd />*/}
      </View>

      <AnimatedDropdown
        onLayout={onLayout}
        collapsibleStyle={collapsibleStyle}
        form={Form}
        isOpen={isOpen}
      />
    </View>
  );
}

const Header = (props) => (
  <React.Fragment>
    {props.title &&
      <React.Fragment>
        <View className={"flex-row items-center justify-between"}>
          <Text className={"font-quicksand text-base mx-1 my-2 font-bold"}>
            {props.title}
          </Text>

          <View className={"flex-row"}>
            {props.selectedItems.length > 0 &&
              <IconButton
                icon={
                  <FontAwesome5
                    name={"trash"}
                    size={22}
                    color={"#ef4444"}
                    className={"mx-2"}
                  />
                }
                onPress={() => props.onDelete(props.selectedItems)}
              />
            }

            {props.editInfo &&
              <IconButton
                icon={
                  <FontAwesome5
                    name={props.isEditing ? "save" : "edit"}
                    size={22}
                    color={props.isEditing ? "#4ade80": "#172554"}
                    className={props.Form && "mx-2"}
                  />
                }
                onPress={props}
              />
            }

            {props.isEditing &&
              <IconButton
                icon={
                  <FontAwesome5
                    name={"times"}
                    size={22}
                    color={"#ef4444"}
                    className={props.Form && "mx-2"}
                  />
                }
                onPress={props.onCancel}
              />
            }

            {props.Form &&
              <IconButton
                icon={
                  <FontAwesome5
                    name={props.isOpen ? "times" : "plus"}
                    size={22}
                    color={props.isOpen ? "#ef4444": "#172554"}
                    className={props.Form && "mx-2"}
                  />
                }
                onPress={props.addAction}
              />
            }
          </View>
        </View>

        <Divider />
      </React.Fragment>
    }

    <View className={"flex-row bg-gray-100 items-center"}>
      {(props.editInfo || props.deleteInfo) &&
        <View className={"w-6 mx-2"}>
        </View>
      }
      {props.columns.map((column, index) => (
        <ColumnHeader column={column} key={index} style={props.style[index]} />
      ))}
    </View>

    <Divider />
  </React.Fragment>
);
Table.Header = Header;

const ColumnHeader = (props) => (
  <React.Fragment>
    <Text className={`font-quicksand ${props.style} m-1 font-bold`}>
      {props.column}
    </Text>
    {/*{ index+1 < columnNames.length && <Divider orientation={"vertical"}/> }*/}
  </React.Fragment>
)
Table.ColumnHeader = ColumnHeader;

const Cell = (props) => (
  <React.Fragment>
    <Text className={`font-quicksand ${props.style} m-1 my-2`}>
      {props.data}
    </Text>
  </React.Fragment>
);
Table.Cell = Cell;

const AnimatedDropdown = (props) => (
  <Animated.View className={"z-30 flex-row mx-1"} style={[props.collapsibleStyle, { overflow: "hidden", zIndex: 10 }]}>
    <View onLayout={props.onLayout} className={"absolute pt-4 pb-2 px-2 bg-gray-800 w-full -mt-2 z-50 rounded-b-md"}>
      {props.form}
    </View>
  </Animated.View>
);
Table.AddDropdown = AnimatedDropdown;