import WasteRequest from "../models/WasteRequest.js";

export const createRequest = async (req, res) => {
  try {
    const { waste_type, scheduled_date } = req.body;

    const newRequest = await WasteRequest.create({
      user: req.user.id,
      waste_type,
      scheduled_date,
    });

    res.json({ message: "Request created", request: newRequest });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const myRequests = async (req, res) => {
  try {
    const requests = await WasteRequest.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await WasteRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json({ message: "Status updated", request: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ DELETE REQUEST — owner or admin only
export const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await WasteRequest.findById(id);
    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }

    // Check permission
    if (request.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Not allowed" });
    }

    await request.deleteOne();

    res.json({ message: "Request deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
