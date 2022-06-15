const newFormHandler = async (event) => {
  const name = document.querySelector('.real-name').value.trim();
  if (name) {
    const response = await fetch(`/api/games`, {
      method: 'POST',
      body: JSON.stringify({ username, name, avatar, points}),
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

const iframe = document.querySelector('#iframeID')
let message = 'message'
const receiveScore = async () => {
   if(iframe) {
    window.addEventListener(message, function (e) {
      data = e.data;
      console.log(data)
      points = data
    })
  }
}

// const iframeData = async () => {
//    const response = await fetch('/Ninja-Party/build')

//    console.log


// }

const getData = async () => {
  const response = await fetch('/Ninja-Party/build')

  console.log(response)

  console.log('hell yeah')
    // method: 'POST',
    // body: {message},
    // headers: {
    //   'Content-Type': 'application/json',
    //}
  //});

  // if(response.ok) {
  //   document.location.replace('/profile')
  // } else {
  //   alert('failed to render score')
  // }
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

receiveScore()

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
