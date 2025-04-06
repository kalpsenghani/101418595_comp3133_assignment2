const Employee = require("../models/employeeModel");

const employeeResolver = {
  Query: {
    getAllEmployees: async () => await Employee.find(),
    searchEmployeeById: async (_, { id }) => await Employee.findById(id),
    searchEmployeeByDesignationOrDepartment: async (_, { designation, department }) => {
      return await Employee.find({ $or: [{ designation }, { department }] });
    },
  },

  Mutation: {
    addEmployee: async (_, args) => {
      const employee = new Employee(args);
      return await employee.save();
    },
    updateEmployee: async (_, { id, ...updates }) => {
      return await Employee.findByIdAndUpdate(id, updates, { new: true });
    },
    deleteEmployee: async (_, { id }) => {
      await Employee.findByIdAndDelete(id);
      return "Employee deleted successfully";
    },
  },
};

module.exports = employeeResolver;
