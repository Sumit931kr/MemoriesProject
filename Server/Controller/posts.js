import PostMessage from '../Models/postMessage.js'
import mongoose from 'mongoose';


export const getpost = async (req, res) => {

    try {
        const AllpostMessage = await PostMessage.find();
        res.status(200).json(AllpostMessage);

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export const createpost = async (req, res) => {
    const post = req.body;
    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
    try {
        await newPostMessage.save();
        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatepost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedpost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedpost, { new: true });

    res.json(updatedpost);
}

export const deletepost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("NOt able to delete it");

    await PostMessage.findByIdAndDelete(id);

    res.json({ message: "Post is Deleted Successfully" });


}

export const likepost = async (req, res) => {

    const { id } = req.params;
    if (!req.userId) {
        return res.json({ message: "Unauthenticateddddddddd" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);

}
