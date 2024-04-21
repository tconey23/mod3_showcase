async function getActivities() {
  try {
    const response = await fetch(
      "https://calmingbe-850b1d5e55e9.herokuapp.com/api/v1/data/activities",
    );
    if (!response.ok) {
      throw new Error("Failed to load activities");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching activities:", error);
    throw error;
  }
}

const getUserData = async (id) => {
  try {
    const response = await fetch(
      `https://calmingbe-850b1d5e55e9.herokuapp.com/api/v1/data/users/${id}`,
    );
    if (!response.ok) {
      throw new Error("Failed to load activities");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching activities:", error);
    throw error;
  }
};

const getMessage = async () => {
  const messages = [
    {
      role: "user",
      content:
        "This is an application used by children under the age of 10 years old",
    },
    { role: "user", content: "All responses must be appropriate for children" },
    { role: "user", content: "All responses must be positive in nature" },
    { role: "user", content: "Don't include any graphics" },
    { role: "user", content: "Generate a positive affirmation for a child" },
  ];
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messages,
        max_tokens: 500,
        top_p: 1,
        temperature: 1,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return null;
  }
};

const postThought = async (userId, thought) => {
  console.log(thought, userId)
  try {
    const response = await fetch(
      
      `https://calmingbe-850b1d5e55e9.herokuapp.com/api/v1/data/users/${userId}/thoughts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          thought
        }),
      }
    );

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("There was a problem with the POST request:", error);
    throw error;
  }
};

const postFavoriteQuote = async (userId, favoriteMessage) => {
  console.log(favoriteMessage, userId)
  try {
    const response = await fetch(
      
      `https://calmingbe-850b1d5e55e9.herokuapp.com/api/v1/data/users/${userId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          favoriteMessage,
        }),
      }
    );

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("There was a problem with the POST request:", error);
    throw error;
  }
};

const deleteFavoriteQuote = async (msgId, userId) => {
//http://localhost:3001/api/v1/data/users/${userId}/messages
//https://calmingbe-850b1d5e55e9.herokuapp.com/api/v1/data/users/${userId}/messages
console.log(msgId, userId)
  try {
    const response = await fetch(
      `https://calmingbe-850b1d5e55e9.herokuapp.com/api/v1/data/users/${userId}/messages`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          msgId, 
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Network response was not ok: ${errorText}`);
    }

    const data = await response.json();
    console.log("Favorite quote deleted successfully:", data);
    return data;
  } catch (error) {
    console.error("There was a problem with the DELETE request:", error);
    throw error;
  }
};

const getUserInfo = async () => {
  try {
    const response = await fetch(
      "https://calmingbe-850b1d5e55e9.herokuapp.com/api/v1/data/users",
    );
    if (!response.ok) {
      throw new Error("Failed to load activities");
    }
    const data = await response.json();
    let userArray = [];
    const userDetails = data.forEach((user, index) => {
      userArray.push(user);
    });
    return userArray;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

const getActiveUser = async () => {
  try {
    const response = await fetch(
      "https://calmingbe-850b1d5e55e9.herokuapp.com/api/v1/data/active_user",
    );
    if (!response.ok) {
      throw new Error("Failed to load activities");
    }
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

const postActiveUser = async (user) => {
  if(user){
    await fetch(

      
      `https://calmingbe-850b1d5e55e9.herokuapp.com/api/v1/data/active_user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user,
        }),
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("User data updated successfully:", data);
      })
      .catch((error) => {
        // console.error("There was a problem with the PATCH request:", error);
      })
    }
};

export {
  deleteFavoriteQuote,
  getActivities,
  getUserData,
  postThought,
  postFavoriteQuote,
  getUserInfo,
  postActiveUser,
  getActiveUser,
  getMessage,
};
