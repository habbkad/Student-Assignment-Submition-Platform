const mongoose = require("mongoose");
const resourceModel = require("../models/learning_resources");
const errorResponse = require("../utils/errorResponse");
const resourcesModel = require("../models/learning_resources");

//desc   create new resource
//route  api/v1/resource
//secure true
exports.create_resource = async (req, res, next) => {
  //onsole.log(req);
  const { module, week, title } = req.body;
  const duplicate_resource = await resourceModel.find({ week });

  //   if (duplicate_resource) {
  //     return next(new errorResponse(`resource with week ${week} found`, 500));
  //   }

  const resource = await resourceModel.create(req.body);
  resource.save();
  console.log(resource);
  res.send({
    message: "Successful",
    resource,
  });
};

//desc   update resource
//route  api/v1/resource
//secure true
exports.update_resource = async (req, res, next) => {
  const { id } = req.params;
  const { module, week, resourceLink, stack } = req.body;

  try {
    const verify = await resourceModel.findById(id);
    if (!verify) {
      return next(new errorResponse(`resource of ${id} not  found`, 400));
    }
    const resource = await resourcesModel.findByIdAndUpdate(id, {
      module,
      week,
      resourceLink,
      stack,
    });
    res.send({ message: "resource updated", resource });
  } catch (error) {
    return next(new errorResponse(`resource of id:${id} not  found`, 400));
  }
};

//desc   delete resource
//route  api/v1/resource
//secure true
exports.delete_resource = async (req, res, next) => {
  const { id } = req.params;

  try {
    const verify = await resourceModel.findById(id);
    if (!verify) {
      return next(new errorResponse(`resource of ${id} not  found`, 400));
    }
    const resource = await resourcesModel.findByIdAndDelete(id);
    res.send({ message: "resource updated", resource });
  } catch (error) {
    return next(new errorResponse(`resource of id:${id} not  found`, 400));
  }
};

//desc   get all resource
//route  api/v1/resource
//secure true
exports.get_all_resource = async (req, res, next) => {
  let Html = [];
  let Css = [];
  let Responsive = [];
  try {
    const resource = await resourcesModel.find();

    for (let item of resource) {
      if (item.module == "HTML") {
        Html.push(item);
      }
      if (item.module == "Css") {
        Css.push(item);
      }
      if (item.module == "Bootstrap") {
        Responsive.push(item);
      }
    }

    let html = sort(Html);
    let css = sort(Css);
    let responsive = sort(Responsive);

    res.send({
      message: "get all resource",
      resource: { html, css, responsive },
    });
  } catch (error) {
    return next(new errorResponse(`resource of  not  found`, 400));
  }
};

const sort = (course) => {
  let one = [];
  let two = [];
  let three = [];
  let four = [];
  let five = [];
  let six = [];
  for (let item of course) {
    if (item.week == 1) {
      one.push(item);
    }
    if (item.week == 2) {
      two.push(item);
    }
    if (item.week == 3) {
      three.push(item);
    }
    if (item.week == 4) {
      four.push(item);
    }
    if (item.week == 5) {
      five.push(item);
    }
  }
  return { one, two, three, four, five, six };
};
