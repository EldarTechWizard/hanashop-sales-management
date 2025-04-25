import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Box, IconButton, TextField } from "@radix-ui/themes";
import { useSales } from "@stores/salesStore";
import {  useState } from "react";

const SearchProductBar = () => {
    const { setSearchText } = useSales()
    const [text, setText] = useState<string>("")

    return (
        <Box className="w-full p-2">
            <TextField.Root radius="full" variant="soft" style={{ backgroundColor: "#FFFFFF" }} placeholder="Search some product here" value={text} onChange={(e) => {
                setText(e.target.value)
                setSearchText(e.target.value);
            }}>
                <TextField.Slot>
                </TextField.Slot>
                <TextField.Slot>
                    <IconButton variant="ghost" color="gray" onClick={() => { setSearchText(text) }}>
                        <MagnifyingGlassIcon height="10" />
                    </IconButton>
                </TextField.Slot>
            </TextField.Root>
        </Box>
    )
}

export default SearchProductBar;