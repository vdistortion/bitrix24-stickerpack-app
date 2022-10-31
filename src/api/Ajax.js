import { serialize } from 'object-to-formdata';
import axios from 'axios';

const instance = axios.create();

instance.interceptors.response.use(({ data }) => data);

export const Ajax = (...args) => Promise.all(args.map((req) => instance(req)));
export const serializeRequest = (data) => serialize(data, {
  indices: true,
  nullsAsUndefineds: true,
  booleansAsIntegers: true,
  allowEmptyArrays: true,
});
