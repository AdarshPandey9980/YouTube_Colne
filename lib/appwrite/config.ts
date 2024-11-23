export const appwriteConfig = {
    endpointUrl: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT!,
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
    userCollectionId: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_USERS!,
    fileCollectionId: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_FILES!,
    bucketId: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BUCKET!,
    secretKey: process.env.NEXT_APPWRITE_SECRET_KEY!,
}