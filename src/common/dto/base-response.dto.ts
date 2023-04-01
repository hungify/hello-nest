import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface JsonResponse<T, M = Record<string, any>>
  extends Response<{
    data: T;
    meta?: M;
  }> {}

export class BaseResponse<T> {
  @ApiProperty({ type: Object })
  data: T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class MetaResponse<T, M = any> extends BaseResponse<T> {
  @ApiProperty({ type: Object })
  meta: M;
}

export function SwaggerBaseApiResponse<T>(type: T): typeof MetaResponse {
  class ExtendedBaseApiResponse<T> extends MetaResponse<T> {}

  const isAnArray = Array.isArray(type) ? ' [ ] ' : '';
  Object.defineProperty(ExtendedBaseApiResponse, 'name', {
    value: `SwaggerBaseApiResponseFor ${type} ${isAnArray}`,
  });

  return ExtendedBaseApiResponse;
}

export class BaseApiErrorObject {
  @ApiProperty({ type: Number })
  statusCode: number;

  @ApiProperty({ type: String })
  message: string;

  @ApiPropertyOptional({ type: String })
  localizedMessage: string;

  @ApiProperty({ type: String })
  errorName: string;

  @ApiProperty({ type: Object })
  details: unknown;

  @ApiProperty({ type: String })
  path: string;

  @ApiProperty({ type: String })
  requestId: string;

  @ApiProperty({ type: String })
  timestamp: string;
}

export class BaseApiErrorResponse {
  @ApiProperty({ type: BaseApiErrorObject })
  error: BaseApiErrorObject;
}

export class MessageResponse {
  @ApiProperty({ type: String })
  message: string;
}
