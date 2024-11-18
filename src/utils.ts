export const getApiUrl = (): string | undefined => {
  if (process.env.ENV === "dev") {
    return process.env.MONGODB_URI;
  } else {
    return process.env.MONGODB_URI_PROD;
  }
};