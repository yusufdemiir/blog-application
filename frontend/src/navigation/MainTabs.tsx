// navigation/MainTabs.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Posts from '../screens/posts';
import Create from '../screens/create';
import Profile from '../screens/profile';
import { Ionicons } from '@expo/vector-icons';

export type TabParamList = {
  Posts: undefined;
  Create: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let icon = 'home';
          if (route.name === 'Create') icon = 'add-circle';
          if (route.name === 'Profile') icon = 'person';
          return <Ionicons name={icon as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Posts"   component={Posts}   options={{ title: 'Postlar' }} />
      <Tab.Screen name="Create"  component={Create}  options={{ title: 'Oluştur' }} />
      <Tab.Screen name="Profile" component={Profile} options={{ title: 'Profil' }} />
    </Tab.Navigator>
  );
}