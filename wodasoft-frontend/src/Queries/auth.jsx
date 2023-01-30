import { gql } from "@apollo/client";

const GET_ROLE = gql`
  query {
    me {
      role {
        name
      }
    }
  }
`;
const GET_USER_PROFILE = gql``;

export { GET_ROLE, GET_USER_PROFILE };
