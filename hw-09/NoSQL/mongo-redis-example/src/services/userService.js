const User = require("../models/user");
const Comment = require("../models/comment");
const client = require("../redisClient");

const formCacheValue = (value) => {
  return JSON.stringify(value)
}

const CACHE_TIME = 3600

const findUserById = async (userId) => {
  const cacheKey = `user:${userId}`;
  const cachedUser = await client.get(cacheKey);
  if (cachedUser) {
    return JSON.parse(cachedUser);
  }
  const user = await User.findById(userId);
  const cacheValue = formCacheValue(user);
  if (user) {
    await client.set(cacheKey, cacheValue, CACHE_TIME, (err, reply => {
      if (err) {
        return res.status(500).json({ error: 'Failed to set cache' });
      }
      return res.json(reply);
    }));
  }
};

const createUser = async (data) => {
  const user = new User(data);
  const newUser = await user.save();
  const cacheKey = `user:${newUser._id}`;
  const cacheValue = formCacheValue(newUser);
  await client.set(cacheKey, cacheValue, CACHE_TIME, (err, reply => {
    if (err) {
      return res.status(500).json({ error: 'Failed to set cache' });
    }
    return res.json(reply);
  }));
};

const updateUser = async (data) => {
  const { id, name, email, age } = data;
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { name, email, age },
    { new: true },
  );
  const cacheValue = formCacheValue(updatedUser);
  if (updatedUser) {
    const cacheKey = `user:${id}`;
    await client.set(cacheKey, cacheValue, CACHE_TIME, (err, reply => {
      if (err) {
        return res.status(500).json({ error: 'Failed to set cache' });
      }
      return res.json(reply);
    }));
  }
};

const createComment = async (data) => {
  const comment = new Comment(data);
  const newComment = await comment.save();
  const userCommentsCacheKey = `user_comments:${newComment.userId}`;
  const comments = await Comment.find({ userId: newComment.userId }).populate(
    "userId",
  );
  const cacheValue = formCacheValue(comments);
  await client.set(userCommentsCacheKey, cacheValue, 3600, (err, reply => {
    if (err) {
      return res.status(500).json({ error: 'Failed to set cache' });
    }
    return res.json(reply);
  }));
};

const createManyComments = async (commentsData) => {
  return await Comment.insertMany(commentsData);
};

const updateManyComments = async (updateData) => {
  const bulkOperations = updateData.map((data) => ({
    updateOne: {
      filter: { _id: data._id },
      update: { $set: { content: data.content } },
    },
  }));
  return await Comment.bulkWrite(bulkOperations);
};

const getUserComments = async (userId) => {
  const cacheKey = `user_comments:${userId}`;
  const cachedComments = await client.get(cacheKey);
  if (cachedComments) {
    return JSON.parse(cachedComments);
  }
  const comments = await Comment.find({ userId }).populate("userId");
  const cacheValue = formCacheValue(comments);
  await client.set(cacheKey, cacheValue, CACHE_TIME, (err, reply => {
    if (err) {
      return res.status(500).json({ error: 'Failed to set cache' });
    }
    return res.json(reply);
  }));
};

module.exports = {
  findUserById,
  createUser,
  updateUser,
  createManyComments,
  updateManyComments,
  createComment,
  getUserComments,
};
