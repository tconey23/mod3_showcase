import OpenAI from "openai";

function postData() {
    fetch('http://localhost:3001/api/v1/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data received:', data);
    })
    .catch(error => {
      console.error('There was a problem with your fetch operation:', error);
    });
}

async function getActivities() {
    try {
        const response = await fetch('http://localhost:3001/api/v1/data/activities');
        if (!response.ok) {
            throw new Error('Failed to load activities');
        }
        const data = await response.json();
        // console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching activities:', error);
        throw error
    }
}

async function getMessage() {
  try {
      const response = await fetch('http://localhost:3001/api/v1/affirmations');
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

 const getFav = async (id) => {
  try {
    const response = await fetch(`http://localhost:3001/api/v1/data/users/${id}`);
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


const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [
        {"role": "user", "content": "This is an application used by children under the age of 10 years old"},
        {"role": "user", "content": "All responses must be appropriate for children"},
        {"role": "user", "content": "All responses must be positive in nature"},
        {"role": "user", "content": "Generate a positive affirmation for a child"}
      ],
    model: "gpt-3.5-turbo",
  })
  .catch(err => console.log(err))
  console.log(completion.choices);
}

// main()

const postThought = async (userId, thought) => {
  const patchData = thought
  console.log(thought)

  await fetch(`http://localhost:3001/api/v1/data/users/${userId}`, {
  method: 'PATCH',
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "thoughts": patchData
})
})
.then(response => {
  if (!response.ok) {
      throw new Error('Network response was not ok');
  }
  return response.json();
})
.then(data => {
  console.log('User data updated successfully:', data);
})
.catch(error => {
  console.error('There was a problem with the PATCH request:', error);
});
}

const postFavoriteQuote = async (userId, affirmations) => {
  const patchData = affirmations
  await fetch(`http://localhost:3001/api/v1/data/users/${userId}`, {
  method: 'PATCH',
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "favorite quotes": patchData
})
})
.then(response => {
  if (!response.ok) {
      throw new Error('Network response was not ok');
  }
  return response.json();
})
.then(data => {
  console.log('User data updated successfully:', data);
})
.catch(error => {
  console.error('There was a problem with the PATCH request:', error);
});

}

const getUsers = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/v1/data/users');
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


getUsers()

export {postData, getActivities, getMessage, getFav, postThought, postFavoriteQuote, getUsers}

//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