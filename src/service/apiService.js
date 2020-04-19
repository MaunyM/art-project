import {API} from "aws-amplify";

const ART_PATH = '/art'
const PAINTER_PATH = '/painter'

let scan = async (path) => {
  return API.get('apiArt', path, {});
};

let post = async (path, body) => {
  return API.post('apiArt', path, {
    body
  });
}

let del = async (path, object) => {
  return API.del('apiArt', `${path}/object/${object.id}`, {});
}

let scanArt = async () => scan(ART_PATH)
let postArt = async (art) => post(ART_PATH, art)
let delArt = async (art) => del(ART_PATH, art)
let scanPainter = async () => scan(PAINTER_PATH)
let postPainter = async (painter) => post(PAINTER_PATH, painter)
let delPainter = async (painter) => del(PAINTER_PATH, painter)

export {scanArt, postArt, delArt, scanPainter, postPainter, delPainter}