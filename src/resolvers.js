const getFriends = require('./getFriends')

module.exports = {
    User: {
        friends: ({ id }, _args, context) => getFriends(context.db, id),
    },
    Post: {
        author: ({ authorId }, _args, context) => {
            return context.db.users.filter((record) => record.id == authorId)[0]
        },
    },
    FriendRequest: {
        sender: ({ senderId }, _args, context) =>
            context.db.users.filter((record) => record.id == senderId)[0],
        receiver: ({ receiverId }, _args, context) =>
            context.db.users.filter((record) => record.id == receiverId)[0],
    },

    Query: {
        user: (_parent, { id }, context) => {
            return context.db.users.filter((record) => record.id == id)[0]
        },

        getFeed: (_parent, { userId }, context) => {
            // get all the friends
            const friends = context.db.friendRequests.filter(
                (record) =>
                    record.acceptedAt &&
                    (record.senderId == userId || record.receiverId == userId)
            )

            // get posts from friends
            const posts = context.db.posts.filter(({ author }) =>
                friends.includes(author)
            )

            return posts
        },
    },

    Mutation: {
        sendFriendRequest: (_parent, { userId, recipientId }, context) => {
            // verify that there's not already a pending request
            const alreadyFriends = context.db.friendRequests.filter(
                ({ senderId, receiverId }) =>
                    (senderId == userId && receiverId == recipientId) ||
                    (senderId == recipientId && receiverId == userId)
            )
            if (alreadyFriends) return null

            const request = {
                id: context.db.friendRequests.length,
                senderId: userId,
                receiverId: recipientId,
                createdAt: new Date(),
                acceptedAt: undefined,
                declinedAt: undefined,
            }
            context.db.friendRequests.push(request)
            return request
        },

        acceptFriendRequest: (_parent, { userId, senderId }, context) => {
            // retrieve the request
            const request = context.db.friendRequests.filter(
                (req) => req.senderId == senderId && req.receiverId == userId
            )
            if (request.length == 0) return false // no existing request

            request[0].acceptedAt = new Date()
            return true
        },

        publishPost: (_parent, { authorId, content }, context) => {
            const post = {
                id: context.db.posts.length,
                authorId,
                content,
                publishedAt: new Date(),
            }
            context.db.posts.push(post)
            return post
        },
    },
}
