// controllers/rewardsController.js
export const myRewards = async (req, res) => {
  try {
    const userId = req.user.id;

    // Example: fetch rewards from DB (or dummy data for now)
    const rewards = [
      { date: "2025-11-05", description: "Recycled 5kg plastic", points: 50 },
      { date: "2025-11-04", description: "Composted waste", points: 20 },
    ];

    res.json(rewards);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
