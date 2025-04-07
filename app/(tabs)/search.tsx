import { View, Image, FlatList, ActivityIndicator, Text } from 'react-native';
import React, { useEffect } from 'react';
import { images } from '@/constants/images';
import MovieCard from '@/components/MovieCard';
import useFetch from '@/services/useFetch';
import { fetchMovies } from '@/services/api';
import { icons } from '@/constants/icons';
import SearchBar from '@/components/SearchBar';
import { updateSearchCount } from '@/services/appwrite';

const Search = () => {
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: loadMovies,
    reset,
  } = useFetch(
    () =>
      fetchMovies({
        query: searchQuery,
      }),
    false,
  );

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();

        if (movies?.length > 0 && movies?.[0]) {
          await updateSearchCount(searchQuery, movies[0]);
        }
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        className="px-5"
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>

            <View className=" my-10">
              <SearchBar
                placeholder="Search movies..."
                value={searchQuery}
                onChangeText={(text: string) => {
                  setSearchQuery(text);
                }}
              />
            </View>

            {moviesLoading ? (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            ) : moviesError ? (
              <Text className="px-5 my-3" style={{ color: 'red' }}>
                Error: {moviesError.message}
              </Text>
            ) : !(movies?.length === 0) && !(searchQuery?.length === 0) ? (
              <Text className="text-xl text-white font-bold">
                Search Results for{' '}
                <Text className="text-accent">{searchQuery.trim()}</Text>
              </Text>
            ) : null}
          </>
        }
        ListEmptyComponent={
          !moviesLoading && !moviesError && searchQuery.length > 0 ? (
            <View className="mt-4">
              <Text className="text-center text-gray-500">
                No results found for {searchQuery.trim()}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
