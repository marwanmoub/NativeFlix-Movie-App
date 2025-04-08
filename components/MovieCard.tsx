import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { icons } from '@/constants/icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import MaskedView from '@react-native-masked-view/masked-view';
import { images } from '@/constants/images';

type MovieParams = Movie | TrendingMovie | { type?: string; index?: number };

const MovieCard = ({
  title,
  id,
  poster_path,
  poster_url,
  vote_average,
  release_date,
  type = 'Movie',
  index,
}: MovieParams) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity
        style={{ width: (Dimensions.get('window').width - 40 - 2 * 20) / 3 }}
        className="mr-2 relative"
      >
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : poster_url
                ? `https://image.tmdb.org/t/p/w500${poster_url}`
                : 'https://placehold.co/600x400/1a1a1a/ffffff.png',
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />

        <Text
          className={`text-sm font-bold mt-2`}
          numberOfLines={type === 'Movie' ? 1 : 2}
          style={{
            color: type === 'Movie' ? Colors.white : Colors.light,
          }}
        >
          {title}
        </Text>

        {type === 'Movie' && (
          <View className="flex-row items-center justify-start gap-x-1">
            <Image source={icons.star} className="size-4 " />
            <Text className="text-white text-xs font-bold uppercase">
              {Math.round(vote_average / 2)}
            </Text>
          </View>
        )}

        <View className="flex-row items-center justify-between">
          {type === 'Movie' && (
            <Text
              className="text-xs font-medium mt-1"
              style={{ color: Colors.white }}
            >
              {release_date?.split('-')[0]}
            </Text>
          )}
          {/* <Text className="text-xs text-light-300 font-medium uppercase">
            Movie
          </Text> */}
        </View>

        {type === 'Trending' && (
          <View className="absolute bottom-9 -left-3.5 px-2 py-1 rounded-full">
            <MaskedView
              maskElement={
                <Text className="font-bold text-white text-7xl">
                  {index + 1}
                </Text>
              }
            >
              <Image
                source={images.rankingGradient}
                className="size-14"
                resizeMode="cover"
              />
            </MaskedView>
          </View>
        )}
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
