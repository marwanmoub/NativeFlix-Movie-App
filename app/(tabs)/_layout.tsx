import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';

const _layout = () => {
  return (
    <View className="flex flex-col">
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{ headerShown: false, title: 'Home' }}
        />

        <Tabs.Screen
          name="search"
          options={{ title: 'Search', headerShown: false }}
        />

        <Tabs.Screen
          name="saved"
          options={{ title: 'Saved', headerShown: false }}
        />

        <Tabs.Screen
          name="profile"
          options={{ title: 'Profile', headerShown: false }}
        />
      </Tabs>
    </View>
  );
};

export default _layout;
