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


  function renderSubmissionInWall(data){
    let adminWallHTML=``;
    data.slice().reverse().forEach((post)=>{
      adminWallHTML+=`
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
      </div>
    `
    })
    document.querySelector('.js-posts-list-container').innerHTML = adminWallHTML;
    addEventListenerForAdminChoices();
  }
  function renderNonSubmissionsInWall(data){
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

function addEventListenerForAdminChoices(){

  document.querySelectorAll('.approve').forEach((approveButton)=>{
    approveButton.addEventListener('click',()=>{

      const approveContainer= document.querySelector('.approve-container');
      approveContainer.style = "display: flex";

      document.querySelector('.approve-container .confirm').addEventListener('click',()=>{
        const {postId} = approveButton.dataset;
        const submission = getSubmissionByPostId(postId);
        addPost(submission.postId, submission.author, submission.title, submission.message, submission.theme || 'rgb(99, 211, 130)', submission.topic || 'images/technology.png', submission.time, submission.profilePicture, false);
        removeSubmissionByPostId(submission.postId);
        renderAdminWall();
        approveContainer.style="display:none";
      });
      
      document.querySelector('.approve-container .cancel').addEventListener('click',()=>{
        approveContainer.style="display:none";
      });
    });
  });

  document.querySelectorAll('.reject').forEach((rejectButton)=>{
    rejectButton.addEventListener('click',()=>{

      const rejectContainer= document.querySelector('.reject-container');
      rejectContainer.style = "display: flex";

      document.querySelector('.reject-container .confirm').addEventListener('click',()=>{
        const {postId} = rejectButton.dataset;
        const submission = getSubmissionByPostId(postId);
        removeSubmissionByPostId(submission.postId);
        renderAdminWall();
        rejectContainer.style = "display: none";
      });

      document.querySelector('.reject-container .cancel').addEventListener('click',()=>{
        rejectContainer.style = "display: none";
      });

    
    })
  });

  document.querySelectorAll('.feature').forEach((featureButton)=>{
    featureButton.addEventListener('click',()=>{
      
      const featureContainer= document.querySelector('.feature-container');
      featureContainer.style = "display: flex";

      document.querySelector('.feature-container .confirm').addEventListener('click',()=>{
        const {postId} = featureButton.dataset;
        const featured = getSubmissionByPostId(postId);
        addPost(featured.postId, featured.author, featured.title, featured.message, featured.theme || 'rgb(99, 211, 130)', featured.topic || 'images/technology.png', featured.time, featured.profilePicture, true);
        removeSubmissionByPostId(featured.postId);
        renderAdminWall();
        featureContainer.style="display:none";
      });

      document.querySelector('.feature-container .cancel').addEventListener('click',()=>{
        featureContainer.style = "display: none";
      });

    
    })
  });
  document.querySelectorAll('.delete').forEach((deleteButton)=>{
    deleteButton.addEventListener('click',()=>{
      console.log("delete button clicked.");
      // prolly copy the one for reject.
      const deleteContainer= document.querySelector('.delete-container');
      deleteContainer.style = "display: flex";

      document.querySelector('.delete-container .confirm').addEventListener('click',()=>{
        console.log("confirm delete button clicked.");
        const {postId} = deleteButton.dataset;
        const wall_post = getPostById(postId);
        deletePostByPostId(wall_post.postId);
        // refreshWall();
        // if (document.querySelector('.js-title-top').innerText == 'Featured'){
        //   renderNonSubmissionsInWall(featuredPosts);
        // } else {
        //   renderNonSubmissionsInWall(wallPosts);
        // }
        deleteContainer.style="display:none";
      });
      
      document.querySelector('.delete-container .cancel').addEventListener('click',()=>{
        console.log("cancel delete button clicked.");
        deleteContainer.style="display:none";
      });

    });
  });

  document.querySelectorAll('.setFeature').forEach((setFeatureButton)=>{
    setFeatureButton.addEventListener('click',()=>{
      const setFeatureContainer= document.querySelector('.setFeature-container');
      setFeatureContainer.style = "display: flex";

      document.querySelector('.setFeature-container .confirm').addEventListener('click',()=>{
        const {postId} = setFeatureButton.dataset;
        setFeatureToPost(postId);
        // refreshWall();
        // if (document.querySelector('.js-title-top').innerText == 'Featured'){
        //   renderNonSubmissionsInWall(featuredPosts);
        // } else {
        //   renderNonSubmissionsInWall(wallPosts);
        // }
        
        setFeatureContainer.style="display:none";
      });

      document.querySelector('.setFeature-container .cancel').addEventListener('click',()=>{
        setFeatureContainer.style = "display: none";
      });
    })
  });
}