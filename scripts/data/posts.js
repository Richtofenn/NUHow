export let posts = JSON.parse(localStorage.getItem('posts')) || [{
  postId: '1',
  author: 'Neo',
  title: 'Ang title nito ay',
  message: 'anofwaefawefawefsawnfoaefkanwefknaskdnflkanweklfnklasdnflkanwklefnklandsklfnaklwdnfklanwdklfnawklndfkawawefkwemfkanwekfnkawfwafewaawfeawakefnkajwnefawknefknawekfnkawenfkawnfwakefmkwafnkwaefnkawnefkaweekewnwaelfawlmefwlmeflawmflemwflaemflawwaefawefawfeawes',
  theme: 'rgb(99, 211, 130)',
  topic: 'images/technology.png',
  time: 'June 1, 2024',
  profilePicture: null,
  comments: [1, 2],
  featured: false // By default, posts are not featured unless inputted otherwise
}];

export let featured_posts = JSON.parse(localStorage.getItem('featured_posts')) || [{
  postId: '2',
  author: 'Neo',
  title: 'Featured Title',
  message: 'anofwaefawefawefsawnfoaefkanwefknaskdnflkanweklfnklasdnflkanwklefnklandsklfnaklwdnfklanwdklfnawklndfkawawefkwemfkanwekfnkawfwafewaawfeawakefnkajwnefawknefknawekfnkawenfkawnfwakefmkwafnkwaefnkawnefkaweekewnwaelfawlmefwlmeflawmflemwflaemflawwaefawefawfeawes',
  theme: 'rgb(99, 211, 130)',
  topic: 'images/technology.png',
  time: 'June 1, 2024',
  profilePicture: null,
  comments: [1, 2]
}];

export function saveToStorage() {
  localStorage.setItem('posts', JSON.stringify(posts));
}

export function saveToFeatured() {
  localStorage.setItem('featured_posts', JSON.stringify(featured_posts));
}

export function addPost(postId, author, title, message, theme, topic, time, profilePicture, featured) {
  posts.push({
    postId,
    author,
    title,
    message,
    theme,
    topic,
    time,
    profilePicture,
    comments: [1, 2,3],
    featured
  });
  saveToStorage();
}

export function getPostById(id){
  let matchingPost;
  posts.forEach((post) => {
    if (post.postId === id) {
      matchingPost = post;
    }
  });
  return matchingPost;
}
export function addCommentToPost(postId, commentId){
  posts.forEach((post)=>{
    if(post.postId === postId){
      post.comments.push(commentId);
    }
  })
  saveToStorage();
};

// For deleting posts
export function deletePostByPostId(postId){
  // posts.forEach((post)=>{
  //   if(post.postId == postId){
  //     posts.splice(posts.indexOf(post),1);
  //   }
  // });
  // Dealing with modifying the length of the array, it's apparently recommended to iterate over the array backwards.
  for (let i = posts.length - 1; i >= 0; i--) {
    if (posts[i].postId == postId) {
      posts.splice(i, 1);
    }
  }
  saveToStorage();
}

// For changing the feature value of the post into the opposite of its inital value.
export function setFeatureToPost(postId){
  posts.forEach((post)=>{
    if(post.postId == postId){
      // post.featured = post.featured === "true" ? "false" : "true";
      post.featured = !post.featured;
      console.log(postId + post.featured);
    }
  });
  saveToStorage();
}