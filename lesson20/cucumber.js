module.exports = {
  default: {
    requireModule: ["ts-node/register"],
    require: ["src/steps/**/*.ts", "src/support/**/*.ts"],
    format: ["progress-bar", "html:reports/cucumber-report.html"],
    paths: ["features/**/*.feature"],
    worldParameters: {
      baseURL: "https://wishpicks.com",
    },
  },
};
