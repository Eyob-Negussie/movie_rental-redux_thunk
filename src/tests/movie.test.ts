import { Selector } from "testcafe";
fixture("First Test").skip.page("http://localhost:3000/movies");

test("should display a button", async t => {
  const newMovieButton = Selector("#new-movie-button").count;
  console.log("TCL: newMovieButton", newMovieButton);
  await t.expect(newMovieButton).eql(0);
});
