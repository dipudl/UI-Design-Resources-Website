const express       = require("express");
const data          = require("./config/data.json");
const app           = express();
const PORT          = process.env.PORT || 8000;
const home_page     = require("./routes/home");
const category_page = require("./routes/category");
const type_page     = require("./routes/type");
const download_page = require("./routes/download");

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use("/", home_page);
app.use("/category", category_page);
app.use("/type", type_page);
app.use("/design", download_page);

app.use((req, res, next) => {
  return res.render("404", data.page_not_found);
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}...`);
});