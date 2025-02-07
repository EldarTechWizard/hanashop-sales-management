import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from './pages/example';
import { useNavigate } from 'react-router';
import { Button } from '@radix-ui/themes';

function Landing(){
    const { data, isLoading } = useQuery({queryKey: ['posts'],queryFn: fetchPosts});
    const navigate = useNavigate();
    if (isLoading) return <div>Loading...</div>;

    const handleSumbit = () => {
        navigate("/example")
    }

    return(
        <div>
            <p>landing</p>
            <Button onClick={handleSumbit}>Here</Button>
            {data?.map((d) => (<p>{d.title}</p>))}
        </div>
    )
}

export default Landing;