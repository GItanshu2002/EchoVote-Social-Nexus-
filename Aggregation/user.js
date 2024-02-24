// aggregation

// we are getting all the posts
const lookup_user = async () => {
  try {
    let lookupData = {
      $lookup: {
        from: "posts",
        localField: "_id",
        foreignField: "userId",
        as: "post_detail",
      },
    };
    return lookupData;
  } catch (err) {
    throw err;
  }
};

// if we want user specific
const match_data = async (user_data) => {
  return {
    $match: {
      _id: user_data._id,
    },
  };
};

let unwind_user_data = async () => {
  try {
    let unwindData = {
      $unwind: "$post_detail",
    };
    return unwindData;
  } catch (err) {
    throw err;
  }
};

// common

let group_data = () => {
  let groupData = {
    $group: {
      _id: "$_id",
      name: { $first: "$name" },
      phoneNumber: { $first: "$phoneNumber" },
      userName: { $first: "$userName" },
      email: { $first: "$email" },
      post_data: {
        $addToSet: {
          post_id: { $ifNull: ["$post_detail._id", null] },
          post_image: { $ifNull: ["$post_detail.image", null] },
          post_type: { $ifNull: ["$post_detail.postType", null] },
          participant_id: { $ifNull: ["$post_detail.participant_id", null] },
          participant_post_image: {
            $ifNull: ["$post_detail.participant_post_Image", null],
          },
          participant_post_description: {
            $ifNull: ["$post_detail.participant_post_discription", null],
          },
          createdAt: { $ifNull: ["$post_data.createdAt", null] },
        },
      },
    },
  };
  return groupData;
};

let project_data = async (query) => {
  try {
    let projectData = {
      $project: {
        _id: 1,
        name: 1,
        phoneNumber: 1,
        userName: 1,
        email: 1,
        post_data: 1,
      },
    };
    return projectData;
  } catch (err) {
    throw err;
  }
};

let sort_data = async () => {
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
  group_data,
  project_data,
  sort_data,
};
