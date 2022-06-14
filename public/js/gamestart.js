const GameStartHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const start = document.querySelector('.startGame-btn')

    const response = await fetch('api/game/', {
        method: 'POST',
        body: requestAnimationFrame.body,
        data: 'newGame'
    })

  };

  document
    .querySelector('.startGame-btn')
    .addEventListener('click', GameStartHandler)