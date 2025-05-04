import { Option } from "@customTypes/types"
import { useFieldContext } from "@lib/react-form-context"
import { Flex, Text } from "@radix-ui/themes"
import Select from 'react-select'


export function CustomComboBoxField({ label, error, options }: { label: string, error: string, options:Array<Option> }) {
  const field = useFieldContext<string>()

  const selectedOption = options.find((opt) => opt.value === field.state.value) || null

  return (
    <Flex direction="column" width="100%">
      <div>{label}</div>
      <Select<Option>
        options={options}
        defaultValue={selectedOption}
        onChange={(option) => field.handleChange(option?.value as string)}
      />
      <Text color="red">{error}</Text>
    </Flex>
  )
}