import type { Response } from 'supertest';

const HTTP_BAD_REQUEST_STATUS = 400;
const HTTP_SUCCESS_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;


export const expectPageNotFoundError = (response: Response) => {
  expect(response.status).toEqual(HTTP_NOT_FOUND_STATUS);
  expect(response.body).toEqual({
    data: null,
    success: false,
    error: 'Страница не найдена',
    errorCode: 'PageNotFound',
  });
};

export const expectSuccessWithData = (response: Response, data: unknown) => {
  expect(response.status).toEqual(HTTP_SUCCESS_STATUS);
  expect(response.body).toEqual({
    data,
    success: true,
    error: null,
    errorCode: null,
  });
};

export const expectVersionAppNotSupported = (response: Response) => {
  expect(response.status).toEqual(HTTP_BAD_REQUEST_STATUS);
  expect(response.body).toEqual({
    data: null,
    success: false,
    error: 'Версия приложения "0.0.0" не поддерживается',
    errorCode: 'UnsupportedVersion',
  });
};
