import axios, { AxiosResponse } from 'axios'

export enum Method {
  // api call methods, and some comment reminder
  // get something back
  GET = 'get',
  // update something
  PUT = 'put',
  // add something new
  POST = 'post',
  // remove something old
  DELETE = 'delete',
}

//just so js files can use them.

export const GET = 'get'
export const PUT = 'put'
export const POST = 'post'
export const DELETE = 'delete'

export const APICall = async function (method: Method, url: string, body?: object): Promise<AxiosResponse> {
  if (!this.props.auth0.isAuthenticated) {
    return; // you have no right!
  }
  const res = await this.props.auth0.getIdTokenClaims();
  const jwt: string = res.__raw;

  const call = {
    headers: { Authorization: `Bearer ${jwt}` },
    method: method,
    baseURL: process.env.REACT_APP_HEROKU_URL,
    url: url,
    data: body,
  };
  const rest = await axios(call);
  return rest.data
};
