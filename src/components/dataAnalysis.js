import React, { useEffect, useState } from 'react';
import { getUsers, getPostsByUser } from '../utils/api';

const DataAnalysis = () => {
  const [users, setUsers] = useState([]);
  const [userPostCounts, setUserPostCounts] = useState([]);
  const [averagePosts, setAveragePosts] = useState(0);
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersData = await getUsers();
      setUsers(usersData);
      const counts = await Promise.all(usersData.map(async user => {
        const posts = await getPostsByUser(user.id);
        return { userId: user.id, name: user.name, postCount: posts.length };
      }));
      setUserPostCounts(counts);

      const totalPosts = counts.reduce((acc, curr) => acc + curr.postCount, 0);
      const avgPosts = (totalPosts / usersData.length).toFixed(2);
      setAveragePosts(avgPosts);

      const sortedUsers = [...counts].sort((a, b) => b.postCount - a.postCount).slice(0, 3);
      setTopUsers(sortedUsers);
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-2xl font-bold text-center mb-4">Data Analysis</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 text-black">
        <p className="text-lg font-semibold">Average number of posts per user:</p>
        <p className="text-xl text-blue-500">{averagePosts}</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 text-black">
        <h2 className="text-xl font-bold mb-3">Top 3 Users with Most Posts</h2>
        <ul className="list-disc list-inside">
          {topUsers.map(user => (
            <li key={user.userId} className="text-lg mb-2 pl-4">
              <span className="font-semibold">{user.name}</span> - {user.postCount} posts
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DataAnalysis;

