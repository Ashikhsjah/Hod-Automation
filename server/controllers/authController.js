const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { name, email, password, role, department, rollNumber, batch, designation, isDoctorate } = req.body;

        // Simple check if user exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            name,
            email,
            password: hashedPassword,
            role,
            department,
            rollNumber,
            batch,
            designation,
            isDoctorate
        });

        await user.save();

        const payload = { user: { id: user.id, role: user.role, department: user.department } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: { id: user.id, name: user.name, role: user.role, department: user.department } });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = null;
        if (email === 'hod@college.edu' && password === 'admin123') {
            user = { id: 'mock-hod-id', role: 'hod', department: 'CSE', name: 'Dr. Head of Dept' };
        } else if (email === 'faculty@college.edu' && password === 'faculty123') {
            user = { id: 'mock-faculty-id', role: 'faculty', department: 'CSE', name: 'Prof. John Doe' };
        } else if (email === 'student@college.edu' && password === 'student123') {
            user = { id: 'mock-student-id', role: 'student', department: 'CSE', name: 'Jane Student' };
        }

        if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

        const payload = { user: { id: user.id, role: user.role, department: user.department } };
        jwt.sign(payload, process.env.JWT_SECRET || 'your_jwt_secret_key_here', { expiresIn: '5h' }, (err, token) => {
            if (err) throw err;
            res.json({ token, user });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
