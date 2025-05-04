import { useFieldContext } from "@lib/react-form-context"
import { Flex, Text, TextField } from "@radix-ui/themes"

export function CustomTextField({ label, error }: { label: string, error: string }) {
  const field = useFieldContext<string>()
  return (
    <Flex direction="column" width="100%">
      <div>{label}</div>
      <TextField.Root
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      <Text color="red">{error}</Text>
    </Flex>
  )
}