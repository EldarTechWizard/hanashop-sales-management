import GestionTabView from "@components/gestion/gestionTabView";
import Header from "@components/header/header";
import { Flex } from "@radix-ui/themes";


const GestionTab = () => {

    return (
        <Flex direction="column">
            <Header/>
            <GestionTabView/>
        </Flex>
    );
};

export default GestionTab;
