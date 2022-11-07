import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PlusCircle, SoccerBall } from "phosphor-react-native";
import { useTheme } from "native-base";
import { New } from "../screens/New";
import { Pools } from "../screens/Pools";
import { Platform } from "react-native";
import { Find } from "../screens/Find";
import { Details } from "../screens/Details";


export function AppRoutes() {
    const { Navigator, Screen } = createBottomTabNavigator();
    const { colors, sizes } = useTheme();
    const size = sizes[6];

    return (
        <Navigator
            screenOptions={{
                tabBarLabelPosition: 'beside-icon',
                headerShown: false,
                tabBarActiveTintColor: colors.yellow[500],
                tabBarInactiveTintColor: colors.gray[300],
                tabBarStyle: {
                    position: 'absolute',
                    height: sizes[22],
                    borderWidth: 0,
                    backgroundColor: colors.gray[800]
                },
                tabBarItemStyle: {
                    position: 'relative',
                    top: Platform.OS === 'android' ? -10 : 0
                }
            }}
        >
            <Screen name="new"
                component={New}
                options={{
                    tabBarLabel: "Novo bolão",
                    tabBarIcon: ({ color }) => <PlusCircle color={color} size={size} />
                }}
            />

            <Screen name="pools"
                component={Pools}
                options={{
                    tabBarLabel: "Meus bolões",
                    tabBarIcon: ({ color }) => <SoccerBall color={color} size={size} />
                }}
            />

            <Screen name="find"
                component={Find}
                options={{
                    tabBarButton: () => null
                }}
            />

            <Screen name="details"
                component={Details}
                options={{
                    tabBarButton: () => null
                }}
            />
        </Navigator>
    );
}