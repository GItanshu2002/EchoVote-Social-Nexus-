// aggregation

// win
const lookup_win = async () => {
  try {
    let lookupData = {
      $lookup: {
        from: "results",
        localField: "_id",
        foreignField: "winnerId",
        as: "user_post_win",
      },
    };
    return lookupData;
  } catch (err) {
    throw err;
  }
};

let unwind_win = async () => {
  try {
    let unwindData = {
      $unwind: "$user_post_win",
    };
    return unwindData;
  } catch (err) {
    throw err;
  }
};

// get win posts
const lookup_post_win = async () => {
  try {
    let lookupData = {
      $lookup: {
        from: "posts",
        localField: "user_post_win.postId",
        foreignField: "_id",
        as: "user_win_post",
      },
    };
    return lookupData;
  } catch (err) {
    throw err;
  }
};

let unwind_win_post = async () => {
  try {
    let unwindData = {
      $unwind: "$user_win_post",
    };
    return unwindData;
  } catch (err) {
    throw err;
  }
};

// losse
const lookup_losse = async () => {
  try {
    let lookupData = {
      $lookup: {
        from: "results",
        localField: "_id",
        foreignField: "losserId",
        as: "user_post_losse",
      },
    };
    return lookupData;
  } catch (err) {
    throw err;
  }
};

let unwind_losse = async () => {
  try {
    let unwindData = {
      $unwind: "$user_post_losse",
    };
    return unwindData;
  } catch (err) {
    throw err;
  }
};

const lookup_post_losse = async () => {
  try {
    let lookupData = {
      $lookup: {
        from: "posts",
        localField: "user_post_losse.postId",
        foreignField: "_id",
        as: "user_losse_post",
      },
    };
    return lookupData;
  } catch (err) {
    throw err;
  }
};

let unwind_losse_post = async () => {
  try {
    let unwindData = {
      $unwind: "$user_losse_post",
    };
    return unwindData;
  } catch (err) {
    throw err;
  }
};

// tie
const lookup_tie = async (user) => {
  try {
    let lookupData = {
      $lookup: {
        from: "results",
        pipeline: [
          {
            $match: {
              is_tie: true,
            },
          },
        ],
        as: "user_post_ties",
      },
    };
    return lookupData;
  } catch (err) {
    throw err;
  }
};

let unwind_tie = async () => {
  try {
    let unwindData = {
      $unwind: "$user_post_ties",
    };
    return unwindData;
  } catch (err) {
    throw err;
  }
};

const lookup_post_tie = async () => {
  try {
    let lookupData = {
      $lookup: {
        from: "posts",
        let: { post_id: "$user_post_ties.postId", user_id: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$_id", "$$post_id"] },
                  { $eq: ["$participant_joined", true] },
                  {
                    $or: [
                      { $eq: ["$userId", "$$user_id"] },
                      { $eq: ["$participant_id", "$$user_id"] },
                    ],
                  },
                ],
              },
            },
          },
        ],
        as: "user_tie_post",
      },
    };
    return lookupData;
  } catch (err) {
    throw err;
  }
};

let unwind_tie_post = async () => {
  try {
    let unwindData = {
      $unwind: "$user_tie_post",
    };
    return unwindData;
  } catch (err) {
    throw err;
  }
};

const match_data = async (user_data) => {
  return {
    $match: {
      _id: user_data._id,
    },
  };
};

// grouping
let group_data = () => {
  let groupData = {
    $group: {
      _id: "$_id",
      name: { $first: "$name" },
      winner: {
        $addToSet: "$user_win_post",
      },
      losser: {
        $addToSet: "$user_losse_post",
      },
      tie: {
        $addToSet: "$user_tie_post",
      },
    },
  };

  return groupData;
};

let project_win = async (query) => {
  try {
    let projectData = {
      $project: {
        _id: 1,
        name: 1,
        winner: 1,
      },
    };
    return projectData;
  } catch (err) {
    throw err;
  }
};
let project_losse = async (query) => {
  try {
    let projectData = {
      $project: {
        _id: 1,
        name: 1,
        losser: 1,
      },
    };
    return projectData;
  } catch (err) {
    throw err;
  }
};
let project_tie = async (query) => {
  try {
    let projectData = {
      $project: {
        _id: 1,
        name: 1,
        tie: 1,
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
  lookup_win,
  unwind_win,
  lookup_post_win,
  unwind_win_post,
  lookup_losse,
  unwind_losse,
  lookup_post_losse,
  unwind_losse_post,
  lookup_tie,
  unwind_tie,
  lookup_post_tie,
  unwind_tie_post,
  match_data,
  group_data,
  project_win,
  project_tie,
  project_losse,
  sort_data,
};
