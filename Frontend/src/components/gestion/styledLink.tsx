import { Link } from "react-router"

type StyledLinkProps = {
    path: string,
    title: string,
}

export const StyledLink: React.FC<StyledLinkProps> = ({path, title}) => {
    return (
        <Link to={path} className="block text-lg font-medium bg-blue-500 p-2 text-white rounded-xl">
            {title}
        </Link>
    )
}