import React, { useEffect, useState, useRef } from 'react';
import { getAllPosts } from '../utils/api';

const PostsSync = () => {
  const [posts, setPosts] = useState([]);
  const previousPostsRef = useRef([]); // This will hold the state of the posts from the last update
  const [editPostId, setEditPostId] = useState(null);
  const [editText, setEditText] = useState('');
  const [changeLogs, setChangeLogs] = useState([]); 

  useEffect(() => {
    // Fetch posts only once on component mount
    const fetchData = async () => {
      const fetchedPosts = await getAllPosts();
      setPosts(fetchedPosts);
      previousPostsRef.current = fetchedPosts; // Initialize the reference with fetched data
    };

    fetchData();
  }, []);

  // Set an interval to log changes every 60 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (posts.length > 0) {
        logChanges(posts, previousPostsRef.current);
        previousPostsRef.current = [...posts]; // Update the reference to current posts after logging
      }
    }, 60000); // Check for changes every 60 seconds

    return () => clearInterval(intervalId); // Cleanup the interval when the component unmounts
  }, [posts]); // Ensure this runs when posts update

  const chooseRandomPostForEditing = () => {
    if (posts.length > 0) {
      const randomIndex = Math.floor(Math.random() * posts.length);
      setEditPostId(posts[randomIndex].id);
      setEditText(''); // Load the current body into the textarea for editing
    }
  };

  const handleEditChange = (e) => {
    setEditText(e.target.value);
  };

  const saveEdit = () => {
    const updatedPosts = posts.map(post =>
      post.id === editPostId ? { ...post, body: editText } : post
    );
    setPosts(updatedPosts); // Update the state which will trigger the useEffect above
    setEditPostId(null);
    setEditText('');
  };

  const logChanges = (newPosts, oldPosts) => {
    const logs = [];
    let changesLogged = false;
    newPosts.forEach(newPost => {
      const oldPost = oldPosts.find(post => post.id === newPost.id);
      if (!oldPost) {
        console.log(`New post added: ${JSON.stringify(newPost)}`);
        changesLogged = true;
      } else {
        if (oldPost.body !== newPost.body) {
          console.log(`Body changed for post ID ${newPost.id}: from "${oldPost.body}" to "${newPost.body}"`);
          logs.push(`Post ID ${newPost.id}: Body changed from "${oldPost.body}" to "${newPost.body}"`);
          changesLogged = true;
        }
      }
    });

    oldPosts.forEach(oldPost => {
      if (!newPosts.some(post => post.id === oldPost.id)) {
        console.log(`Post deleted: ID ${oldPost.id}`);
        changesLogged = true;
      }
    });

    if (!changesLogged) {
      console.log("No changes detected since last check.");
    }

    if (logs.length > 0) {
        setChangeLogs(logs); // Update change logs for display
      } else {
        setChangeLogs(["No changes detected since last check."]);
      }
  };

  return (
    <div className="max-w-4xl mx-auto p-5 flex flex-col">
      <h1 className="text-2xl font-bold text-center mb-6">Post Synchronization</h1>
      <button onClick={chooseRandomPostForEditing} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
        Edit Random Post
      </button>
      {editPostId && (
        <div className="mb-4">
          <textarea
            placeholder="Enter new excerpt..."
            value={editText}
            onChange={handleEditChange}
            className="w-full h-32 p-2 border-2 border-gray-200 rounded focus:outline-none focus:border-blue-500 text-black"
          />
          <button onClick={saveEdit} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2">
            Save
          </button>
        </div>
      )}
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Change Log:</h2>
        <div className="mt-2 bg-gray-100 p-4 rounded shadow max-w-[200px]">
          {changeLogs.map((log, index) => (
            <div key={index} className="text-sm text-gray-800">{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostsSync;
