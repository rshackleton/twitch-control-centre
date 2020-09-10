import { AppActionType } from '@src/types';

import LifxActionForm from './LifxActionForm';
import SfxActionForm from './SfxActionForm';

export default {
  [AppActionType.LIFX]: LifxActionForm,
  [AppActionType.SFX]: SfxActionForm,
};
