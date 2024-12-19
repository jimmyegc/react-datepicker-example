import { forwardRef } from 'react'
import { Input } from '../Input/Input';

export const CustomInput = forwardRef((props: any, ref) => {
  return <Input {...props} ref={ref} />;
});
