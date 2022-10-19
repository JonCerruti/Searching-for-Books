const { AuthenticationError } = require('apollo-server-express');
const { Profile, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // By adding context to our query, we can retrieve the logged in user without specifically searching for them
      me: async (parent, args, context) => {
        if  (context.user) {
            const userData = await User.findOne({ _id: context.user._id}).select(
                "-__v -password"
            );
            return userData;
        }
            throw new AuthenticationError('You need to be logged in!');
      },
    },
  
    Mutation: {
      addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);
  
        return { token, user };
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('Username and/or password is invalid!');
        }
        const correctPw = await profile.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Username and/or password is invalid!');
        }
         const token = signToken(user);
        return { token, user };
      },
  
      // Add a third argument to the resolver to access data in our `context`
      saveBook: async (parent, { body}, context) => {
        // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user.Id },
            { $addToSet: { savedBooks: body }},
            { new: true }
          );
          return updatedUser;
        }
        // If user attempts to execute this mutation and isn't logged in, throw an error
        throw new AuthenticationError('You need to be logged in!');
      },
      // Set up mutation so a logged in user can only remove their profile and no one else's
      removeBook: async (parent, { bookId }, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            {$pull: { savedBooks: { bookId: bookId}}},
            {new: true}
            );
            return updatedUser
        }
      },   
    },
  };
  
  module.exports = resolvers;