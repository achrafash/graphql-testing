module.exports = {
    users: [
        {
            id: 0,
            firstname: 'Elon',
            lastname: 'Musk',
            email: 'elon@tesla.com',
            createdAt: new Date(),
        },
        {
            id: 1,
            firstname: 'Vitalik',
            lastname: 'Buterin',
            email: 'vitalik@buterin.eth',
            createdAt: new Date(),
        },
    ],
    assets: [
        {
            id: 0,
            ownedBy: 0,
            createdBy: 1,
            title: 'Cryptopunk 666',
            description: 'This punk is going to Mars!',
            price: '200 ETH',
            published: false,
        },
    ],
}
