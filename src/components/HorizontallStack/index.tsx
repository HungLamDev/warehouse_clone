import Stack from '@mui/material/Stack';
import { ComponentProps } from "react";

type StackProps = ComponentProps<typeof Stack>;

const HorizontalStack = (props: StackProps) => {
  return <Stack direction="row" alignItems="center" {...props} />;
};

export default HorizontalStack;
