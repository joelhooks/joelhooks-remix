function getEnv() {
  return {
    FLY: process.env.FLY,
    NODE_ENV: process.env.NODE_ENV,
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    PRIMARY_REGION: process.env.PRIMARY_REGION,
    GITHUB_ARTICLES_ACCOUNT: process.env.GITHUB_ARTICLES_ACCOUNT,
    GITHUB_ARTICLES_REPO: process.env.GITHUB_ARTICLES_REPO,
  }
}

type ENV = ReturnType<typeof getEnv>

// App puts these on
declare global {
  // eslint-disable-next-line
  var ENV: ENV
  interface Window {
    ENV: ENV
  }
}

export {getEnv}
