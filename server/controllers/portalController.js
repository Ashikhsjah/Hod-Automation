const Complaint = require('../models/Complaint');
const Circular = require('../models/Circular');
const Resource = require('../models/Resource');

// ---- Complaint Logic ----
exports.submitComplaint = async (req, res) => {
    try {
        const { title, description, category, priority, location } = req.body;
        const complaint = new Complaint({
            title, description, category, priority, location,
            submittedBy: req.user.id // Assuming JWT auth middleware
        });
        await complaint.save();
        res.json(complaint);
    } catch (err) { res.status(500).send('Server Error'); }
};

exports.getComplaints = async (req, res) => {
    try {
        const { status, category } = req.query;
        let query = {};

        // HOD sees all, Students/Faculty see their own complaints (or potentially all public complaints)
        // For maintenance, often only HOD assigns, but staff can view progress.
        if (req.user.role === 'student' || req.user.role === 'faculty') {
            query.submittedBy = req.user.id;
        }

        if (status) query.status = status;
        if (category) query.category = category;

        const complaints = await Complaint.find(query).populate('submittedBy', 'name role');
        res.json(complaints);
    } catch (err) { res.status(500).send('Server Error'); }
};

exports.updateComplaintStatus = async (req, res) => {
    try {
        const { id } = req.params; // Complaint ID
        const { status, assignedTo } = req.body; // Update fields

        let complaint = await Complaint.findById(id);
        if (!complaint) return res.status(404).json({ msg: 'Complaint not found' });

        if (req.user.role !== 'hod') return res.status(403).json({ msg: 'Unauthorized' });

        if (status) complaint.status = status;
        if (assignedTo) complaint.assignedTo = assignedTo;
        if (status === 'RESOLVED') complaint.resolvedAt = Date.now();

        await complaint.save();
        res.json(complaint);
    } catch (err) { res.status(500).send('Server Error'); }
};


// ---- Circular Logic ----
exports.postCircular = async (req, res) => {
    try {
        const { title, content, audience, isPublic, attachmentUrl } = req.body;
        if (req.user.role !== 'hod' && req.user.role !== 'faculty') return res.status(403).json({ msg: 'Unauthorized' });

        const circular = new Circular({
            title, content, audience, isPublic, attachmentUrl,
            postedBy: req.user.id
        });
        await circular.save();
        res.json(circular);
    } catch (err) { res.status(500).send('Server Error'); }
};

exports.getCirculars = async (req, res) => {
    try {
        // Public circulars if no auth, otherwise role-based
        let query = { isPublic: true };

        // If logged in, fetch relevant circulars
        if (req.user) {
            query = {
                $or: [
                    { isPublic: true },
                    { audience: 'ALL' },
                    { audience: req.user.role.toUpperCase() }
                ]
            };
        }

        const circulars = await Circular.find(query).sort({ createdAt: -1 }).populate('postedBy', 'name role');
        res.json(circulars);
    } catch (err) { res.status(500).send('Server Error'); }
};


// ---- Resource Logic ----
exports.uploadResource = async (req, res) => {
    try {
        const { title, description, type, subject, year, semester, url } = req.body;
        if (req.user.role === 'student') return res.status(403).json({ msg: 'Unauthorized' }); // Only Staff/HOD

        const resource = new Resource({
            title, description, type, subject, year, semester, url,
            uploadedBy: req.user.id
        });
        await resource.save();
        res.json(resource);
    } catch (err) { res.status(500).send('Server Error'); }
};

exports.getResources = async (req, res) => {
    try {
        const { subject, year, semester, type } = req.query;
        let query = {};
        if (subject) query.subject = subject;
        if (year) query.year = year;
        if (semester) query.semester = semester;
        if (type) query.type = type;

        const resources = await Resource.find(query).populate('uploadedBy', 'name');
        res.json(resources);
    } catch (err) { res.status(500).send('Server Error'); }
};
