import {  Flex , Text } from "@radix-ui/themes";
import { CalendarIcon, ClockIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react";
import HamburgerMenu from "./hamburgerMenu";


const DateContainer = () => {
    const [dateTime, setDateTime] = useState({
        date: '',
        time: ''
    });

    useEffect(() => {
        const updateDateTime = () => {
            const currentDateTime = new Date();
            const date = currentDateTime.toLocaleDateString();
            const time = currentDateTime.toLocaleTimeString();

            // Only update the state if the date/time has changed
            if (date !== dateTime.date || time !== dateTime.time) {
                setDateTime({ date, time });
            }
        };

        const interval = setInterval(updateDateTime, 1000);

        updateDateTime();

        return () => clearInterval(interval);
    }, [dateTime]);


    return (
        <Flex gap="4" >
            <Flex gap="2" className="bg-white px-3 py-1 rounded-xl">
                <Flex align="center" className="bg-blue-50 rounded-full" p="1">
                    <CalendarIcon color="#2D71F8" />
                </Flex>
                <Flex align="center">
                    <Text size="2">
                        {dateTime.date}
                    </Text>
                </Flex>
            </Flex>
            <Flex align="center">
                <Text >
                    -
                </Text>
            </Flex>
            <Flex gap="2" className="bg-white  px-3 py-1 rounded-xl">
                <Flex align="center" className="bg-blue-50 rounded-full" p="1">
                    <ClockIcon color="#2D71F8" />
                </Flex>

                <Flex align="center">
                    <Text size="2" >
                        {dateTime.time}
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    )
}


const Header = () => {

    return (
        <Flex gap="3" p="2" className="h-[3rem]">

            <HamburgerMenu />

            <Flex px="2">
                <DateContainer />
            </Flex>
        </Flex>
    )
}


export default Header;

