const cloudinary = require('cloudinary');
const router = require('express').Router();

cloudinary.config({
    cloud_name: "dkuy6zthc",
    api_key: "128149593991294",
    api_secret: "61lxo_nxGQDuQr2nw7ns41P8f8M"
})

router.delete('/:public_id', async (req, res) => {
    const { public_id } = req.params;
    try {
        await cloudinary.uploader.destroy(public_id);
        res.status(200).send();
    } catch (e) {
        res.status(400).send(e.message)
    }
})


module.exports = router;
