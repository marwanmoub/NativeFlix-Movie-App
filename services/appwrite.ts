import { Client, Databases, ID, Query } from 'react-native-appwrite';

export interface ActionResponse<T = null> {
  data?: T;
  success?: boolean;
  error?: {
    message: string;
  };
  status?: number;
}

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID || '';
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID || '';

if (!DATABASE_ID || !COLLECTION_ID) {
  throw new Error(
    'Database ID or Collection ID is missing. Please check your environment variables.',
  );
}

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const updateSearchCount = async (
  query: string,
  movie: Movie,
): Promise<ActionResponse<string>> => {
  //before we add a count to the query that is being searched for, we have to check if it exists in the appwrite database
  //if found, increment the count field
  //if not found, create new document in appwrite database
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal('searchTerm', query),
    ]);

    console.log(result);

    if (!result) {
      return {
        status: 500,
        success: false,
        error: {
          message: 'Could not search for documents',
        },
      };
    }

    if (result.documents.length > 0) {
      const documentId = result.documents[0].$id;
      const updateSearchCount = await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        documentId,
        {
          count: result.documents[0].count + 1,
        },
      );

      if (updateSearchCount) {
        return { success: true, data: updateSearchCount.$id, status: 201 };
      } else {
        return {
          success: false,
          error: { message: 'Could not update search count' },
        };
      }
    }

    const creationResult = await database.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      {
        count: 1,
        searchTerm: query,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        title: movie.title,
      },
    );

    if (creationResult) return { success: true, status: 201 };
    return {
      status: 500,
      success: false,
      error: { message: 'An error occurred while processing the request.' },
    };
    return { success: true };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
