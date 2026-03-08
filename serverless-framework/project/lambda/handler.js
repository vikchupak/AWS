'use strict';

const users = [
  {
    id: 0,
    fullName: "Leonardo DiCaprio",
    age: 48
  },
  {
    id: 1,
    fullName: "Johnny Depp",
    age: 59
  },
  {
    id: 2,
    fullName: "Brad Pitt",
    age: 59
  },
  {
    id: 3,
    fullName: "Charlize Theron",
    age: 47
  }
]

const getUsers = event => {
  return {
    statusCode: 200,
    body: JSON.stringify(users, null, 2),
  }
}

const getUser = event => {
  const { userId } = event.pathParameters;
  
  const user = users.find(user => user.id === userId);

  if (!user) return { statusCode: 404 }

  return {
    statusCode: 200,
    body: JSON.stringify(user, null, 2)
  }
}

module.exports = {
  getUsers,
  getUser
}
