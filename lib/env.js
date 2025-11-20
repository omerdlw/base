const requiredEnvVars = ["NEXT_PUBLIC_API_URL"];
const requiredServerEnvVars = ["MONGODB_URI", "MONGODB_DB"];

export function validateEnv() {
  const missingVars = [];

  requiredEnvVars.forEach((key) => {
    if (!process.env[key]) {
      missingVars.push(key);
    }
  });

  if (typeof window === "undefined") {
    requiredServerEnvVars.forEach((key) => {
      if (!process.env[key]) {
        missingVars.push(key);
      }
    });
  }

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}`
    );
  }
}

export function getEnv(key, defaultValue) {
  const value = process.env[key];
  if (!value && defaultValue === undefined) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value || defaultValue;
}
