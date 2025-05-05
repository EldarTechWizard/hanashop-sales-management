import { Flex, Text } from "@radix-ui/themes"


type HeaderGridProps = {
    title: string;
    children?: JSX.Element | JSX.Element[]
}

const HeaderGrid: React.FC<HeaderGridProps> = ({ title, children }) => {
    //const navigate = useNavigate()
    return (
        <Flex justify="between" align="center" px="2" mt="5">
            <Flex gap="2" justify="center" align="center">
                {/*<CustomButton onClick={() => navigate("/gestion")}  leftIcon={<TriangleLeftIcon width="20"/>} />*/}
                <Text weight="bold" size="6">{title}</Text>
            </Flex>

            {children}
        </Flex>
    )
}

export default HeaderGrid;