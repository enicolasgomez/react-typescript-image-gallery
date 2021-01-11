export class request {
  
  static encodeGetParams = p => Object.entries(p).map(kv => kv.map(encodeURIComponent).join("=")).join("&");

  static request<T>(url:string, method:string, token:string, params: T) {
    let options = {
      method: method,
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: 'Bearer ' + token
      })
    }
    if (method.toUpperCase() == 'GET')
      url += "?" + request.encodeGetParams(params)
    else
      options = Object.assign(options, { body: JSON.stringify(params) });

    return fetch(url, options)
      .then(function(response) {
          if (!response.ok) {
              throw Error(response.statusText);
          }
          return response;
      }).then(function(response) {
          return response.json();
      });
  }
}

