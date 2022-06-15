import { MantineSize, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export default function useResponsiveness(size: MantineSize) {
  const { breakpoints } = useMantineTheme();
  return useMediaQuery(`(max-width: ${breakpoints[size]}px)`);
}
