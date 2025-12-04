import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import InventoryListScreen from "../screens/InventoryListScreen";
import ItemDetailScreen from "../screens/ItemDetailScreen";

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Inventory" component={InventoryListScreen} />
    </Tab.Navigator>
  );
}
