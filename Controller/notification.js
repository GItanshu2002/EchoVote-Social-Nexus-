const Model = require("../Model/index");
const DAO = require("../DAO/index");
const FCM = require("fcm-node");
const Cryptr = require("cryptr");
const countryTimezone = require("country-timezone");
const cryptr = new Cryptr("THisIsTHeSecRetKeY");
const cron = require("node-cron");
const moment = require("moment-timezone"); // not the moment npm

const serverKey = " Add server Keys "; // add your fcm server key 
const fcm = new FCM(serverKey);
let message = {};

let findreciver = async (userid) => {
  let reciver = await DAO.get_single_data(Model.user, { _id: userid });
  return reciver;
};

// Function to send notification
const sendNotification = (message) => {
  fcm.send(message, function (err, response) {
    if (err) {
      console.log(err);
      console.log("Something has gone wrong!");
    } else {
      console.log("Successfully sent with response: ", response);
    }
  });
};

// Welcome
const welcome = async (payload) => {
  try {
    let set_data = {
      sender_id: null,
      reciver_id: payload._id,
      message: "Welcome to lybra ",
      notification_type: "Onbording",
      title: "welcome",
    };
    let reciver = findreciver(set_data.reciver_id).deviceToken;
    message = {
      to: reciver,
      notification: {
        title: set_data.title,
        body: set_data.message,
      },
    };
    await DAO.save_data(Model.notification, set_data);
    sendNotification(message);
  } catch (err) {
    throw err;
  }
};

// First Lybra of the day
const first_lybra_of_the_day = async () => {
  try {
    const encryptedString = cryptr.encrypt(
      "Wake up time for your first lybra of the day"
    ); // endocde the msg

    const decryptedString = cryptr.decrypt(encryptedString); // decode it for the user

    // Function to send notification to user
    let notificationss = async (userId, deviceToken) => {
      console.log("msg sent: ", encryptedString);
      let set_data = {
        sender_id: null,
        reciver_id: userId,
        message: encryptedString, // saved as encode
        notification_type: "Onbording",
        title: "welcome",
      };
      message = {
        to: deviceToken,
        notification: {
          title: set_data.title,
          body: decryptedString, // make it readeable for user
        },
      };

      await DAO.save_data(Model.notification, set_data); // save notification in db
      sendNotification(message); // send message data to the sendNotification veriable to send notification
    };
    const users = await DAO.get_all_data(Model.user, { isDeleted: false }); //  get all users
    users.forEach(async (user) => {
      let deviceToken = user.deviceToken;
      const timezones = countryTimezone.getTimezones(user.country); // using country saved in user db get time zone
      if (timezones.length > 0) {
        const timeZone = timezones[0]; // only select first time zone
        const sent_notification_at = "0 7 * * *"; // set time
        cron.schedule(sent_notification_at, async () => {
          const currentTime = moment().tz(timeZone); // get the time for the give time zone
          if (currentTime.hours() === 7 && currentTime.minutes() === 0) {
            // Send notification to user
            await notificationss(user._id, deviceToken);
          } else {
            throw "Timezone not found for user's country";
          }
        });
      } else {
        console.log("msg not sent");
        throw err;
      }
    });
  } catch (err) {
    throw err;
  }
};

// Send notification for new friend request
const send_friend_req = async (payload) => {
  try {
    let set_data = {
      sender_id: payload.request_by_id,
      reciver_id: payload.request_to_id,
      message: "Sent you a friend request",
      notification_type: "FriendRequest",
      title: "Friend Request",
    };
    let reciver = findreciver(set_data.reciver_id).deviceToken;
    message = {
      to: reciver,
      notification: {
        title: set_data.title,
        body: set_data.message,
      },
    };
    let genrate_notification = await DAO.save_data(
      Model.notification,
      set_data
    );
    sendNotification(message);
    return genrate_notification;
  } catch (err) {
    throw err;
  }
};

// Respond to friend request
const respond_to_friend_req = async (payload) => {
  try {
    let set_data = {
      sender_id: payload.request_by_id,
      reciver_id: payload.request_to_id,
      message: `${payload.status} Your friend request`,
      notification_type: "FriendRequest",
      title: "Friend Request Responce",
    };
    let reciver = findreciver(set_data.reciver_id).deviceToken;
    message = {
      to: reciver,
      notification: {
        title: set_data.title,
        body: set_data.message,
      },
    };
    let genrate_notification = await DAO.save_data(
      Model.notification,
      set_data
    );
    sendNotification(message);
    return genrate_notification;
  } catch (err) {
    throw err;
  }
};

// Send notification for invited user on a post
const invited_user_post = async (payload) => {
  try {
    const set_data = {
      sender_id: payload.userId,
      message: "invited you on their lybra",
      notification_type: "PostInvitation",
      title: "You Are Invited",
    };
    let reciver = findreciver(set_data.reciver_id).deviceToken;
    message = {
      to: reciver,
      notification: {
        title: set_data.title,
        body: set_data.message,
      },
    };

    const invitedUser = payload.invited_user_id;

    for (const user of invitedUser) {
      set_data.reciver_id = new ObjectID(user);
      await DAO.save_data(Model.notification, set_data);
    }
    sendNotification(message);
  } catch (err) {
    throw err;
  }
};

// Join post
const join_post = async (payload) => {
  try {
    let set_data = {
      sender_id: payload.participant_id,
      reciver_id: payload.userId,
      message: "Uploaded a media to your lybra",
      notification_type: "Post",
      title: "Lybra Joined",
    };
    let reciver = findreciver(set_data.reciver_id).deviceToken;
    message = {
      to: reciver,
      notification: {
        title: set_data.title,
        body: set_data.message,
      },
    };
    let genrate_notification = await DAO.save_data(
      Model.notification,
      set_data
    );
    sendNotification(message);
    return genrate_notification;
  } catch (err) {
    throw err;
  }
};

// Follow post
const follow_post = async (payload) => {
  try {
    let set_data = {
      sender_id: payload.followerId,
      reciver_id: payload.userId,
      message: "Started to follow your lybra",
      notification_type: "Follow",
      title: "Lybra Joined",
    };
    let reciver = findreciver(set_data.reciver_id).deviceToken;
    message = {
      to: reciver,
      notification: {
        title: set_data.title,
        body: set_data.message,
      },
    };
    let genrate_notification = await DAO.save_data(
      Model.notification,
      set_data
    );
    sendNotification(message);
    return genrate_notification;
  } catch (err) {
    throw err;
  }
};

// Vote on post
const vote_post = async (payload) => {
  try {
    let set_data = {
      sender_id: payload.voterId,
      reciver_id: payload.userId,
      message: "Voted on your lybra",
      notification_type: "Vote",
      title: "Lybra Joined",
    };
    let reciver = findreciver(set_data.reciver_id).deviceToken;
    message = {
      to: reciver,
      notification: {
        title: set_data.title,
        body: set_data.message,
      },
    };
    let genrate_notification = await DAO.save_data(
      Model.notification,
      set_data
    );
    sendNotification(message);
    return genrate_notification;
  } catch (err) {
    throw err;
  }
};

// Comment on post
const comment_post = async (payload) => {
  try {
    let findPost = await DAO.get_single_data(Model.post, {
      _id: payload.postId,
    });
    let reciverId = [findPost.userId, findPost.participant_id];
    let set_data = {
      sender_id: payload.commentBy,
      message: `Commented on your lybra ${findPost.discription}`,
      notification_type: "Comment",
      title: "New Comment",
    };
    for (const user of reciverId) {
      set_data.reciver_id = user;
      await DAO.save_data(Model.notification, set_data);
      let reciver = findreciver(user).deviceToken;
      message = {
        to: reciver,
        notification: {
          title: set_data.title,
          body: set_data.message,
        },
      };
      sendNotification(message);
    }
  } catch (err) {
    throw err;
  }
};

// Comment reply
const commentReply = async (payload) => {
  try {
    let findcomment = await DAO.get_single_data(Model.comment, {
      _id: payload.commentId,
    });
    let set_data = {
      sender_id: payload.replyBy,
      reciver_id: findcomment.commentBy,
      message: `Reply to your comment on lybra`,
      notification_type: "Comment",
      title: "Comment Reply",
    };
    let reciver = findreciver(set_data.reciver_id).deviceToken;
    message = {
      to: reciver,
      notification: {
        title: set_data.title,
        body: set_data.message,
      },
    };
    let genrate_notification = await DAO.save_data(
      Model.notification,
      set_data
    );
    sendNotification(message);
    return genrate_notification;
  } catch (err) {
    throw err;
  }
};

// Post reply
const post_reply = async (payload) => {
  try {
    let findPost = await DAO.get_single_data(Model.post, {
      _id: payload.postId,
    });
    let reciverId = [findPost.userId, findPost.participant_id];
    let set_data = {
      sender_id: payload.replyBy,
      message: "Replyed to lybra",
      notification_type: "Post",
      title: "Reply",
    };
    let reciver = findreciver(set_data.reciver_id).deviceToken;
    message = {
      to: reciver,
      notification: {
        title: set_data.title,
        body: set_data.message,
      },
    };
    for (const user of reciverId) {
      set_data.reciver_id = user;
      await DAO.save_data(Model.notification, set_data);
    }
    sendNotification(message);
  } catch (err) {
    throw err;
  }
};

// Post result
const post_result = async (payload) => {
  try {
    let findPost = await DAO.get_single_data(Model.post, {
      _id: payload.postId,
    });
    let findFollowers = await DAO.get_all_data(Model.postFollower, {
      postId: payload.postId,
    });
    let reciverId = [findPost.userId, findPost.participant_id];
    for (const user of findFollowers) {
      reciverId.push(user.followedBy);
    }
    let set_data = {
      sender_id: findPost.userId,
      message: "Result declaired",
      notification_type: "Result",
      title: "Reply",
    };
    let reciver = findreciver(set_data.reciver_id).deviceToken;
    message = {
      to: reciver,
      notification: {
        title: set_data.title,
        body: set_data.message,
      },
    };
    for (const user of reciverId) {
      set_data.reciver_id = user;
      await DAO.save_data(Model.notification, set_data);
    }
    sendNotification(message);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  welcome,
  first_lybra_of_the_day,
  send_friend_req,
  respond_to_friend_req,
  invited_user_post,
  join_post,
  follow_post,
  vote_post,
  comment_post,
  commentReply,
  post_reply,
  post_result,
};
