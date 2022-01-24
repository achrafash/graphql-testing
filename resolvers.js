module.exports = {
    User: {
        assets: ({ id }, _args, context) => {
            return context.db.assets.filter((record) => record.ownedBy == id)
        },
    },
    Asset: {
        owner: ({ ownedBy }, _args, context) => {
            return context.db.users.filter((record) => record.id == ownedBy)[0]
        },
        creator: ({ createdBy }, _args, context) => {
            return context.db.users.filter(
                (record) => record.id == createdBy
            )[0]
        },
    },

    Query: {
        user: (_parent, { id }, context) => {
            const user = context.db.users.filter((record) => record.id == id)
            if (user.length === 0) return null
            return user[0]
        },

        asset: (_parent, { id }, context) => {
            const asset = context.db.assets.filter((record) => record.id == id)
            if (asset.length === 0) return null
            return asset[0]
        },
    },

    Mutation: {
        createUser: (_parent, { email, firstname, lastname }, context) => {
            const newUser = {
                id: 0,
                email,
                firstname,
                lastname,
                createdAt: new Date(),
            }
            context.db.users.push(newUser)
            return newUser
        },
        createAsset: (_parent, { uid, title, description, price }, context) => {
            const newAsset = { ownerId: uid, title, description, price }
            context.db.assets.push(newAsset)
            return newAsset
        },
        publishAsset: async (_parent, { id }, context) => {
            const asset = context.db.assets.filter((record) => record.id == id)
            if (asset.length === 0) return false

            asset.published = true
            return true
        },
        transferAsset: (_parent, { sellerId, buyerId, assetId }, context) => {
            const asset = context.db.assets.filter(
                (record) => record.id == assetId
            )
            if (asset.length === 0) return false
            const buyer = context.db.users.filter(
                (record) => record.id == buyerId
            )
            if (buyer.length === 0) return false
            if (asset[0].ownerId != sellerId) return false

            asset[0].ownedBy = buyerId
            return true
        },
    },
}
