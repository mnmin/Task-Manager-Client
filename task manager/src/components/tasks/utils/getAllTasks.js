import client from "../../../utils/client";
// import moment from 'moment';

// const secOneMin = 60;
// const secOneHour = secOneMin * 60;
// const secOneDay = secOneHour * 24;

// export function formatTime(timeString) {
//   const time = new Date(timeString);
//   const now = new Date();
//   const diff = (now - time) / 1000;
//   const timeArr = time.toUTCString().split(' ');
//   let formatted;

//   if (time.getFullYear < now.getFullYear()) {
//     formatted = timeArr.slice(1, 4).join(' ');
//   } else if (diff >= secOneDay) {
//     formatted = timeArr.slice(1, 3).join(' ');
//   } else if (diff >= secOneHour) {
//     const hoursPassed = Math.floor(diff / secOneHour);
//     formatted = hoursPassed + ' hours ago';
//   } else if (diff >= secOneMin) {
//     const minutesPassed = Math.floor(diff / secOneMin);
//     formatted = minutesPassed + ' minutes ago';
//   } else if (diff < secOneMin) {
//     formatted = 'less than one minutes ago';
//   }

//   return formatted;
// }

async function getAllTasks() {
  try {
    const response = await client.get("/tasks");
    return response.data.data;
  } catch (err) {
    console.error("tasks error", err);
  }
}

// function getPostsWithin7Days(posts) {
//   let postsInAWeek = [];
//   if (posts.length > 0) {
//     let lastWeek = moment().subtract(6, "days").format("L");
//     lastWeek = new Date(lastWeek);
//     postsInAWeek = posts.filter((post) =>
//       new Date(post.createdAt) > lastWeek ? post : null
//     );
//   }
//   return postsInAWeek;
// }

// function getPopularity(post) {
//   return post.comments.length + post.likes.length;
// }

// function getMostPopularPosts(posts) {
//   let mostPopular = [];
//   posts.forEach((post, index) => {
//     if (index === 0) {
//       mostPopular.push(post);
//     } else if (getPopularity(mostPopular[0]) < getPopularity(post)) {
//       mostPopular = [post];
//     } else if (getPopularity(mostPopular[0]) === getPopularity(post)) {
//       mostPopular.push(post);
//     }
//   });

//   return mostPopular;
// }

export function renderTasks(setTasks) {
  let allTasks = [];
  getAllTasks()
    .then((response) => {
      allTasks = response;

      //   const mostPopular = getMostPopularPosts(getPostsWithin7Days(allPosts));
      //   setPostsOfTheWeek(mostPopular);

      //   const postsToRender = allPosts.filter(
      //     (post) => !mostPopular.includes(post)
      //   );
      setTasks(allTasks);
    })
    .catch((err) => console.error(err));
}

// function getThePinnedPost(posts) {
//   let onlyPinned = [];
//   posts.forEach((post, index) => {
//     if (post.isPinned) {
//       onlyPinned.push(post);
//     }
//   });
//   return onlyPinned;
// }

// async function getAllTasksById(foundUserId) {
//   try {
//     if (foundUserId) {
//       const response = await client.get(`/tasks?user=${foundUserId}`);
//       return response.data.data;
//     }
//   } catch (err) {
//     console.error(err);
//   }
// }

// export function renderPinnedPosts(setPosts, setPinnedPost, foundUserId) {
//   let allPosts = [];
//   getAllTasksById(foundUserId)
//     .then((response) => {
//       if (response) {
//         allPosts = response;
//         const thePinned = getAllTasksById(allPosts);
//         setPinnedPost(thePinned);

//         const postsToRender = allPosts.filter(
//           (post) => !thePinned.includes(post)
//         );
//         setPosts(postsToRender);
//       }
//     })
//     .catch((err) => console.error(err));
// }
