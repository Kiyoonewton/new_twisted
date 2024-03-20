import { gql } from "@apollo/client";

export const FETCHCONFIG = gql`
    query GetConfig($route: String!, $site: String!) {
        getConfig(route: $route, site: $site)
    }
`;
