import { Selector } from "testcafe";
fixture("First Test").page("http://localhost:3000/login");

test("Login Test", async t => {
  //   const username = Selector("#username-123");
  //   const password = Selector("#password-123");
  //   const loginButton = Selector("#login-button");

  //   if (username && password) {
  await t.typeText("#username-123", "sadasdasdsad");
  //   }
  //   await t.click(loginButton);

  // .typeText(password, "getshedy")
  // .click(loginButton);
});
