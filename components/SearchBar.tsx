/* eslint-disable prettier/prettier */
import { View, Image, TextInput } from 'react-native';
import React from 'react';
import { icons } from '@/constants/icons';

interface SearchBarProps {
  placeholder: string;
  onPress?: () => void;
}

const SearchBar = ({ onPress, placeholder }: SearchBarProps) => {
  //   const [value, setValue] = React.useState<string>('');

  return (
    <View
      className="bg-dark-200 rounded-full px-5 py-4"
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value=""
        onChangeText={() => {}}
        placeholderTextColor="#a8b5db"
        className="flex-1 ml-3 text-white"
      />
    </View>
  );
};

export default SearchBar;
