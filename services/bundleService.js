const Bundle = require("../models/bundleModel");

async function creteBundle(bundleData) {
    try{
        const newBundle = new Bundle(bundleData);
        const savedBundle = await newBundle.save();
        return savedBundle;
    }catch(error){
        console.log('Error creating bundle', error);
        throw error;
    }
}


async function findAllBundles(){
    try{
        const bundle = await Bundle.find();
        return bundle;
    }catch(error){
        console.log('error finding bundle: ', error);
        throw error;
    }
}

async function findBundleById(bundleId) {
    try {
        const bundle = await Bundle.findOne({ bundle_id: bundleId });
        if (!bundle) {
            throw new Error('Bundle not found');
        }
        return bundle;
    } catch (error) {
        console.log('Error finding bundle by ID: ', error);
        throw error;
    }
}

async function findBundleByName(bundleName) {
    try {
        const bundle = await Bundle.findOne({ name: bundleName });
        if (!bundle) {
            throw new Error('Bundle not found');
        }
        return bundle;
    } catch (error) {
        console.log('Error finding bundle by name: ', error);
        throw error;
    }
}

async function updateBundle(bundleId, updateData) {
    try {
        const updatedBundle = await Bundle.findOneAndUpdate(
            { bundle_id: bundleId },
            { $set: updateData },
            { new: true, runValidators: true }
        );
        if (!updatedBundle) {
            throw new Error('Bundle not found');
        }
        return updatedBundle;
    } catch (error) {
        console.log('Error updating bundle: ', error);
        throw error;
    }
}

async function deleteBundle(bundleId) {
    try {
        const deletedBundle = await Bundle.findOneAndDelete({ bundle_id: bundleId });
        if (!deletedBundle) {
            throw new Error('Bundle not found');
        }
        return deletedBundle;
    } catch (error) {
        console.log('Error deleting bundle: ', error);
        throw error;
    }
}

module.exports = {
    creteBundle,
    findAllBundles,
    findBundleById,
    findBundleByName,
    updateBundle,
    deleteBundle
};
