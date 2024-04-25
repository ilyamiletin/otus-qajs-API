import api from 'clients/api';
import { expectPageNotFoundError, expectSuccessWithData, expectVersionAppNotSupported } from 'helpers/customExpect';
import AppVersions from 'helpers/services/AppVersions';

const getVersion = async ({ version }) => {
  return api.get(`/check-version/${version}`).set('Accept', 'application/json');
};

describe('Метод check-version', () => {
  let row: string;

  beforeAll(async () => {
    // arrange (creating a row in the database)
    const response = await AppVersions.create({
      app_version: '10.0.0',
      is_allowed: false,
      version_to_update_to: '10.0.0',
      no_longer_works: false,
    });

    row = response;
  });

  it.each([
    {
      issue: 'Получение информации по версии приложения',
      version: '3.1.0',
    },
    {
      issue: 'Проверка версии по созданной строке в БД',
      version: '10.0.0',
    },
  ])('$issue', async ({ version }) => {
    // act
    const response = await getVersion({
      version,
    });

    const transactionId = response.body.data;

    // assert
    expectSuccessWithData(response, transactionId);
  });

  it('Получение информации по версии, которой нет в БД', async () => {
    // act
    const response = await getVersion({
      version: '0.0.0',
    });

    // assert
    expectVersionAppNotSupported(response);
  });

  it('Получение информации с пустой версией', async () => {
    // act
    const response = await getVersion({
      version: '',
    });

    // assert
    expectPageNotFoundError(response);
  });

  afterAll(async () => {
    console.log(`Id созданной (удалённой) строки в БД: ${row}`);
    // clean
    await AppVersions.delete(row);
  });
});
