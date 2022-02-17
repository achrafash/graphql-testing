module.exports = {
    users: [
        {
            id: 0,
            firstname: 'Mark',
            lastname: 'Zuck',
            email: 'mark.zuck@stanford.edu',
            createdAt: new Date('2004-1-1'),
        },
        {
            id: 1,
            firstname: 'Eduardo',
            lastname: 'Saverin',
            email: 'eduardo.saverin@stanford.edu',
            createdAt: new Date('2004-2-1'),
        },
    ],
    friendRequests: [
        {
            senderId: 0,
            receiverId: 1,
            createdAt: new Date('2004-2-1'),
            acceptedAt: new Date('2004-2-2'),
            declinedAt: undefined,
        },
    ],
    posts: [
        {
            id: 0,
            authorId: 0,
            content: 'Hey ya!',
            publishedAt: new Date('2004-2-4'),
        },

        {
            id: 1,
            authorId: 1,
            content: 'LFG',
            publishedAt: new Date('2004-2-4'),
        },
    ],
}
