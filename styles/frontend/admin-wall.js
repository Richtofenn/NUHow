document.addEventListener('DOMContentLoaded', () => {
  console.log('admin wall 3');

  const aside = document.querySelector('aside');
  const header = document.querySelector('header');
  const img = document.querySelector('header img');
  const singleContainer = document.querySelector('.single-container');
  singleContainer.addEventListener('click',()=>{
    console.log('single');
  })

  const exitButton = document.querySelector('.exit-button');

  img.addEventListener('click', () => {
      aside.classList.toggle('show');
      header.classList.toggle('hidden');
  });

  console.log(exitButton);

  exitButton.addEventListener('click', () => {
      console.log('hello');
      aside.classList.remove('show');
      header.classList.remove('hidden');
  });
});
