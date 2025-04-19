import userModel from '../models/userModel.js';

const getUsers= async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; 

        const limit = parseInt(req.query.limit) || 10; 

        const skip = (page - 1) * limit;

        const signedInUserId = req.user._id;

        const users = await userModel.
            find({ _id: { $ne: signedInUserId }})
            .skip(skip)
            .limit(limit)
            .select('-password -createdAt -updatedAt -__v');

        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching users.' });
    }
}

export { getUsers }

