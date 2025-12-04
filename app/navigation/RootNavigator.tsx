import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from ".././auth/SignIn";
import SignUp from "../auth/SignUp";
import InventoryList from "../inventory/InventoryList";
import ItemDetail from "../inventory/ItemDetail";
import AddEditItem from "../inventory/AddEditItem";
import AdjustQuantity from "../inventory/AdjustQuantity";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="InventoryList" component={InventoryList} />
        <Stack.Screen name="ItemDetail" component={ItemDetail} />
        <Stack.Screen name="AddEditItem" component={AddEditItem} />
        <Stack.Screen name="AdjustQuantity" component={AdjustQuantity} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
