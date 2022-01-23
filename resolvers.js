const dummyUser = {
    id: 0,
    firstname: "Elon",
    lastname: "Musk",
    email: "elon@tesla.com",
    createdAt: new Date(),
};
const dummyAsset = {
    id: 0,
    owner: dummyUser,
    title: "Tesla in the metaverse",
    description: "Might as well have an electric car in the metaverse...",
    price: 12,
    published: false,
};

// creates a new user
function createUser({ email, firstname, lastname }) {
    return { id: 0, email, firstname, lastname, createdAt: new Date() };
}

// creates a new asset
function createAsset({ uid, title, description, price }) {
    return { owner: dummyUser, title, description, price };
}

// make an asset public
async function publishAsset({ id }) {
    // TODO - get asset
    return { ...dummyAsset, published: true };
}

// transfer ownership of an asset from one user to another
async function transferAsset({ sellerId, buyerId, assetId }) {
    return sellerId !== buyerId;
}

function user({ id }) {
    return dummyUser.id == id ? { ...dummyUser, assets: [dummyAsset] } : null;
}

function asset({ id }) {
    return dummyAsset.id == id ? dummyAsset : null;
}

module.exports = {
    createUser,
    createAsset,
    publishAsset,
    transferAsset,
    user,
    asset,
};
