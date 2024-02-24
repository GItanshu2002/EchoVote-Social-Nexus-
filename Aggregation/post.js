// aggregation

const match_data = async (user_data) => {
  return {
    $match: {
      userId: user_data._id,
    },
  };
};

// user
const lookup_user = async () => {
  try {
    let lookupData = {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "creator_detail",
      },
    };
    return lookupData;
  } catch (err) {
    throw err;
  }
};

let unwind_user_data = async () => {
  try {
    let unwindData = {
      $unwind: "$creator_detail",
    };
    return unwindData;
  } catch (err) {
    throw err;
  }
};

let set_user_data = async () => {
  try {
    let setData = {
      $set: {
        creater_data: {
          user_name: "$creator_detail.name",
          user_phoneNumber: "$creator_detail.phoneNumber",
        },
      },
    };
    return setData;
  } catch (err) {
    throw err;
  }
};

// participant
const lookup_participant = async () => {
  try {
    let lookupData = {
      $lookup: {
        from: "users",
        localField: "participant_id",
        foreignField: "_id",
        as: "participant_detail",
      },
    };
    return lookupData;
  } catch (err) {
    throw err;
  }
};

const unwind_participant_data = async () => {
  try {
    let unwindData = {
      $unwind: "$participant_detail",
    };
    return unwindData;
  } catch (err) {
    throw err;
  }
};

let set_participant_data = async () => {
  try {
    let setData = {
      $set: {
        participant_data: {
          user_name: "$participant_detail.name",
          user_phoneNumber: "$participant_detail.phoneNumber",
        },
      },
    };
    return setData;
  } catch (err) {
    throw err;
  }
};

// common

let group_data = async () => {
  try {
    let groupData = {
      $group: {
        _id: "$_id",
        image: { $first: "$image" },
        createdAt: { $first: "$createdAt" },
        creater_data: { $first: "$creater_data" },
        participant_data: { $first: "$participant_data" },
      },
    };
    return groupData;
  } catch (err) {
    throw err;
  }
};

let project_data = async (query) => {
  try {
    let projectData = {
      $project: {
        _id: 1,
        image: 1,
        posts: 1,
        creater_data: 1,
        participant_data: 1,
        createdAt: 1,
      },
    };
    return projectData;
  } catch (err) {
    throw err;
  }
};

let sort_data = async (query) => {
  try {
    let sortData = {
      $sort: { createdAt: 1 },
    };
    return sortData;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  match_data,
  lookup_user,
  unwind_user_data,
  lookup_participant,
  unwind_participant_data,
  set_participant_data,
  group_data,
  set_user_data,
  project_data,
  sort_data,
};
