import {
  DeepPartial,
  LiteralToPrimitive,
  NestedValue,
  NonUndefined,
  Ref,
  SetValueConfig,
  UnpackNestedValue,
  ValidationRules,
} from 'react-hook-form';

export type RegisterFunction = (rules?: ValidationRules) => (ref: Ref | null) => void;

export type SetValueFunction = (
  name: string,
  value?: NonUndefined<unknown> extends NestedValue<infer U>
    ? U
    : UnpackNestedValue<DeepPartial<LiteralToPrimitive<unknown>>>,
  options?: SetValueConfig,
) => void;
