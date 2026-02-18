const Request = require('../models/Request');
const Attendance = require('../models/Attendance');
const InternalMark = require('../models/InternalMark');
const User = require('../models/User');

exports.getStudents = async (req, res) => {
    try {
        const students = await User.find({ role: 'student', department: req.user.department });
        res.json(students);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.markAttendance = async (req, res) => {
    try {
        const { date, subject, students } = req.body; // students: [{ studentId, status }]

        const attendanceRecords = students.map(s => ({
            date,
            subject,
            studentId: s.studentId,
            status: s.status,
            facultyId: req.user.id
        }));

        await Attendance.insertMany(attendanceRecords);
        res.json({ msg: 'Attendance marked successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.verifyRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const { status } = req.body; // Should be VERIFIED or REJECTED

        // Only allow verifying PENDING requests
        let request = await Request.findById(requestId);
        if (!request) return res.status(404).json({ msg: 'Request not found' });

        if (request.status !== 'PENDING') return res.status(400).json({ msg: 'Request already processed' });

        request.status = status;
        request.verifiedBy = req.user.id;
        await request.save();

        res.json(request);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getPendingVerifications = async (req, res) => {
    try {
        // Faculty sees PENDING requests from Students
        // Need to filter by department ideally, but for now show all PENDING student requests

        // Find student IDs in department first if needed
        // const students = await User.find({ role: 'student', department: req.user.department }).distinct('_id');

        const requests = await Request.find({
            status: 'PENDING',
            // submittedBy: { $in: students } 
        }).populate('submittedBy', 'name role department');

        // Filter in memory or query to only include students
        const studentRequests = requests.filter(r => r.submittedBy.role === 'student');

        res.json(studentRequests);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
