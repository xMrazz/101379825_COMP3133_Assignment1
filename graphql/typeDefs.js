const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Employee {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    salary: Float!
  }

  type Query {
    login(username: String!, password: String!): User
    getAllEmployees: [Employee]
    searchEmployeeById(id: ID!): Employee
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): User
    addNewEmployee(first_name: String!, last_name: String!, email: String!, gender: String!, salary: Float!): Employee
    updateEmployeeById(id: ID!, first_name: String, last_name: String, email: String, gender: String, salary: Float): Employee
    deleteEmployeeById(id: ID!): String
  }
`;

module.exports = typeDefs;