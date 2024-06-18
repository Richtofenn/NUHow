import { formatTime } from "./utils/formatTime.js";
import { submissions,getSubmissionByPostId,removeSubmissionByPostId} from "./data/submissions.js";
import { addPost, getPostById} from "./data/posts.js";
//import { featurePost,featured } from "./data/featured.js";
import { posts, setFeatureToPost, deletePostByPostId } from "./data/posts.js";
import { currentAccount } from "./data/admin.js";

const wallPosts = posts.filter(post => !post.featured); // Posts that have featured set to false
const featuredPosts = posts.filter(post => post.featured); // Posts that have featured set to true

renderAdminWall();

function renderAdminWall() {

  console.log(currentAccount);

  document.querySelector('header img').src = currentAccount.image;

  document.querySelector('.profile-container .name').innerHTML = currentAccount.name;

  document.querySelector('.profile-container .role').innerHTML = currentAccount.role;
  document.querySelector('.profile-container img').src = currentAccount.image;

  renderSubmissionInWall(submissions);

  document.querySelectorAll('.js-post-container').forEach((container)=>{
    container.addEventListener('click',()=>{
      const {postId} = container.dataset;
    })
  });
  
  document.querySelector('.js-nav-wall').addEventListener('click',()=>{
    document.querySelector('.js-title-top').innerHTML='Wall'
    renderNonSubmissionsInWall(wallPosts);
  });
  document.querySelector('.js-nav-submissions').addEventListener('click',()=>{
    document.querySelector('.js-title-top').innerHTML='Submissions';
    renderSubmissionInWall(submissions);
  });
  document.querySelector('.js-nav-featured').addEventListener('click',()=>{
    document.querySelector('.js-title-top').innerHTML='Featured';
    renderNonSubmissionsInWall(featuredPosts);
  });


  function renderNonSubmissionsInWall(data){
    console.log(data);

    let adminWallHTML=``;
    
    data.slice().reverse().forEach((post)=>{
      adminWallHTML+=`
      <div class="post-container js-post-container" data-post-id=${post.postId}>
        <div class="action-container">
            <div class="delete" data-post-id=${post.postId}>Delete</div>
            <div class="setFeature" data-post-id=${post.postId}>Feature/Unfeature</div>
        </div>
        <div class="profile-container">
          <div class="profile-image-container">
            <img src="${post.profilePicture || 'images/bulldog.jpeg'}" alt="Profile Picture">
          </div>
          <div class="details-container">
            <p class="title">${post.title}</p>
            <p class="name">${post.author}</p>
            <p class="status">${formatTime(post)}</p>
          </div>
          <div class="topic-image-container">
            <div>
             <img src="${post.topic}">
            </div>
          </div>
        </div>
        <div class="message-container">
          <p style="background-color:${post.theme}">${post.message}</p>  
        </div>
      </div>
    `
    })
    document.querySelector('.js-posts-list-container').innerHTML = adminWallHTML;
    addEventListenerForAdminChoices();
  }

}
function renderSubmissionInWall(data) {
  console.log(data);
  let adminWallHTML = ``;
  data.slice().reverse().forEach((post) => {
    adminWallHTML += `
      <div class="post-container js-post-container" data-post-id=${post.postId}>
        <div class="action-container">
          <div class="approve" data-post-id=${post.postId}>Approve</div>
          <div class="reject" data-post-id=${post.postId}>Reject</div>
          <div class="feature" data-post-id=${post.postId}>Feature</div>
        </div>
        <div class="profile-container">
          <div class="profile-image-container">
            <img src="${post.profilePicture || 'images/bulldog.jpeg'}" alt="Profile Picture">
          </div>
          <div class="details-container">
            <p class="title">${post.title}</p>
            <p class="name">${post.author}</p>
            <p class="status">${formatTime(post)}</p>
          </div>
          <div class="topic-image-container">
            <div>
              <img src="${post.topic}">
            </div>
          </div>
        </div>
        <div class="message-container">
          <p style="background-color:${post.theme}">${post.message}</p>  
        </div>
        <div class="approve-container" style="display: none;">
          <div class="confirm-message">
            <img class="confirm-image" src="images/check-mark.png">
            <p class="thank-you">Approve post?</p>
            <p class="confirm-details">Once you confirm this, you cannot undo.</p>
          </div>
          <div class="confirm-choices-container">
            <div class="confirm" data-post-id=${post.postId}>Confirm</div>
            <div class="cancel">Cancel</div>
          </div>
        </div>
        <div class="reject-container" style="display: none;">
          <div class="confirm-message">
            <img class="confirm-image" src="images/bin.png">
            <p class="thank-you">Reject post?</p>
            <p class="confirm-details">Once you confirm this, you cannot undo.</p>
          </div>
          <div class="confirm-choices-container">
            <div class="confirm" data-post-id=${post.postId}>Confirm</div>
            <div class="cancel">Cancel</div>
          </div>
        </div>
        <div class="feature-container" style="display: none;">
          <div class="confirm-message">
            <img class="confirm-image" src="images/star.png">
            <p class="thank-you">Feature post?</p>
            <p class="confirm-details">Once you confirm this, you cannot undo.</p>
          </div>
          <div class="confirm-choices-container">
            <div class="confirm" data-post-id=${post.postId}>Confirm</div>
            <div class="cancel">Cancel</div>
          </div>
        </div>
      </div>
    `;
  });
  document.querySelector('.js-posts-list-container').innerHTML = adminWallHTML;
  addEventListenerForAdminChoices();
}

function addEventListenerForAdminChoices() {
  document.querySelectorAll('.approve').forEach((approveButton) => {
    approveButton.addEventListener('click', () => {
      const { postId } = approveButton.dataset;
      const approveContainer = approveButton.closest('.post-container').querySelector('.approve-container');
      approveContainer.style = "display: flex";

      approveContainer.querySelector('.confirm').addEventListener('click', () => {
        const submission = getSubmissionByPostId(postId);
        console.log(submission.postId);
        
        addPost(submission.postId, submission.author, submission.title, submission.message, submission.theme || 'rgb(99, 211, 130)', submission.topic || 'images/technology.png', submission.time, submission.profilePicture, false);
        removeSubmissionByPostId(submission.postId);
        renderAdminWall();
        
      });

      approveContainer.querySelector('.cancel').addEventListener('click', () => {
        approveContainer.style = "display: none";
      });
    });
  });

  document.querySelectorAll('.reject').forEach((rejectButton) => {
    rejectButton.addEventListener('click', () => {
      const { postId } = rejectButton.dataset;
      const rejectContainer = rejectButton.closest('.post-container').querySelector('.reject-container');
      rejectContainer.style = "display: flex";

      rejectContainer.querySelector('.confirm').addEventListener('click', () => {
        removeSubmissionByPostId(postId);
        renderAdminWall();
      });

      rejectContainer.querySelector('.cancel').addEventListener('click', () => {
        rejectContainer.style = "display: none";
      });
    });
  });

  document.querySelectorAll('.feature').forEach((featureButton) => {
    featureButton.addEventListener('click', () => {
      const { postId } = featureButton.dataset;
      const featureContainer = featureButton.closest('.post-container').querySelector('.feature-container');
      featureContainer.style = "display: flex";

      featureContainer.querySelector('.confirm').addEventListener('click', () => {
        const featured = getSubmissionByPostId(postId);
        addPost(featured.postId, featured.author, featured.title, featured.message, featured.theme || 'rgb(99, 211, 130)', featured.topic || 'images/technology.png', featured.time, featured.profilePicture, true);
        removeSubmissionByPostId(featured.postId);
        renderAdminWall();
      });

      featureContainer.querySelector('.cancel').addEventListener('click', () => {
        featureContainer.style = "display: none";
      });
    });
  });
}
