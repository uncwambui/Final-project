import Bin from "../models/Bin.js";

export const getBins = async (req, res) => {
  try {
    const bins = await Bin.find();
    res.json(bins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateBin = async (req, res) => {
  try {
    const { id } = req.params;
    const { current_level, status } = req.body;
    const bin = await Bin.findByIdAndUpdate(id, { current_level, status }, { new: true });
    res.json({ message: "Bin updated", bin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
