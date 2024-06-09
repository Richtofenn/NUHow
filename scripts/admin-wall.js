import { posts, addPost } from "./data/posts.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

function renderWall() {
  let postsHTML = ``;
  posts.forEach((post) => {
    let postTime = dayjs(post.time);
    let now = dayjs();

    let displayedTime;

    let secondsAgo = now.diff(postTime, 'second');
    let minutesAgo = now.diff(postTime, 'minute');
    let hoursAgo = now.diff(postTime, 'hour');
    let daysAgo = now.diff(postTime, 'day');

    if (secondsAgo < 60) {
      displayedTime = secondsAgo > 1 ? `${secondsAgo} seconds ago` : `${secondsAgo} second ago`;
    } else if (minutesAgo < 60) {
      displayedTime = minutesAgo > 1 ? `${minutesAgo} minutes ago` : `${minutesAgo} minute ago`;
    } else if (hoursAgo < 24) {
      displayedTime = hoursAgo > 1 ? `${hoursAgo} hours ago` : `${hoursAgo} hour ago`;
    } else {
      displayedTime = daysAgo > 1 ? `${daysAgo} days ago` : `${daysAgo} day ago`;
    }

    postsHTML += `
      <div class="post-container">
        <div class="profile-container">
          <div class="profile-image-container">
            <img src="${post.profilePicture || 'images/bulldog.jpeg'}" alt="Profile Picture">
          </div>
          <div class="details-container">
            <p class="title">${post.title}</p>
            <p class="name">${post.author}</p>
            <p class="status">${displayedTime}</p>
          </div>
          <div class="topic-image-container">
            <img src="${post.topic}">
          </div>
        </div>
        <div class="message-container">
          <p style="background-color:${post.theme}">${post.message}</p>  
        </div>
      </div>
    `;
  });

  document.querySelector('.js-posts-list-container').innerHTML = postsHTML;
}

function getPostCount() {
    let posts_num = posts.length;
    let count_msg = `&#128172; ${posts_num} Questions Asked`;

    document.getElementById('post-count').innerHTML = count_msg;
}

function filterPosts() {
    /* */
}
renderWall();
getPostCount();