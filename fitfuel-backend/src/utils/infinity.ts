import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import {Transform} from "class-transformer";

export function IsNumberOrInfinity(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isNumberOrInfinity',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return typeof value === 'number' && (Number.isFinite(value) || value === Number.POSITIVE_INFINITY);
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} must be a number or positive infinity`;
                },
            },
        });
    };
}

export function TransformToNumberOrInfinity() {
    return Transform(({ value }) => {
        if (value === 'Infinity' || value === Number.POSITIVE_INFINITY) {
            return Number.POSITIVE_INFINITY;
        }
        return Number(value);
    });
}
