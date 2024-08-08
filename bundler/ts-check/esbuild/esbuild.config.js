const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["src/index.ts"],
    outfile: "dist/bundle.js",
    bundle: true,
    minify: true,
    sourcemap: true,
    target: "es2020",
  })
  .then(() => {
    console.log("Build successful!");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
