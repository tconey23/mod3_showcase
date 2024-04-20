

async function getActivities() {
    try {
        const response = await fetch('https://calmingbe-850b1d5e55e9.herokuapp.com/api/v1/data/activities');
        if (!response.ok) {
            throw new Error('Failed to load activities');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching activities:', error);
        throw error
    }
}

 const getFav = async (id) =>  {

  try {
    const response = await fetch(`https://calmingbe-850b1d5e55e9.herokuapp.com/api/v1/data/users/${id}`);
    if (!response.ok) {
        throw new Error('Failed to load activities');
    }
    const data = await response.json();
    return data;
} catch (error) {
    console.error('Error fetching activities:', error);
    throw error
}
}

const getMessage = async () =>  {
  const messages= [
    {"role": "user", "content": "This is an application used by children under the age of 10 years old"},
    {"role": "user", "content": "All responses must be appropriate for children"},
    {"role": "user", "content": "All responses must be positive in nature"},
    {"role": "user", "content": "Generate a positive affirmation for a child"}
  ]
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`
      },
      body: JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": messages,
        "max_tokens": 500,
        "top_p": 1,
        "temperature": 1
      })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return null;
  }
};

const postThought = async (userId, thought) =>  {
  const patchData = thought
  //console.log(thought)

  await fetch(`http://localhost:3001/api/v1/data/users/${userId}`, {
  method: 'PATCH',
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "thoughts": patchData
})
})
.then(response =>  {
  if (!response.ok) {
      throw new Error('Network response was not ok');
  }
  return response.json();
})
.then(data =>  {
  //console.log('User data updated successfully:', data);
})
.catch(error =>  {
  console.error('There was a problem with the PATCH request:', error);
});
}

const postFavoriteQuote = async (userId, favorite) =>  {
  const patchData = favorite
  await fetch(`https://calmingbe-850b1d5e55e9.herokuapp.com/api/v1/data/users/${userId}`, {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "favorite quotes": patchData
})
})
.then(response =>  {
  if (!response.ok) {
    console.log(response)
      throw new Error(`Network response was not ok${response}`);
  }
  return response.json();
})
.then(data =>  {
  //console.log('User data updated successfully:', data);
})
.catch(error =>  {
  console.error('There was a problem with the POST request:', error);
});

getFav(userId)

}

const deleteFavoriteQuote = async (userId, favorite) => {
  // `https://calmingbe-850b1d5e55e9.herokuapp.com/api/v1/data/users/${userId}`
  // `http://localhost:3001/api/v1/data/users/${userId}`
  const patchData = favorite;
  console.log(userId, favorite)
  try {
    const response = await fetch(`https://calmingbe-850b1d5e55e9.herokuapp.com/api/v1/data/users/${userId}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
       patchData
      })
    });

    if (!response.ok) {
      const errorText = await response.text();  // Or response.json() if the server responds with JSON
      throw new Error(`Network response was not ok: ${errorText}`);
    }

    const data = await response.json();
    console.log('User data updated successfully:', data);
    return data;
  } catch (error) {
    console.error('There was a problem with the DELETE request:', error);
    throw error;  // Re-throw to allow caller handling or display an error message
  }
}

const getUsers = async () =>  {
  try {
    const response = await fetch('https://calmingbe-850b1d5e55e9.herokuapp.com/api/v1/data/users');
    if (!response.ok) {
        // throw new Error('Failed to load activities');
    }
    const data = await response.json();
    let userArray = []
    const userDetails = data.forEach((user, index) =>{
      userArray.push(user)
    })
    return userArray;
  } catch (error) {
      console.error('Error fetching users:', error);
      throw error
  }
}

const postActiveUser = async (user) =>  {
  if(user){
    await fetch(`https://calmingbe-850b1d5e55e9.herokuapp.com/api/v1/data/active_user`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "name": user
    })
    })
    .then(response =>  {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
    return response.json();
    })
    .then(data =>  {
    //console.log('User data updated successfully:', data);
    })
      .catch(error =>  {
      console.error('There was a problem with the PATCH request:', error);
    });
  }
}


getUsers()

export {deleteFavoriteQuote, getActivities, getFav, postThought, postFavoriteQuote, getUsers, postActiveUser, getMessage}
