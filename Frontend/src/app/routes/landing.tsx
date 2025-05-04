
import { Flex} from '@radix-ui/themes';
import Header from '@components/header/header';
import CategoryContainer from '@components/sales/categoryContainer';
import SearchProductBar from '@components/sales/searchProductBar';
import ProductContainer from '@components/sales/productsContainer';
import CartContainer from '@components/sales/cartContainer';

function Landing() {
    return (
        <Flex className=' h-screen w-screen' >
            <Flex className="w-7/11 vh-full" direction="column">
                <Header />
                <CategoryContainer />
                <SearchProductBar />
                <ProductContainer />
            </Flex>
            <Flex className="w-4/11 h-full">
                <CartContainer />
            </Flex>
        </Flex>
    )
}

export default Landing;