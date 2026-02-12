import Issue from "../models/Issue.js";

export async function getIssues(req, res) {
  try {
    const { search, priority, status, page = 1, limit = 10 } = req.query;

    let query = {};
    if (search) query.title = { $regex: search, $options: "i" };
    if (priority) query.priority = priority;
    if (status) query.status = status;

    const issues = await Issue.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await Issue.countDocuments(query);

    const stats = await Issue.aggregate([
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

export async function createIssue(req, res) {
  try {
    const newIssue = new Issue({
      ...req.body,
      creator: req.user.id // Taken from the JWT middleware [cite: 18]
    });
    const issue = await newIssue.save();
    res.json(issue);
  } catch (err) {
    res.status(500).send('Server Error during creation');
  }
};

export async function updateIssue(req, res) {
  try {
    let issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ msg: 'Issue not found' });

    // Update fields and return the new document
    issue = await Issue.findByIdAndUpdate(
      req.params.id, 
      { $set: req.body }, 
      { new: true }
    );
    res.json(issue);
  } catch (err) {
    res.status(500).send('Server Error during update');
  }
};

export async function deleteIssue(req, res) {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ msg: 'Issue not found' });

    await issue.deleteOne();
    res.json({ msg: 'Issue removed' });
  } catch (err) {
    res.status(500).send('Server Error during deletion');
  }
};
