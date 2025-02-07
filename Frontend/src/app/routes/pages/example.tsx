import { Button } from "@radix-ui/themes";
import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useLoaderData, useNavigate } from "react-router";

interface Post{
    userId : number;
    id : number;
    title : string;
    body: string;
}

interface User{
    id:number,
    name: string,
    email: string,
}

export const fetchPosts = async () => {
    const {data} = await axios.get("https://jsonplaceholder.typicode.com/todos/");
    return data;
}

export const fetchUsers = async () => {
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/users/");
    return data;
  };

export const clientLoader = (queryClient: QueryClient) => {
    return async () => {
        const [posts, users] = await Promise.all([
            queryClient.ensureQueryData({ queryKey: ["posts"], queryFn: fetchPosts,}),
            queryClient.ensureQueryData({ queryKey: ["users"], queryFn: fetchUsers })
        ]);

        return { posts, users };
    }
};


const Example:React.FC = () => {
    const {posts, users} = useLoaderData() as {posts: Post[];users: User[]};
    const navigate = useNavigate();
    const userMap = new Map(users.map(user => [user.id, user.name]));
    const handleSumbit = () => {
        navigate("/")
    }
    return(
        <div>
            <Button onClick={handleSumbit}>Here</Button>
            <p>example</p>
            <ul>
            {
                posts.map((post) => (
                    <li key={post.id}>
                        {userMap.get(post.userId)}: {post.title}
                    </li>
                ))
            }
            </ul>
        </div>
    )
};

export default Example;