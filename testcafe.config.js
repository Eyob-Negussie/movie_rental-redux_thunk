const createTestCafe = require("testcafe");

async function setupTestCafe() {
  const testcafe = await createTestCafe("localhost");
  try {
    const runner = testcafe.createRunner();
    const failedCount = await runner
      .src("./src/tests/*.test.ts")
      .browsers(["chrome"])
      .run({
        skipJsErrors: true
      });

    console.log(`failed tests: ${failedCount}`);
    testcafe.close();
  } catch (error) {
    console.log("TCL: setupTestCafe -> error", error);
    testcafe.close();
  }
}

setupTestCafe();
