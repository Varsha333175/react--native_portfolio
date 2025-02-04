import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import ProjectsScreen from '../screens/ProjectsScreen';
import SkillsScreen from '../screens/SkillsScreen';
import ContactScreen from '../screens/ContactScreen';
import WorkScreen from '../screens/WorkScreen';
const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Projects') {
              iconName = focused ? 'folder' : 'folder-outline';
            } else if (route.name === 'Skills') {
              iconName = focused ? 'flash' : 'flash-outline';
            
            } else if (route.name === 'Work Exp') {
              iconName = focused ? 'briefcase' : 'briefcase-outline';
            }
            
            else if (route.name === 'Contact') {
              iconName = focused ? 'person' : 'person-outline';
            }
            
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#1DB954',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#121212',
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Projects" component={ProjectsScreen} />
        <Tab.Screen name="Skills" component={SkillsScreen} />
        {<Tab.Screen name="Work Exp" component={WorkScreen} />}
        <Tab.Screen name="Contact" component={ContactScreen} />        
      </Tab.Navigator>
    </NavigationContainer>
  );
}
