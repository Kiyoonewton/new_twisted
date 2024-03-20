import { ApolloClient, InMemoryCache } from "@apollo/client";
import { RestLink } from "apollo-link-rest";

// Set `RestLink` with your endpoint
const link = new RestLink({
    uri: process.env.WP_API_URL ?? "",
});

// Setup your client
export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
});

export const portalApolloClient = () => {
    const client = new ApolloClient({
        // link: link,
        cache: new InMemoryCache(),
        uri: process.env.NEXT_PUBLIC_PORTAL_API_URL,
    });

    return client;
};
