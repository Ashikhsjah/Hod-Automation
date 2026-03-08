const Complaint = require('../models/Complaint');
const Circular = require('../models/Circular');
const Resource = require('../models/Resource');

// In-memory array to simulate DB for complaints
let mockComplaints = [
    {
        _id: '1', staffId: 'FAC001', name: 'Prof. John Doe', department: 'CSE', designation: 'Assistant Professor', title: 'Leaking AC', description: 'AC is leaking water on the lab computers.', category: 'Infrastructure', priority: 'High', location: 'Lab 2', status: 'Pending',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        comments: [],
        submittedBy: { name: 'Prof. John Doe', role: 'faculty' }
    }
];

// ---- Complaint Logic ----
exports.submitComplaint = async (req, res) => {
    try {
        const { staffId, name, department, designation, title, category, priority, location, description, date } = req.body;
        const newComplaint = {
            _id: Math.random().toString(36).substring(7),
            staffId, name, department, designation, title, category, priority, location, description,
            status: 'Pending',
            createdAt: date || new Date().toISOString(),
            comments: [],
            submittedBy: { name: name || 'Prof. John Doe', role: req.user.role }
        };
        mockComplaints.push(newComplaint);
        res.json(newComplaint);
    } catch (err) { res.status(500).send('Server Error'); }
};

exports.getComplaints = async (req, res) => {
    try {
        const { status, category } = req.query;
        let filteredComplaints = [...mockComplaints];

        // Ensure HOD sees all complaints, and faculty sees their own (using simplified role check here since it's mocked)
        if (req.user.role === 'faculty' || req.user.role === 'student') {
            filteredComplaints = mockComplaints.filter(c => c.submittedBy.role === req.user.role);
        }

        if (status) filteredComplaints = filteredComplaints.filter(c => c.status === status);
        if (category) filteredComplaints = filteredComplaints.filter(c => c.category === category);

        res.json(filteredComplaints);
    } catch (err) { res.status(500).send('Server Error'); }
};

exports.updateComplaintStatus = async (req, res) => {
    try {
        const { id } = req.params; // Complaint ID
        const { status, assignedTo, newComment } = req.body; // Update fields

        if (req.user.role !== 'hod') return res.status(403).json({ msg: 'Unauthorized' });

        const complaintIndex = mockComplaints.findIndex(c => c._id === id);
        if (complaintIndex === -1) return res.status(404).json({ msg: 'Complaint not found' });

        if (status) mockComplaints[complaintIndex].status = status;
        if (assignedTo) mockComplaints[complaintIndex].assignedTo = assignedTo;
        if (newComment) {
            mockComplaints[complaintIndex].comments = mockComplaints[complaintIndex].comments || [];
            mockComplaints[complaintIndex].comments.push({ text: newComment, date: new Date().toISOString() });
        }

        res.json(mockComplaints[complaintIndex]);
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
