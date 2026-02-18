const Request = require('../models/Request');
const User = require('../models/User');

exports.getDashboardStats = async (req, res) => {
    try {
        const studentCount = await User.countDocuments({ role: 'student' });
        const facultyCount = await User.countDocuments({ role: 'faculty' });
        const pendingRequests = await Request.countDocuments({ status: 'PENDING' });
        // Typically HOD sees requests verified by faculty or direct requests if allowed
        // But per flow: Student -> Faculty -> HOD.

        // Let's assume 'VERIFIED' status is what HOD sees for Student requests, 
        // or 'PENDING' for Faculty requests.
        const requestsForApproval = await Request.countDocuments({
            $or: [
                { status: 'VERIFIED' }, // Student requests verified by Faculty
                { status: 'PENDING', submittedBy: { $in: await User.find({ role: 'faculty' }).distinct('_id') } } // Faculty direct requests
            ]
        });

        res.json({
            studentCount,
            facultyCount,
            pendingRequests: requestsForApproval
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getPendingRequests = async (req, res) => {
    try {
        // HOD sees requests that are either VERIFIED (from students via faculty) or PENDING (directly from faculty)
        const facultyIds = await User.find({ role: 'faculty' }).distinct('_id');

        const requests = await Request.find({
            $or: [
                { status: 'VERIFIED' },
                { status: 'PENDING', submittedBy: { $in: facultyIds } }
            ]
        }).populate('submittedBy', 'name role department');

        res.json(requests);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.approveRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const { status } = req.body; // APPROVED or REJECTED

        let request = await Request.findById(requestId);
        if (!request) return res.status(404).json({ msg: 'Request not found' });

        request.status = status;
        request.approvedBy = req.user.id;
        await request.save();

        res.json(request);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
