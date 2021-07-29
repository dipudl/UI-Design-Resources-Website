const Router         = require("express").Router();
const data           = require("../config/data.json");
const { categories } = require("../config/dynamic_data");
const format_for_url = require("../config/format_url");

function homepage(req, res, page_number) {
  const designs_size = data.designs.length;
  const page_items_count = data.config.page_items_count;
  const has_previous_page = page_number > 1;
  const has_next_page = designs_size > page_number * page_items_count;
  let previous_href = "",
    next_href = "";
  let designs = [];

  if (designs_size > (page_number - 1) * page_items_count) {
    designs = data.designs.slice(
      (page_number - 1) * page_items_count,
      page_number * page_items_count
    );
  } else {
    return res.render("404", data.page_not_found);
  }

  if (has_previous_page) {
    if (page_number > 2) {
      previous_href = `/page/${page_number - 1}`;
    } else {
      previous_href = "/";
    }
  }

  if (has_next_page) next_href = `/page/${page_number + 1}`;

  return res.render("home", {
    ...data.home,
    page_number: page_number,
    designs: designs,
    h1_name: "UI",
    h2_name: "design kits & templates",
    has_previous_page: has_previous_page,
    has_next_page: has_next_page,
    previous_href: previous_href,
    next_href: next_href,
    categories: categories,
    active: "All designs",
    format_for_url: format_for_url,
  });
}

Router.get("/", (req, res) => {
  homepage(req, res, 1);
});

Router.get("/page/:number", (req, res) => {
  const page_number = Number.parseInt(req.params.number);

  if (page_number) {
    homepage(req, res, page_number);
  } else {
    res.render("404", data.page_not_found);
  }
});

module.exports = Router;
