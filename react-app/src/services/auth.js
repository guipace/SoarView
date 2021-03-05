export const authenticate = async() => {
  const response = await fetch('/api/auth/',{
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return await response.json();
}

export const login = async (email, password) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  return await response.json();
}

export const logout = async () => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    }
  });
  return await response.json();
};


export const signUp = async (email, first_name, last_name, country, image_file, password) => {

  const form = new FormData();
  form.append('email', email);
  form.append('first_name', first_name);
  form.append('last_name', last_name);
  form.append('country', country);
  form.append('image_file', image_file);
  form.append('password', password);

  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: form,
  });

  return await response.json();
}
