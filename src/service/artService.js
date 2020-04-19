import {API} from "aws-amplify";

let scanArt = async () => {
  return API.get('apiArt', '/art');
};

let postArt = async (art) => {
  return API.post('apiArt', '/art', {
    body: art
  });
}

let delArt = async (art) => {
  return API.del('apiArt', `/art/object/${art.id}`);
}

export {scanArt, postArt, delArt}