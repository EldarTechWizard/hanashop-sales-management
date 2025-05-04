import { Button, Flex, Text } from '@radix-ui/themes';
import React, { useRef, useState } from 'react';

interface Props {
    onFileSelect: (file: File) => void;
    label: string
    image: string
}

export default function ImageUploader({ onFileSelect, label = "", image = "" }: Props) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(image || "");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onFileSelect(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div>
            <Text>{label}</Text>
            <img src={previewUrl || ""} alt="preview" width={200} onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = "http://localhost:8000/media/images/default.webp";
            }} />
            <Flex gap="2" mt="3" align="center">
                <Button type='button' onClick={handleButtonClick} >Seleccionar imagen</Button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleChange}
                    accept="image/*"
                    style={{ display: "none" }}
                    placeholder='a'
                />
            </Flex>
        </div>
    );
}
