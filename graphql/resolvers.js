const User = require('../models/User');
const Employee = require('../models/Employee');
const bcrypt = require('bcryptjs');

const resolvers = {

  Query: {
    async login(_, { username, password }) {
      const user = await User.findOne({
        $or: [{ username: username }, { email: username }]
      });
      if (!user) {
        throw new Error('User not found');  
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }
      return user;
    },


    async getAllEmployees() {
      return await Employee.find({});
    },

    async searchEmployeeById(_, { id }) {
      return await Employee.findById(id);
    },


  },


  Mutation: {

    async signup(_, { username, email, password }) {
      const existingUser = await User.findOne({
        $or: [{ username: username }, { email: email }]
      });
      if (existingUser) {
        throw new Error('User already exists');
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
      const result = await newUser.save();
      result.password = null;
      return result;
    },

    async addNewEmployee(_, { first_name, last_name, email, gender, salary }) {
      const existingEmployee = await Employee.findOne({ email: email });
      if (existingEmployee) {
        throw new Error('Employee with this email already exists');
      }
      const newEmployee = new Employee({
        first_name,
        last_name,
        email,
        gender,
        salary,
      });
      return await newEmployee.save();
    },

    async updateEmployeeById(_, { id, first_name, last_name, email, gender, salary }) {
      const employeeToUpdate = await Employee.findById(id);
      if (!employeeToUpdate) {
        throw new Error('Employee with this ID does not exist');
      }

      first_name && (employeeToUpdate.first_name = first_name);
      last_name && (employeeToUpdate.last_name = last_name);
      email && (employeeToUpdate.email = email);
      gender && (employeeToUpdate.gender = gender);
      salary && (employeeToUpdate.salary = salary);

      return await employeeToUpdate.save();
    },

    async deleteEmployeeById(_, { id }) {
      const employee = await Employee.findByIdAndDelete(id);
      if (!employee) {
        throw new Error('Employee not found');
      }
      return `Employee with id ${id} was deleted`;
    },
  },
};

module.exports = resolvers;