module.exports = function getFriends(db, userId) {
    const friendIds = db.friendRequests.flatMap((record) => {
        if (record.acceptedAt) {
            if (record.senderId == userId) return [record.receiverId]
            if (record.receiverId == userId) return [record.senderId]
        }
        return []
    })
    return db.users.filter(({ id }) => friendIds.includes(id))
}
