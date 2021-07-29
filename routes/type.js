const Router                                         = require("express").Router();
const { categories, softwares, formatted_softwares } = require("../config/dynamic_data");
const data                                           = require("../config/data.json");
const format_for_url                                 = require("../config/format_url");

Router.get("/:name", (req, res) => {
  let software_name = req.params.name;

  if (software_name) {
    const formatted_software_name = format_for_url(software_name);

    if (formatted_softwares.includes(formatted_software_name)) {
      softwares.forEach((element) => {
        if (format_for_url(element) === formatted_software_name)
          software_name = element;
      });

      software(req, res, software_name, formatted_software_name, 1);
    } else {
      res.render("404", data.page_not_found);
    }
  } else {
    res.render("404", data.page_not_found);
  }
});

Router.get("/:name/page/:number", (req, res) => {
  let software_name = req.params.name;
  const page_number = Number.parseInt(req.params.number);

  if (software_name && page_number) {
    const formatted_software_name = format_for_url(software_name);

    if (formatted_softwares.includes(formatted_software_name)) {
      softwares.forEach((element) => {
        if (format_for_url(element) === formatted_software_name)
          software_name = element;
      });

      software(req, res, software_name, formatted_software_name, page_number);
    } else {
      res.render("404", data.page_not_found);
    }
  } else {
    res.render("404", data.page_not_found);
  }
});

function software(
  req,
  res,
  software_name,
  formatted_software_name,
  page_number
) {
  const all_designs = data.designs.filter((design) => {
    return design.softwares.includes(software_name);
  });
  const designs_size = all_designs.length;
  const page_items_count = data.config.page_items_count;
  const has_previous_page = page_number > 1;
  const has_next_page = designs_size > page_number * page_items_count;
  let previous_href = "",
    next_href = "";
  let designs = [];

  if (designs_size > (page_number - 1) * page_items_count) {
    designs = all_designs.slice(
      (page_number - 1) * page_items_count,
      page_number * page_items_count
    );
  } else {
    return res.render("404", data.page_not_found);
  }

  if (has_previous_page) {
    if (page_number > 2) {
      previous_href = `/type/${formatted_software_name}/page/${
        page_number - 1
      }`;
    } else {
      previous_href = `/type/${formatted_software_name}`;
    }
  }

  if (has_next_page)
    next_href = `/type/${formatted_software_name}/page/${page_number + 1}`;

  const h1_name =
    software_name.charAt(software_name.length - 1) === "s"
      ? software_name.slice(0, -1)
      : software_name;
  const h2_name = `${h1_name} design resources`;

  return res.render("home", {
    ...data.home,
    page_number: page_number,
    designs: designs,
    title: `Download Free ${h1_name} Design Resources for Your Projects`,
    canonical: `/type/${formatted_software_name}`,
    h1_name: h1_name,
    h2_name: h2_name,
    has_previous_page: has_previous_page,
    has_next_page: has_next_page,
    previous_href: previous_href,
    next_href: next_href,
    categories: categories,
    active: software_name,
    format_for_url: format_for_url,
  });
}

module.exports = Router;
