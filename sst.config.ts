// sst.config.ts
export default $config({
  app(input) {
    return {
      name: "notify",
      removal: "remove",
      home: "aws",
    };
  },
  async run() {
  
    const api = new sst.aws.Function("Notify", {
      handler: "apps/api/src/lambda.ts",
      url: true,
    });

    new sst.aws.StaticSite("Notify", {
      path: "apps/ui",
      build: {
        command: "pnpm run build",
        output: "dist",
      },
      environment: {
        VITE_API_URL: api.url,
      },
    });

    return {
      api: api.url,
    };
  },
});