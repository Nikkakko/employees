const { prisma } = require('../prisma/prisma-client');

const getEmployees = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Could not find employees' });
  }
};

const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await prisma.employee.findUnique({
      where: {
        id: id,
      },
    });

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Could not find employee' });
  }
};

const addEmployee = async (req, res) => {
  try {
    const data = req.body;

    if ((!data.firstname, !data.lastname, !data.age, !data.address)) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    const employee = await prisma.employee.create({
      data: {
        ...data,
        userId: req.user.id,
      },
    });

    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Could not add employee' });
  }
};

const editEmployee = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const employee = await prisma.employee.update({
      where: {
        id: id,
      },
      data,
    });

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Could not edit employee' });
  }
};

const removeEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await prisma.employee.delete({
      where: {
        id: id,
      },
    });

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Could not delete employee' });
  }
};

module.exports = {
  getEmployees,
  getEmployee,
  addEmployee,
  editEmployee,
  removeEmployee,
};
