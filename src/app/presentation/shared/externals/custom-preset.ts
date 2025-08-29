//mypreset.ts
import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

const MyCustomPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#e5f3ff',
      100: '#cfe9ff',
      200: '#a9d4ff',
      300: '#75b4ff',
      400: '#3f83ff',
      500: '#1452ff',
      600: '#003aff',
      700: '#003bff',
      800: '#0022ad',
      900: '#001166',
      950: '#001166',
    },
  },
});
export default MyCustomPreset;
