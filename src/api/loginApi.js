// client/src/api/authApi.js
export const login = async (username, password) => {
    const response = await fetch('http://localhost:555/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }
  
    return data;
  };