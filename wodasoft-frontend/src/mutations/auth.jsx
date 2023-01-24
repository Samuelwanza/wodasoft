import { gql } from "@apollo/client";

const SIGNUP_MUTATION = gql`
  mutation register($username: String!, $password: String!, $email: String!) {
    register(
      input: { username: $username, email: $email, password: $password }
    ) {
      jwt
      user {
        id
        email
        username
      }
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation user_details($data: ProfessionalDetailInput!) {
    createProfessionalDetail(data: $data) {
      data {
        attributes {
          certification_link
          Years_of_experience
          Field_of_specialisation
          image_url
          user
          role
          name
          email
          bio
          skills
        }
      }
    }
  }
`;
const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { identifier: $email, password: $password }) {
      jwt
      user {
        id
        email
        username
      }
    }
  }
`;

const FORGOT_PASSWORD = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email) {
      ok
    }
  }
`;

const RESET_PASSWORD = gql`
  mutation ResetPassword(
    $password: String!
    $passwordConfirmation: String!
    $code: String!
  ) {
    resetPassword(
      password: $password
      passwordConfirmation: $passwordConfirmation
      code: $code
    ) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUsersPermissionsUser($id: ID!) {
    deleteUsersPermissionsUser(id: $id) {
      data {
        id
      }
    }
  }
`;

export {
  SIGNUP_MUTATION,
  LOGIN_MUTATION,
  CREATE_USER_MUTATION,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
};
