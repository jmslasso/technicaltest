import React, { useEffect, useState } from 'react';
import { getUsers, getPostsByUser } from '../utils/api';

const UserPosts = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  // Function to fetch posts by a specific user
  const fetchPosts = async (userId) => {
    try {
      const postsData = await getPostsByUser(userId);
      if (postsData && postsData.length > 0) {
        setPosts(postsData);
      } else {
        setError(`No posts found for user ${userId}.`);
      }
    } catch (err) {
      setError(`Failed to fetch posts for user ${userId}.`);
    }
  };

  // Effect to fetch all users initially
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        if (usersData && usersData.length > 0) {
          setUsers(usersData);
          fetchPosts(usersData[0].id);  // Fetch posts for the first user initially
        } else {
          setError('No users found.');
        }
      } catch (err) {
        setError('Failed to fetch users.');
      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-black max-h-fit">
        {users.map(user => (
          <div key={user.id} className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-center text-center">
            <p className="font-semibold text-lg">{user.name}</p>
            <button
              onClick={() => fetchPosts(user.id)}
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Load Posts
            </button>
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-bold text-center mt-8 mb-4">Posts</h2>
      <ul className="space-y-2 text-black">
        {posts.map(post => (
          <li key={post.id} className="bg-gray-100 shadow rounded p-3">
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPosts;
