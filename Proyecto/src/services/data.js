const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3004/posts');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      return data;

    } catch (error) {
      console.error('Failed to fetch:', error);
    }
  };

  const createPost = async (post) => {
    try {
        const response = await fetch('http://localhost:3004/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to create post:', error);
        throw error;
    }
};

  const deletePost = async (postId) => {
  try {
      const response = await fetch(`http://localhost:3004/posts/${postId}`, {
          method: "DELETE",
      });
      if (!response.ok) {
          throw new Error("Error deleting post");
      }
      return true;
  } catch (error) {
      console.error("Error deleting post:", error);
      throw error;
  }
};

export {fetchData, createPost, deletePost};
  
