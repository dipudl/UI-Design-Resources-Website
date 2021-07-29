const Router         = require("express").Router();
const data           = require("../config/data.json");
const format_for_url = require("../config/format_url");


Router.get("/:name", (req, res) => {
  let design_name = req.params.name;

  if (design_name) {
    design_name = format_for_url(design_name);

    for (let i = 0; i < data.designs.length; i++) {
      const design = data.designs[i];

      if (format_for_url(design.title) === design_name) {
        return res.render("download", {
          ...data.download,
          ...design,
          image: design.thumbnail,
          page_url: data.download.base_url + "/design/" + format_for_url(design.title),
          keywords: `${design.title}, download free ui design template, free ui kits, free ui design, free sketch ui kit, free adobe xd ui kit, free figma ui kit, free invision studio ui kit, free icons, download free ui`,
          description: design.description,
          people_also_viewed: get_people_also_viewed(design),
          format_for_url: format_for_url,
        });
      }
    }

    return res.render("404", data.page_not_found);
  } else {
    res.render("404", data.page_not_found);
  }
});


function get_people_also_viewed(design) {
    const recommendation_count = data.config.recommendation_count;
    const all_designs = data.designs.filter((each_design) => {

        if(design.title === each_design.title)
          return false;

        for(let i=0; i<each_design.category.length; i++) {
          if(design.category.includes(each_design.category[i]))
            return true;
        }
        return false;
    });

    let selected_designs = [];

    if(all_designs.length <= recommendation_count) {
        selected_designs = all_designs;
    } else {
        // select random 3 designs for now
        // select actual 3 designs when there is data (when people start visiting)

        for(let i=0; selected_designs.length < recommendation_count; i++) {
            if(i>100) {
                selected_designs = all_designs.slice(0, recommendation_count);
                break;
            }

            const random = Math.floor(Math.random() * all_designs.length);
            let contains = false;

            for(let j=0; j<selected_designs.length; j++) {
                if(selected_designs[j].title === all_designs[random].title) {
                    contains = true;
                    break;
                }                   
            }

            if(!contains) selected_designs.push(all_designs[random]);
        }
    }

    return selected_designs;
}


module.exports = Router;
