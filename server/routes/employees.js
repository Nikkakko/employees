const express = require('express');
const auth = require('../middleware/auth');
const {
  getEmployees,
  getEmployee,
  addEmployee,
  editEmployee,
  removeEmployee,
} = require('../controllers/employees');
const router = express.Router();

// @route   GET api/employee
router.get('/', auth, getEmployees);

// @route   GET api/employee/:id
router.get('/:id', auth, getEmployee);

// @route   POST api/employee
router.post('/add', auth, addEmployee);

// @route   PUT api/employee/:id
router.put('/edit/:id', auth, editEmployee);

// @route   DELETE api/employee/:id
router.post('/remove/:id', auth, removeEmployee);

module.exports = router;
