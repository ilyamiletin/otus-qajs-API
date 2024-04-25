import { apiConfig } from 'environment';
import supertest from 'supertest';

export default supertest(apiConfig.url);
