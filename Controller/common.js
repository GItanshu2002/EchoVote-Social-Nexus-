const Model = require("../Model/index");
const DAO = require("../DAO/index");
const moment = require("moment");
const notification = require("./notification");
const cron = require("node-cron");

const updateIsExpiredResults = async () => {
  try {
    let get_all_expired_post = await DAO.get_all_data(Model.post, {
      duration: { $lte: moment().valueOf() },
      isDeleted: false,
      isExpired: false,
    });
    console.log("get_all_expired_post", get_all_expired_post);
    if (get_all_expired_post.length) {
      await DAO.update_many(
        Model.post,
        {
          duration: { $lte: moment().valueOf() },
          isDeleted: false,
          isExpired: false,
        },
        {
          isExpired: true,
        }
      );

      for (let data of get_all_expired_post) {
        const winnerId =
          data.creator_post_vote_count > data.participant_post_vote_count
            ? data.userId
            : data.participant_id;

        const loserId =
          data.creator_post_vote_count < data.participant_post_vote_count
            ? data.userId
            : data.participant_id;

        const is_tie =
          data.creator_post_vote_count === data.participant_post_vote_count;

        const savedResult = {
          winnerId,
          loserId,
          is_tie,
          postId: data._id,
        };

        let result = await DAO.save_data(Model.result, savedResult);
        await notification.post_result(result);
        console.log("result", result);
      }
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const get_result = async () => {
  try {
    cron.schedule("* * * * *", updateIsExpiredResults);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// if the accessing user is the creator or his friend
const is_friend = async (user) => {
  console.log("is_allowed.....user.....", user);
  const result = await DAO.get_all_data(Model.friends, {
    $or: [{ request_to_id: user }, { request_by_id: user }],
    status: "approved",
    isDeleted: false,
  });
  console.log("result", result);
  if (result.length) {
    return result;
  }
  // Assuming the result is an array, you might want to check if it's not empty
};

let timeLeft = async (post) => {
  const timeNow = Date.now();
  const timeDifference = timeNow - post.duration;
  const duration = moment.duration(timeDifference);
  const time = duration.humanize();
  return time;
};

module.exports = {
  get_result,
  is_friend,
  timeLeft,
};
/*************************************************************************************************************/
// check if expired and save result for expired
// const get_result = async () => {
//   try {
//     // Get all posts that are not deleted and not expired
//     const get_all_post = await DAO.get_all_data(Model.post, {
//       isDeleted: false,
//       isExpired: false,
//     });

//     // Filter out posts based on the duration condition
//     const timeNow = Date.now();

//     // Process each post
//     for (const post of get_all_post) {
//       // Check if the post is expired
//       if (post.duration < timeNow) {
//         // Check if a result already exists for the post
//         const existingResult = await DAO.get_all_data(Model.result, {
//           postId: post._id,
//         });

//         if (!existingResult.length) {
//           // Determine the winner and loser based on vote counts
//           let winnerId, losserId;
//           if (post.creator_post_vote_count > post.participant_post_vote_count) {
//             winnerId = post.userId;
//             losserId = post.participant_id;
//           } else if (
//             post.creator_post_vote_count < post.participant_post_vote_count
//           ) {
//             winnerId = post.participant_id;
//             losserId = post.userId;
//           }

//           // Prepare data for the result
//           const set_data = {
//             postId: post._id,
//             winnerId,
//             losserId,
//             is_tie:
//               post.creator_post_vote_count === post.participant_post_vote_count,
//           };
//           // Save the result
//           await DAO.save_data(Model.result, set_data);
//           await notification.post_result(set_data);
//         }

//         // Mark the post as expired
//         await DAO.find_and_update_database(
//           Model.post,
//           { _id: post._id },
//           { isExpired: true },
//           { new: true }
//         );
//       }
//     }
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// };
