import { BadRequestException } from '@nestjs/common';

export function handleException(error: any): void {
  throw new BadRequestException({
    message: [
      error.keyValue
        ? `${Object.keys(error.keyValue).join(', ')} invalid`
        : error.errors
          ? `${Object.keys(error.errors).join(', ')} invalid`
          : error.message || 'Unexpected error occurred',
    ],
  });
}
