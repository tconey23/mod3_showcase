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
export {postData, getActivities}