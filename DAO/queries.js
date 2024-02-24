// Find One and Update
const find_and_update_database = async (model, query, update, options) => {
  try {
    let update_data = await model.findOneAndUpdate(query, update, options);
    return update_data;
  } catch (err) {
    throw err;
  }
};

// Add new data
const save_data = async (model, data) => {
  try {
    let save_info = await model.create(data);
    return save_info;
  } catch (err) {
    throw err;
  }
};

// Find all documents
const get_all_data = async (model, query) => {
  try {
    let fetch_data = await model.find(query);
    return fetch_data;
  } catch (err) {
    return err;
  }
};

// Find One Document
const get_single_data = async (model, query) => {
  try {
    let fetch_data = await model.findOne(query);
    return fetch_data;
  } catch (err) {
    return err;
  }
};

// Update single Document
const find_and_update = async (model, query, update) => {
  try {
    let update_data = await model.updateOne(query, update);
    return update_data;
  } catch (err) {
    return err;
  }
};

// update mmany documents at once
const update_many = async (model, query, update) => {
  try {
    let update_data = await model.updateMany(query, update);
    return update_data;
  } catch (err) {
    return err;
  }
};

// Populating
const populate_data = async (model, query, collection_options) => {
  try {
    let fetch_data = await model
      .find(query)
      .populate(collection_options)
      .exec();
    return fetch_data;
  } catch (err) {
    return err;
  }
};

// count all for relevent query
const count_data = async (model, query) => {
  try {
    let fetch_data = await model.findAndCountAll(query);
    return fetch_data;
  } catch (err) {
    return err;
  }
};

// count all documents for relevent section
const count_data_mongo = async (model, query) => {
  try {
    let fetch_data = await model.countDocuments(query);
    return fetch_data;
  } catch (err) {
    return err;
  }
};

module.exports = {
  find_and_update_database,
  save_data,
  get_single_data,
  find_and_update,
  update_many,
  get_all_data,
  populate_data,
  count_data,
  count_data_mongo,
};
