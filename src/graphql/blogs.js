import gql from "graphql-tag";

export const fetchBlogsQuery = gql`
  query {
    blogs {
      data {
        attributes {
          title
          body
        }
      }
    }
  }
`;
