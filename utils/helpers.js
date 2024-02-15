const { User } = require('../models');

const deleteUserById = async (userId) => {
  try {
    const result = await User.destroy({
      where: {
        id: userId
      }
    });

    if (result === 0) {
      console.log(`User with ID ${userId} not found.`);
      throw new Error('User not found');
    } else {
      console.log(`User with ID ${userId} has been deleted.`);
    }
  } catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);
    throw error;
  }
};

module.exports = {
  render_json: (data) => {
    return JSON.stringify(data);
  },
  deleteUserById
}