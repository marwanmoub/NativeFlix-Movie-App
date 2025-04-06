import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { icons } from '@/constants/icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const MovieCard = ({
  title,
  id,
  poster_path,
  vote_average,
  release_date,
}: Movie) => {
  return (
    <Link href={`/movies/${id}`}>
      <TouchableOpacity
        style={{ width: (Dimensions.get('window').width - 40 - 2 * 20) / 3 }}
        className="mr-2"
      >
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : 'https://placehold.co/600x400/1a1a1a/ffffff.png',
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {title}
        </Text>

        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="size-4 " />
          <Text className="text-white text-xs font-bold uppercase">
            {Math.round(vote_average / 2)}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text
            className="text-xs font-medium mt-1"
            style={{ color: Colors.white }}
          >
            {release_date?.split('-')[0]}
          </Text>
          {/* <Text className="text-xs text-light-300 font-medium uppercase">
            Movie
          </Text> */}
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
