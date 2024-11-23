"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";

const getUserByEmail = async (email: string) => {
  const { database } = await createAdminClient();

  const result = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    [Query.equal("email", [email])]
  );

  return result.total > 0 ? result.documents[0] : null;
};

const handleError = (error: any, message: string) => {
  console.log(error, message);
  throw error;
};

export const sendEmailOtp = async ({ email }: { email: string }) => {
  const { account } = await createAdminClient();

  try {
    const session = await account.createEmailToken(ID.unique(), email);
    return session.userId;
  } catch (error) {
    handleError(error, "failed to send email otp");
  }
};

export const createAccount = async ({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) => {
  const existingUser = await getUserByEmail(email);

  const accountId = await sendEmailOtp({ email });

  if (!accountId) {
    throw new Error("failed to send an otp");
  }

  if (!existingUser) {
    const { database } = await createAdminClient();

    await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        fullName,
        email,
        avatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqf0Wx4wmsKfLYsiLdBx6H4D8bwQBurWhx5g&s",
        accountId,
      }
    );
  }

  return parseStringify({ accountId });
};

export const verifyOtp = async ({accountId,password}: {accountId:string;password:string;}) => {
  try {
    const {account} = await createAdminClient()
    const session = await account.createSession(accountId, password);
    (await cookies()).set('appwrite-session',session.secret, {
      path:'/',
      httpOnly:true,
      sameSite: 'strict',
      secure: true
    });

    return parseStringify({sessionId: session.$id})
  } catch (error) {
    handleError(error, "failed to verify otp")
  }
}
