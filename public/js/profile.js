const newFormHandler = async (event) => {
  const name = document.querySelector('.real-name').value.trim();
  if (name) {
    const response = await fetch(`/api/games`, {
      method: 'POST',
      body: JSON.stringify({ username, name, avatar}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create project');
    }
  }
};

const renderScore = async () => {
   const iframe = document.querySelector('#iframeID')
   if(iframe) {
     const response = await fetch('api/games', {
       method: 'POST',
       body: JSON.stringify({points}),
       headers: {
         'Content-Type': 'application/json',
       }
     });

     if(response.ok) {
       document.location.replace('/profile')
     } else {
       alert('failed to render score')
     }
   }
}

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

renderScore()

document
.querySelector('.startGame-btn')
.addEventListener('click', function(event) {
  event.preventDefault()
})


// document
//   .querySelector('.new-project-form')
//   .addEventListener('submit', newFormHandler);

// document
//   .querySelector('.project-list')
//   .addEventListener('click', delButtonHandler);
