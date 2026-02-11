import { find, countDocuments, aggregate } from "../models/Issue";

export async function getIssues(req, res) {
  try {
    const { search, priority, status, page = 1, limit = 10 } = req.query;

    let query = {};
    if (search) query.title = { $regex: search, $options: "i" };
    if (priority) query.priority = priority;
    if (status) query.status = status;

    const issues = await find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await countDocuments(query);

    const stats = await aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    res.json({
      issues,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      stats,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
