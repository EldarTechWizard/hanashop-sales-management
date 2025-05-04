import { Category, Customer, Product } from '@customTypes/types';
import { getData } from '@lib/api';
import { useFieldContext } from '@lib/react-form-context';
import { Flex } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';

export interface Option {
  value: number;
  label: string;
}

const loadOptions = async (inputValue: string, url: string) => {
  const response = await getData(`${url}?search=${inputValue}`)

  return response.map((item: Product | Category | Customer) => ({
    label: item.name,
    value: item.id,
  }));
};

const getOptionById = async (id: number, url: string): Promise<Option> => {
  const response = await getData(`${url}${id}/`);
  return { value: response.id, label: response.name };
}

export default function CustomFormAsyncComboBox({ url, label, disable=false }: { url: string, error?: string, label: string, disable?: boolean  }) {
  const field = useFieldContext<number>()
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  useEffect(() => {
    if (field.state.value) {
      getOptionById(field.state.value, url).then(setSelectedOption);
    }
  }, [field.state.value, url]);

  return (
    <Flex direction="column" width="100%">
      <div>{label}</div>
      <AsyncSelect<Option>
        cacheOptions
        loadOptions={(inputValue) => loadOptions(inputValue, url)}
        defaultOptions
        onChange={(option) => {field.handleChange(option?.value ?? 0); setSelectedOption(option ?? null)}}
        value={
          selectedOption
        }
        isDisabled={disable}
        placeholder="Buscar producto..."
      />
    </Flex>
  );
}
