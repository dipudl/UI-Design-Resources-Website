const data           = require("./data.json");
const format_for_url = require("./format_url");

const categories = ["Landing Pages", "Apps", "UI Kits", "Wireframes", "Icons", "Illustrations"];
const softwares  = ["Figma", "Sketch", "Adobe XD", "Invision Studio", "Adobe Illustrator"];

data.designs.forEach((design) => {
  design.category.forEach((category) => {
    if (!categories.includes(category)) {
      categories.push(category);
    }
  });
});
data.designs.forEach((design) => {
  design.softwares.forEach((software) => {
    if (!softwares.includes(software)) {
      softwares.push(software);
    }
  });
});

const formatted_categories = categories.map((each_category) => {
  return format_for_url(each_category);
});
const formatted_softwares  = softwares.map((each_software) => {
  return format_for_url(each_software);
});

module.exports = {
  categories,
  softwares,
  formatted_categories,
  formatted_softwares,
};
