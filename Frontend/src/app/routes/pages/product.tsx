import React, { useState } from "react";
import Header from "@components/header/header";
import { Flex } from "@radix-ui/themes";
import ProductGrid from "@components/products/productGrid";
import ProductHeader from "@components/products/productHeader";


const ProductCrud = () => {

    return (
        <Flex direction="column">
            <Header/>
            <ProductHeader/>
            <ProductGrid/>
        </Flex>
    );
};



export default ProductCrud;
