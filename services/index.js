import { request, gql } from 'graphql-request';
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
    const query = gql`
        query MyQuery {
            postsConnection {
                edges {
                    node {
                        author {
                            biography
                            name
                            id
                            picture {
                                url
                            }
                        }
                        createdAt
                        slug
                        title
                        excerpt
                        coverImage {
                            url
                        }
                        tags
                    }
                }
            }
        } 
    `;

    const result = await request(graphqlAPI, query)

    return result.postsConnection.edges;
}



export const getPostDetails = async (slug) => {
    const query = gql`
        query GetPostDetails($slug: String!) {
            post(where: {slug: $slug }) {
                author {
                    biography
                    name
                    id
                    picture {
                        url
                    }
                }
                createdAt
                slug
                title
                excerpt
                coverImage {
                    url
                }
                tags
                content {
                    raw
                }
            }
        } 
    `;

    const result = await request(graphqlAPI, query, { slug })

    return result.post;
}

export const getRecentPosts = async () => {
    const query = gql`
    query GetPostDetails() {
        posts(
            orderBy: createdAt_ASC
            last: 3
            ) {
                title
                coverImage {
                    url
                }
                tags
                createdAt
                slug
            }
        }
    `;

    const result = await request(graphqlAPI, query)
    return result.posts;
}



export const getSimilarPosts = async () => {
    const query = gql`
        query GetPostDetails($slug: String!, $tags: tags) {
            posts(
                where: {tags_contains_some: "Nutrition"}
                last: 3
            ) {
                title
                coverImage {
                    url
                }
                tags
                createdAt
                slug
            }
        }
    `

    const result = await request(graphqlAPI, query);
    return result.posts
}


export const getTags = async () => {
    const query = gql`
        query GetTags {
            posts {
                tags
            }
        }
    `
    const result = await request(graphqlAPI, query);
    return console.log(result.posts)
}