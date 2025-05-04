import { useFieldContext } from "@lib/react-form-context"
import { Flex, Text, TextField } from "@radix-ui/themes"

export function CustomNumberField({ label, error, disable=false }: { label: string, error: string, disable?: boolean}) {
  const field = useFieldContext<number>()
  return (
    <Flex direction="column" width="100%">
      <div>{label}</div>
      <TextField.Root
        value={field.state.value}
        onChange={(e) => field.handleChange(Number(e.target.value))}
        disabled = {disable}
      />
      <Text color="red">{error}</Text>
    </Flex>
  )
}